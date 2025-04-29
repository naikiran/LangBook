let mongoose = require('mongoose');
let Schema = mongoose.Schema
let userSchema = new Schema({
    
    name:{
        type : String,
        required : [true,'Name is required'],
        trim : true
    },
    email : {
        type : String,
        required : [true,'Email is required'],
        unique : true,
        trim : true,
    },
       password : {
        type : String,
        required : [true,'Password is required'],
        trim : true
    }
})

let USER = mongoose.model('USER',userSchema)
module.exports = USER