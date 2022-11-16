const mongoose = require('mongoose');

 

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Task should have a name"],
        trim:true,
        maxlength:[20,"Name cannot be more than 20 characters"]
    },
    completed:{
        type:Boolean,
        default:false
    }
})

// Task is collection name
module.exports = mongoose.model('Task',Schema);