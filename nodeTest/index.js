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

app.get('/update-students',function(req,res){
    con.connect(function(error){
        if(error) throw error;
    var up_id = req.query.id;
    var select_data = "select * from students where id=?";
    con.query(select_data,[up_id], function(error,result){
        if(error) throw error;
        res.render(__dirname+'/student_update',{students:result});
    });
    });
    
});

app.post('/update-students',function(req,res){

    var name = req.body.name;
    var mob = req.body.mob;
    var email = req.body.email;
    var id = req.body.id;

    con.connect(function(error){
        if(error) throw error;
    var up_id = req.query.id;
    var select_data = "update students set name=?,mob=?,email=? where id=?";
    con.query(select_data,[name,mob,email,id], function(error,result){
        if(error) throw error;
        res.redirect('/students');
    });
    }); 
});


app.get('/search-students', function(req,res){

    con.connect(function(error){
        if(error) throw error;
        var select_query = "select * from students";
        con.query(select_query, function(error, result){
            res.render(__dirname+'/search-student',{students:result});
        });
    });
});

app.get('/search', function(req,res){
    con.connect(function(error){
        if(error) throw error;

        var name =  req.query.name;
        var mob = req.query.mob;
        var search_query = "select * from students where name like '"+name+"%' and mob like '%"+mob+"%'";
        con.query(search_query, function(error, result){
            if(error) throw error;
            res.render(__dirname+'/search-student',{students:result});
        });
    });
});



app.listen(5050);