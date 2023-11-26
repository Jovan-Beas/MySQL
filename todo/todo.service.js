const pool = require('../config/database');

module.exports = {
    
    getTodos: (UserID,callBack) => {
        try {
            pool.query(`SELECT TaskId, TaskName FROM tasks WHERE UserID=? AND IsDeleted=0`, [UserID], (error, results, fields) => {
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
    create: (UserID,TaskName, callBack) => {
        pool.query(`insert into tasks(TaskName, UserID) values(?,?)`, [ TaskName, UserID ], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    getTodoById: (UserID,id, callBack) => {
        pool.query(`SELECT TaskId, TaskName FROM tasks where TaskId = ? AND UserID = ?`, [id, UserID], (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    updateTodo: (UserID,TaskName,TaskId, callBack) => {
       
        pool.query(
            `update tasks set TaskName = ? where TaskId = ? AND UserID=?`,
            [
                TaskName,
                TaskId,
                UserID
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteTodo: (UserID,TaskId, callBack) => {
        pool.query(`UPDATE tasks SET IsDeleted=1 where TaskId = ? AND UserID = ?`, [TaskId, UserID], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    isCompleted: (UserID,TaskId, callBack) => {
        pool.query(`UPDATE tasks SET IsComplete=1 where TaskId = ? AND UserID = ?`, [TaskId, UserID], (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}