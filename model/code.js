let mongoose = require('mongoose')
let Schema = mongoose.Schema
let codeSchema = new Schema ({
            languageID : {
                type : String
            },
            title : {
                type : String,
                required : [true,'title is required'],
                trim : true
            },
            code : {
                type : Array,
                required : [true,'code is required'],
                trim : true
            },
            explanation : {
                type : String ,
                required : [true, 'explaination is required'],
                trim : true
            }
})

let CODE = mongoose.model('CODE', codeSchema)
module.exports = CODE