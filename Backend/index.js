const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const tasksRoutes = require('./routes/tasks.routes');

dotenv.config();
const app = express();
connectDB();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

app.get('/', function(req,res){
    res.send("Hi From Ishan")
});

app.listen(3000,() =>{
    console.log("Server started successfully")
});