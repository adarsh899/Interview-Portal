const express = require('express')
const app = express();
const config = require('./config/mongoose')

const routes = require('./routes')
app.use(express.urlencoded());
app.use(express.json());
app.use('/', routes);

app.listen(5000, (err) => {
    if (err)
        console.log("server is not working");
    else
        console.log("server is running");
});



