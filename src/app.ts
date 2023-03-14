import 'reflect-metadata';
import express from 'express';
import path from 'path';
import socketIO from 'socket.io';
import connection from '@src/database/connection';
import { PORT, TESTING_ENV, CI_ENV } from './configs';

// route
import AuthRouter from '@src/routes/api/auth';
import Users from '@src/routes/api/users';
import Profile from '@src/routes/api/profile';
import Posts from '@src/routes/api/posts';
import Messages from '@src/models/Message';

// 连接数据库
// connectDB();

// 初始化express中间件
const app = express();
app.use(express.json());

// 服务情景
if (process.env.ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// server port
const server = async () => {
  if (!TESTING_ENV && !CI_ENV) {
    app.listen(PORT || 8099, () => {
      return console.log(
        `Server is listening on ${PORT}`
      );
    });
  }
};

// 注册socket
app.use((req: any, _res, next) => {
  req.io = socketIO.listen(server);
  next();
});

// 注册路由
app.use('/api/users', Users);
app.use('/api/auth', AuthRouter);
app.use('/api/profile', Profile);
app.use('/api/posts', Posts);
app.use('/api/messages', Messages as any);

connection.create(server);
