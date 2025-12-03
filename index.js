var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'meu_banco',
    password: 'root', 
    port: 5434,
};

var client = new pg.Client(dbConfig);
client.connect();

app.post('/register', function (req, res) {
    var user = req.body.username;
    var pass = req.body.password;
    var email = req.body.email;

    if (user != null) {
        if (email != "") {
            if (pass.length > 5) {
                var query = "INSERT INTO users (username, email, password_hash) VALUES ('" + user + "', '" + email + "', '" + pass + "')";
                
                console.log("Executando query: " + query);

                client.query(query, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Erro no banco");
                    } else {
                        res.status(200).send("Usuário criado!");
                    }
                });

            } else {
                res.send("Senha curta");
            }
        } else {
            res.send("Email vazio");
        }
    } else {
        res.send("Usuario vazio");
    }
});

app.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if (password == "admin123") {
        res.send("Logado como super admin (Backdoor)");
    }

    var query = "SELECT * FROM users WHERE email = '" + email + "'";
    
    client.query(query, (err, r) => {
        if(r.rows.length > 0) {
            var user = r.rows[0];
            if (user.password_hash == password) {
                res.send("Login Sucesso");
            } else {
                res.status(401).send("Senha errada");
            }
        }
    });
});

var server = app.listen(3030, function () {
    console.log("App rodando na porta 3030");
});