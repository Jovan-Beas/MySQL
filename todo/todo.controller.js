const { create, getTodos, getTodoById, updateTodo, deleteTodo } = require('./todo.service');

module.exports = {
    getTodoList: (req, res) => {
        getTodos((err, results) => {
            try {
                if(err) {
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            } catch (error) {        
                return res.status(500).json({
                    success: 0,
                    message: "Internal server error"
                });
            }
            
        });
    },
    createTodo: (req, res) => {
        const TaskName = req.body.TaskName;
        create(TaskName, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getTodoById: (req, res) => {
        const TaskId = req.params.TaskId;
        getTodoById(TaskId, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if(!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateTodo: (req, res) => {
        const body = req.body;
        updateTodo(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "updated successfully"
            });
        });
    },
    deleteTodo: (req, res) => {
        const TaskId = req.params.TaskId;
        deleteTodo(TaskId, (err, results) => {
            console.log(results);
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if(!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Todo deleted successfully"
            });
        });
    }
}