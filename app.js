require('dotenv').config();
const express = require('express');
const app = express();

const todoRouter = require('./todo/todo.router');
const authRouter = require('./auth/auth.router');

app.use(express.json());

app.use('/api/todo', todoRouter);
app.use('/api/auth', authRouter);

// app.get('/', (req, res) => {
//     res.json({ message: 'Hello World' });
// });

app.listen(process.env.APP_PORT, () => {
    console.log('Server started on PORT: ', process.env.APP_PORT);
});