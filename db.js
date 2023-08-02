var mysql=require("mysql");
    const util = require('util')

var connection= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"bankconnect"
});

connection.connect(function(err){
    if(err){
        console.log('error connection to database');
        return ;
    }
    else{
        console.log("connected to database")
    }
})
const query = util.promisify(connection.query).bind(connection)

module.exports = query;