let mongoose = require('mongoose');
let Schema = mongoose.Schema
let adminSchema = new Schema({
    firstname : {
        type : String,
        required : [true,'First  Name is required'],
        trim : true
    },
    lastname : {
        type : String,
        required : [true,'Last  Name is required'],
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

let ADMIN = mongoose.model('ADMIN',adminSchema)
module.exports = ADMIN