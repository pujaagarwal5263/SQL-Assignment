var express = require('express'); 
var app = express();
// var sql = require('mssql'); 
var mysql      = require('mysql');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs')
app.use(express.static('public'))

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'Puja@123',
  database : 'assignment'
});

connection.connect();
app.get("/users",(req,res)=>{
    connection.query('SELECT username, password, email, first_name, last_name, lastseen from `ilance_users`', function (error, results, fields) {
        if (error) throw error;
        
        for( let index = 0; index < results.length; index++ ) {
          console.log(results[index].username); 
          console.log(results[index].password);
          console.log("-------------");
        }
        //return res.status(200).json(results);
        return res.status(200).render('users', {users: results});
      });
})

app.get("/projects",(req,res)=>{
    connection.query('SELECT id, project_id, project_title, description, ishtml, ilance_projects.user_id, ilance_users.username from ilance_projects INNER JOIN ilance_users ON ilance_projects.user_id = ilance_users.user_id;', function (error, results, fields) {
        if (error) throw error;

        for( let index = 0; index < results.length; index++ ) {
          console.log(results[index].project_id); 
          console.log(results[index].project_title);
          console.log("-------------");
        }

        return res.status(200).render('projects',{projects: results})
      });
})

app.get("/subusers",(req,res)=>{
    connection.query('SELECT ilance_subscription_user.active, ilance_subscription_user.paymethod, ilance_subscription_user.startdate, ilance_users.username FROM ilance_subscription_user INNER JOIN ilance_users ON ilance_subscription_user.user_id = ilance_users.user_id;', function (error, results, fields) {
        if (error) throw error;

        for( let index = 0; index < results.length; index++ ) {
          console.log(results[index].username); 
          console.log(results[index].startdate);
          console.log("-------------");
        }

        return res.status(200).render('subusers',{subusers: results})
      });
})

 app.listen(8081, function () {    
    console.log("app listening at 8081")
});