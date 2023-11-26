const { create, getTodos, getTodoById, updateTodo, deleteTodo, isCompleted } = require('./todo.service');

module.exports = {
    getTodoList: (req, res) => {
        getTodos(req.userData.UserID,(err, results) => {
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
        create(req.userData.UserID,TaskName, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results.insertId?"Task Added":"Task Add Error!!!"
            });
        });
    },
    getTodoById: (req, res) => {
        const TaskId = req.params.TaskId;
        getTodoById(req.userData.UserID,TaskId, (err, results) => {
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
        const {TaskName,TaskId} = req.body;
        updateTodo(req.userData.UserID,TaskName,TaskId, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: results.affectedRows?"Task Updated":"Task Update Failed!!!"
            });
        });
    },
    deleteTodo: (req, res) => {
        const TaskId = req.params.TaskId;
        deleteTodo(req.userData.UserID,TaskId, (err, results) => {
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
                message: results.changedRows?"Todo Deleted":"Deletion Error!!!"
            });
        });
    },
    isCompleted: (req, res) => {
        const TaskId = req.params.TaskId;
        isCompleted(req.userData.UserID,TaskId, (err, results) => {
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
                message: results.changedRows?"Todo Completed":(results.affectedRows?"Already Completed":"Tasks does not exist")
            });
        });
    }
}