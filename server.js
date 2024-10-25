const express  =  require('express');
const app =  express();
const path = require('path');
const cors = require('cors');
const dbconnection = require('./config/database');
const router = require('./router/router');
require('dotenv').config();
const port  =  process.env.PORT || 4000 
app.use(cors());
app.use(express.json());

app.get("/",(req, res)=>{
    res.send("LoserWin");
})

app.use('/api' , router );
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port , ()=>{
    console.log(`The server is running at port ${port}`)
});

dbconnection();
