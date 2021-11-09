const express = require('express')
const app = express();
const config = require('./config/mongoose')
const cors = require('cors')
const routes = require('./routes')
app.use(cors())
app.use(express.urlencoded());
app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 5000
if (process.env.NODE_ENV == "production") {
    app.use(express.static(" frontend/my-app/build"));
    
}
app.listen(PORT, (err) => {
    if (err)
        console.log("server is not working");
    else
        console.log("server is running");
});



