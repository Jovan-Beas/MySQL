const { createUser, getUserData } = require("./auth.service");
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    SignUp: (req, res) => {
        const{ FirstName, LastName, Email, Password } = req.body;
        if(FirstName == null || Email == null || Password == null) {
            return res.json({
                success: 0,
                message: "Please fill all fields"
            });
        }
        if(validateEmail(Email) == false) {
            return res.json({
                success: 0,
                message: "Invalid email"
            });
        }
        if(Password.length < 6) {
            return res.json({
                success: 0,
                message: "Password must be at least 6 characters"
            });
        }
        getSaltFromDatabase(Email, async (err, results) => {
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
                let hash = await bcrypt.hash(Password, salt);
                const body = {
                    FirstName: FirstName,
                    LastName: LastName,
                    Email: Email,
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
        getUserData(userData.Email, async (err, results) => {
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
            let isLoggedIn = await bcrypt.compare(userData.Password, results.Password);
            if(isLoggedIn)
            {
                let userData = {
                    UserID: results.UserID,
                    FirstName: results.FirstName,
                    LastName: results.LastName,
                    Email: results.Email,
                }
                let token = jwt.sign({ userData: userData }, process.env.JWT_KEY, { expiresIn: '1h' });
                return res.status(200).json({
                    success: 1,
                    message: "User logged in successfully",
                    data: userData,
                    token: token
                });
            }
            else{
                return res.json({
                    success: 0,
                    message: "Credentials do not match"
                });
            }
        });
    }
}

function validateEmail(email) {
    //regex is Regular Expression - Used to validate/match any string pattern.
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}