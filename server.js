const express = require('express');
const cors = require('cors');
const db = require('./database');
const usersRoute = require("./routes/users");

const PORT = "3333";
const IP_ADDRESS = "192.168.8.103";

const app = express();

// middle wares
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/users/', usersRoute);

app.listen(PORT, IP_ADDRESS, (err) => {
    console.log(`connected at http://${IP_ADDRESS}:${PORT}/api/users`);
})
