const {connect_db} = require("./db/connection.js");
const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()
// importing the routers
const tasks = require('./routes/tasks');
const { models } = require("./models/task.js");
const {APIerror,error_handle} = require("./routes/error_handler.js");
const { response } = require("express");



app.use(express.json());
app.use(cors());

app.use('/api/v1/tasks',tasks);

app.use("/",(request,response)=>{
    console.log("page not found!!!");
    error_handle(APIerror(404,"Page Not Found!!!"),request,response)
})

/*
    route1 --> to get all the tasks, creating a new task
    route2 --> get a single task, updating the task and delete task -->:id
*/

// server runs only when database is connected and connect_db() coming from connection.js
//const port = process.env.PORT || 3000;
const port=process.env.PORT||3000;
const start = async()=>{
    try{
        
        await connect_db(process.env.MONGO_URI);
        app.listen(port,function(){
            console.log("App is listening at port "+port);
        })
    }
    catch (err){
        console.log(err);
    }
}

start();
