const express = require("express");
const fs = require("fs");
const task = require("../../models/task.js");
const {AsyncWrapper} = require("../async_wrapper.js")
const {APIerror,error_handle} = require("../error_handler.js")

const getalltasks =  AsyncWrapper (async (request,response)=>{
    
        //html = fs.readFileSync("D:\\computer\\project\\node_js Task Scheduler\\backend\\public\\index.html")
        console.log("\nGet all tasks")
        const tasks = await task.find({});
        //html = JSON.parse(JSON.stringify(html))
        //console.log(html);
        console.log(tasks);
    
        response.status(200).json({tasks})
}
)

const createsingletask = AsyncWrapper(async (request,response)=>{
    // saves task in mongo DB
    const new_task = await task.create(request.body); 
    console.log("\nCreated new task with ",new_task._id);
    //console.log(new_task);
    response.json({new_task});
    
})

const getsingletask = AsyncWrapper(async (request,response)=>{
    
        const document = await task.find({_id:request.params.id});
        console.log("\nRequested document with id ",request.params.id);
        if(!document)
        {
            return error_handle(APIerror(404,"Document with id "+request.params.id+" not found"),request,response)
        }
        //console.log(document);
        response.status(200).json({document});
})


const updatetask = AsyncWrapper(async (request,response)=>{

        console.log("\nUpdating documet with id "+request.params.id)
        console.log(request.body);
        const update = await task.findOneAndUpdate({_id:request.params.id},request.body,{new:true,runValidators:true});
        if(!update)
        {
            return error_handle(APIerror(404,"Document with id "+request.params.id+" not found"),request,response)
        }
        console.log("Update successfull")
        response.json({msg:"Update Successfull!!!!",data:update})
})

const deletetask = AsyncWrapper(async (request,response)=>{

        const del_task = await task.findOneAndDelete({_id:request.params.id})
        if(!del_task)
        {
            return error_handle(APIerror(404,"Document with id "+request.params.id+" not found"),request,response)
        }
        console.log("\nTask with id: "+request.params.id+" is deleted")
        response.status(200).json({del_task})

})


module.exports = {
    getalltasks , createsingletask , getsingletask , updatetask , deletetask 
}