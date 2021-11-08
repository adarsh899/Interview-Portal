const express = require('express')
const app = express();
const config = require('./config/mongoose')
const cors = require('cors')
const routes = require('./routes')
app.use(cors())
app.use(express.urlencoded());
app.use(express.json());
app.use('/', routes);

app.listen(5000, (err) => {
    if (err)
        console.log("server is not working");
    else
        console.log("server is running");
});



