const { createTodo, getTodoList, getTodoById, updateTodo, deleteTodo } = require('./todo.controller');
const router = require('express').Router();

router.get('/', getTodoList);
router.post('/', createTodo);
router.get('/:TaskId', getTodoById);
router.patch('/', updateTodo);
router.delete('/:TaskId', deleteTodo);


module.exports = router;