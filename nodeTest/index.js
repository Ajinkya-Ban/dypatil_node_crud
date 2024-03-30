// var http = require('http'); //here i am declared a package or it is called module in node.
// http.createServer(function(req, res){

//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.end('Hello world');
// }).listen(5050);

var mysql = require('mysql2');
var con = mysql.createConnection(
{
    host:"localhost",
    user:"root",
    password:"admin123",
    database:"nodedb"
});
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use('/css',express.static('css'));

app.get('/', function(req,res){
    res.sendFile(__dirname+'/register.html');
});

app.post('/', function(req, res){
    var name = req.body.name;
    var mob = req.body.mob;
    var email = req.body.email;

    con.connect(function(error){
        if(error) throw error;
        var insert_query = "insert into students(name,mob,email) values('"+name+"','"+mob+"','"+email+"')";
        con.query(insert_query, function(error, result){
        if(error) throw error;
        //res.send("Registration success"+result.insertId);
        res.redirect('/students');

        });
    });
});

app.get('/students',function(req,res){

    con.connect(function(error){
        if(error) throw error;
        var select_query = "Select * from students";
        con.query(select_query, function(error, result){
            if(error) console.log(error);
            res.render(__dirname+'/students',{students:result});
        });
    });
});

app.get('/delete-students',function(req,res){

    con.connect(function(error){

        if(error) throw error;
        var del_id = req.query.id;
        var del_query = "delete from students where id=?";
        con.query(del_query,[del_id], function(error, result){
            if(error) throw error;
            res.redirect('/students');

        });
    });

});

app.get('/update-student',function(req,res){

    res.redirect('/update');

});
app.listen(5050);