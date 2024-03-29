var mysql = require('mysql2');
var conn = mysql.createConnection(
{
    host:"localhost",
    user:"root",
    password:"admin123",
    database:"nodedb"
});

conn.connect(function(error){
    if(error) throw error;
    console.log("Connected...")
});
