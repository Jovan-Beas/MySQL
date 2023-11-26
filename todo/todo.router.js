const { createTodo, getTodoList, getTodoById, updateTodo, deleteTodo, isCompleted } = require('./todo.controller');
const router = require('express').Router();
const auth = require('../middleware/auth');

router.get('/', auth, getTodoList);
router.post('/', auth,createTodo);
router.get('/:TaskId', auth, getTodoById);
router.patch('/', auth, updateTodo);
router.delete('/:TaskId', auth, deleteTodo);
router.patch('/:TaskId',auth, isCompleted);


module.exports = router;