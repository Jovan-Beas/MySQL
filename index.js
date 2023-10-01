var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodetest"
});

// // the connect function calls the callback function once the connection is established
// // the parameter to the function would be null if the connection is successful
// // else it would be an error object
con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
    // con.query("SELECT Name FROM customers", function (err, result, fields) {
    //     if(err) throw err;
    //     console.log(result);
    // });
});

var http = require('http');

http.createServer(function (req, res) {
    console.log('request received', req.url);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (req.url === '/getCustomers') {
        let data = [];
        
        con.query("SELECT * FROM customers", function (err, result, fields) {
            if (err) throw err;
            data = result;
            res.end(JSON.stringify(data));
        });
    }
    else{
        res.end('Check the URL');
    }
}).listen(4500);

// var http = require('http');

// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('Hello from server!');
// }).listen(4500);


// var test = (testVar) => {
//     console.log(testVar);
// };

// function test(){
//     console.log('test');
// }

// test('randomness');

//INSERT INTO `customers` (`ID`, `Name`, `Age`, `Score`) VALUES (NULL, 'Prashanth', '30', '100')