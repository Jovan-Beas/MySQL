const pool = require('../config/database');

module.exports = {
    createUser: (data, callBack) => {
        pool.query(
            `INSERT INTO users(FirstName, LastName, Email, Password, PasswordSalt) VALUES(?,?,?,?,?)`,
            [
                data.FirstName,
                data.LastName,
                data.Email,
                data.Password,
                data.PasswordSalt
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    signIn: (data, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE Email = ? AND Password = ?`,
            [
                data.Email, 
                data.Password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                let userData = {
                    UserID: results[0].UserID,
                    FirstName: results[0].FirstName,
                    LastName: results[0].LastName,
                    Email: results[0].Email,
                }
                return callBack(null, userData);
            }
        );
    },
    getUserData: (Email, callBack) => {
        pool.query(
            `SELECT UserID, FirstName, LastName, PasswordSalt, Password FROM users WHERE Email = ?`,
            [ Email ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
}