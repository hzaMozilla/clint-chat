import { createConnection, getConnection, Connection } from 'typeorm';
import config from '../../ormconfig';

const connection = {
  // 链接数据库
  async create(callback?: (c: Connection) => void): Promise<void> {
    try {
      const connection = await createConnection(config);
      if (callback) {
        callback(connection);
      }
    } catch (error) {
      throw new Error(`ERROR: creating db connection: ${error}`);
    }
  },
  // 断开数据库连接
  async close(): Promise<void> {
    await getConnection().close();
  },
  // 清除数据
  async clear(): Promise<void> {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    const reposToClear: Promise<void>[] = [];
    entities.forEach(entity => {
      const repository = connection.getRepository(entity.name);
      try {
        reposToClear.push(repository.clear());
      } catch (error) {
        // 清除失败则抛出异常
        throw new Error(`ERROR: cleaning test db: ${error}`);
      }
    });

    return Promise.all(reposToClear).then();
  }
};

export default connection;
