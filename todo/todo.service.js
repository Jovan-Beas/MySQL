const pool = require('../config/database');

module.exports = {
    
    getTodos: (callBack) => {
        try {
            pool.query(`SELECT TaskId, TaskName FROM tasks`, [], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            });
        } catch (error) {
            console.log(error);
            return callBack(error);
        }
    },
    create: (TaskName, callBack) => {
        pool.query(`insert into tasks(TaskName) values(?)`, [ TaskName ], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    getTodoById: (id, callBack) => {
        pool.query(`SELECT TaskId, TaskName FROM tasks where TaskId = ?`, [id], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    updateTodo: (data, callBack) => {
        pool.query(
            `update tasks set TaskName = ? where TaskId = ?`,
            [
                data.TaskName,
                data.TaskId
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteTodo: (TaskId, callBack) => {
        pool.query(`delete from tasks where TaskId = ?`, [TaskId], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}