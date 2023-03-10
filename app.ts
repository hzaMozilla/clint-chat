import express from 'express';
import connectDB from './database/db';
import path from 'path';
import socketIO from 'socket.io';

import authRouter from './routes/api/auth';
import Users from './routes/api/users';
import Profile from './routes/api/profile';
import Posts from './routes/api/posts';
import Message from './models/Message';
// 连接数据库
connectDB();

// 初始化express中间件
const app = express();
app.use(express.json());

// 服务情景
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (_req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 8090;

const server = app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}`)
);

app.use((req, _res, next) => {
    req.io = socketIO.listen(server);
    next();
});

// 注册路由
app.use('/api/users', Users);
app.use('/api/auth', authRouter);
app.use('/api/profile', Profile);
app.use('/api/posts', Posts);
app.use('/api/messages', Message);
