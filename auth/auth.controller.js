const { createUser, signIn, getSaltFromDatabase } = require("./auth.service");
const bcrypt = require('bcrypt');

module.exports = {
    SignUp: (req, res) => {
        let passwordSalt = '';
        const userData = req.body;
        if(userData.FirstName == null || userData.Email == null || userData.Password == null) {
            return res.json({
                success: 0,
                message: "Please fill all fields"
            });
        }
        if(validateEmail(userData.Email) == false) {
            return res.json({
                success: 0,
                message: "Invalid email"
            });
        }
        if(userData.Password.length < 6) {
            return res.json({
                success: 0,
                message: "Password must be at least 6 characters"
            });
        }
        getSaltFromDatabase(userData.Email, async (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if(results != null) {
                return res.json({
                    success: 0,
                    message: "User already exists"
                });
            }
            else{
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(userData.Password, salt);
                const body = {
                    FirstName: userData.FirstName,
                    LastName: userData.LastName,
                    Email: userData.Email,
                    Password: hash,
                    PasswordSalt: salt
                };
                createUser(body, (err, results) => {
                    if(err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "User added successfully"
                    });
                });
            }
        });
    },
    SignIn: (req, res) =>{
        const userData = req.body;
        if(userData.Email == null || userData.Password == null) {
            return res.json({
                success: 0,
                message: "Please fill all fields"
            });
        }
        if(validateEmail(userData.Email) == false) {
            return res.json({
                success: 0,
                message: "Invalid email"
            });
        }
        getSaltFromDatabase(userData.Email, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if(results == null) {
                return res.json({
                    success: 0,
                    message: "User not found"
                });
            }
            //userData.PasswordSalt = results.PasswordSalt;
            bcrypt.hash(userData.Password, results.PasswordSalt)
            .then(hash => {
                const body = {
                    Email: userData.Email,
                    Password: hash
                };
                signIn(body, (err, results) => {
                    if(err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "User logged in successfully",
                        data: results
                    });
                });
            })
            .catch(err => console.error(err.message));
        });
    }
}

function validateEmail(email) {
    //regex is Regular Expression - Used to validate/match any string pattern.
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}