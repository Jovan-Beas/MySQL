var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
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
const url = require('url');

http.createServer(function (req, res) {
    const reqUrl =  url.parse(req.url, true);
    // console.log('request received', req.url);
    // console.log('request received', reqUrl);
    
    if (reqUrl.pathname === '/getCustomers') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let data = [];
        
        con.query("SELECT * FROM customers", function (err, result, fields) {
            if (err) throw err;
            data = result;
            res.end(JSON.stringify(data));
        });
    }
    else if (reqUrl.pathname === '/getTasks') {
        res.writeHead(200, { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' });
        let data = [];
        con.query("SELECT TaskId, TaskName, IsComplete FROM tasks WHERE IsDeleted = 0", function (err, result, fields) {
            if (err) throw err;
            data = result;
            res.write(JSON.stringify(data));
            res.end();
        });
    }
    else if( req.method === 'POST' && reqUrl.pathname === '/addTask'){
        res.writeHead(200, { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' });
        var body = '';
        req.on('data',  function (chunk) {
            body += chunk;
            postBody = JSON.parse(body);
            //console.log(postBody);
            let insertQuery = `INSERT INTO tasks (TaskName) VALUES ('${postBody.TaskName}');`;
            con.query(insertQuery, function (err, result, fields) {
                if (err) throw err;
                // console.log(result);
                res.end(JSON.stringify(result));
            });
        });
        // res.end('Task Added');
    }
    else if( req.method === 'POST' && reqUrl.pathname === '/updateTask'){
        res.writeHead(200, { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' });
        var body = '';
        req.on('data',  function (chunk) {
            postBody = JSON.parse(chunk);
            let updateQuery = `UPDATE tasks SET TaskName =  '${postBody.TaskName}' WHERE TaskId = ${postBody.TaskId};`;
            con.query(updateQuery, function (err, result, fields) {
                if (err) throw err;
                // console.log(result);
                res.end(JSON.stringify({status: 'success'}));
            });
        });
    }
    else if( req.method === 'POST' && reqUrl.pathname === '/deleteTask'){
        res.writeHead(200, { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' });
        var body = '';
        req.on('data',  function (chunk) {
            postBody = JSON.parse(chunk);
            //let deleteQuery = `DELETE FROM tasks WHERE TaskId = ${postBody.TaskId};`;
            let deleteQuery = `UPDATE tasks SET IsDeleted = 1 WHERE TaskId = ${postBody.TaskId}`;
            con.query(deleteQuery, function (err, result, fields) {
                if (err) throw err;
                // console.log(result);
                res.end(JSON.stringify({status: 'delete success'}));
            });
        });
    }
    else if( req.method === 'POST' && reqUrl.pathname === '/completeTask'){
        res.writeHead(200, { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' });
        //var body = '';
        req.on('data',  function (chunk) {
            postBody = JSON.parse(chunk);
            //let deleteQuery = `DELETE FROM tasks WHERE TaskId = ${postBody.TaskId};`;
            let completeQuery = `UPDATE tasks SET IsComplete = 1 WHERE TaskId = ${postBody.TaskId}`;
            con.query(completeQuery, function (err, result, fields) {
                if (err) throw err;
                // console.log(result);
                res.end(JSON.stringify({status: 'complete success'}));
            });
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

//INSERT INTO `customers` (`ID`, `Name`, `Age`, `Score`) VALUES (NULL, 'Prashanth', '30', '100');

// CREATE TABLE Tasks(
//     TaskId INT NOT NULL AUTO_INCREMENT,
//     TaskName VARCHAR(100),
//     DTS DATETIME DEFAULT CURRENT_TIMESTAMP(),
//     PRIMARY KEY(TaskId)
//     );