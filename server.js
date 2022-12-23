console.log('Server-side code running');

const bodyParser = require('body-parser');
const express = require('express');
const sql = require('mssql');
const app = express();


// serve files from the public directory
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
// start the express web server listening on 8080
app.listen(8080, () => {
  console.log('listening on 8080');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/clicked', (req, res) => { 
    addUser(req.body.user);
    res.sendStatus(200);
    //res.send("ok")
})

app.get('/clicks', (req, res) => {
    var results1 = []
    async function info() {
        var conection = await sql.connect(config);
        await conection.request().query('SELECT * FROM users;',
            function (err, results, fields) {
                // if (err) throw err;
                // else {
                //     console.log('Selected ' + results.recordset.length + ' row(s).');
                // }
                // results.recordset.forEach(element => {
                //     results1.push(element.name)
                // });
                //console.log(results.recordset);
                res.send(results)
                //console.log('Done.');
            })
    }
    info()
        //res.send(results1)
  });

const config = {
    user: '4dm1n157r470r', // better stored in an app setting such as process.env.DB_USER
    password: '4-v3ry-53cr37-p455w0rd', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'app-db-server1256.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'app-db', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

console.log("Starting...");
connect();

async function connect() {
    try {
        var poolConnection = await sql.connect(config);
        console.log("Conexion establecida");
        queryDB(poolConnection);
    } catch (err) {
        console.error(err.message);
    }
}



async function queryDB(poolConnection) { 
    await poolConnection.request().query('IF(EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = \'dbo\' AND TABLE_NAME = \'users\'))BEGIN PRINT \'Database table exists\' END; ELSE BEGIN CREATE TABLE users (id INT NOT NULL IDENTITY(1,1) PRIMARY KEY, name VARCHAR(50), lastname VARCHAR(50)) END;')

}

async function addUser(user){ 
    var conection = await sql.connect(config);
    //await conection.request().query('INSERT INTO users(name,lastname) VALUES (\'name\', \'lastname\');',
    const name = user.name;
    const lastname = user.lastname;    
    var sql1 = `INSERT INTO users(name,lastname) VALUES (\'${name}\',\'${lastname}\');`
    await conection.request().query(sql1,
        function (err, results, fields) {
                if (err) throw err;
        else console.log('Inserted ' + results.affectedRows + ' row(s).');
        })

}
