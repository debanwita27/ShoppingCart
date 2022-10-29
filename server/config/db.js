const mongoose = require('mongoose');

exports.dbConn = async () => {
    const dbURL = "mongodb+srv://<username>:<password>@cluster0.pmx66du.mongodb.net/test_db?retryWrites=true&w=majority";
    const conn = await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected")
    return conn
}
