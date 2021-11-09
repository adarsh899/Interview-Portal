const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/interview-portal', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("mongoose connected");
});

module.exports = db;
