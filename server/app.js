const express = require('express');
const { dbConn } = require('./config/db');
const itemRoutes = require('./routes/item');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose')

const app = express();
const cors = require('cors');

const port = 4000;
app.use(express.json());
app.use(cors());

app.use('/admin/items', itemRoutes);
app.use('/user', userRoutes);

async function main() {
    await dbConn();
    app.get('/dummy', (_, res) => {
        res.json({ status: "yay :D" })
        res.end()
    })
    app.listen(port, () => console.log(`server started at port ${port}`))
}

main().catch(console.error)