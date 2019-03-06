const express = require('express');
const user = require('./routes/user.route');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
//--------------------------------------------------
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jwtauth'), { useNewUrlParser: true };
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = (`${now} ${req.method} ${req.url}`);

    fs.appendFile(`server.log`, log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server log.')
        }
    });
    next();
})

app.get('/', function (req, res) {
    res.json({
        "Tutorial": "Welcome to the Node express JWT Tutorial"
    });
});

//----------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', user);

app.listen(PORT, function () {
    console.log('Server is running on Port', PORT);
});

