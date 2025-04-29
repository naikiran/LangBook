let USER = require('../model/user')
let bcrypt = require('bcryptjs')


exports.signup = async function(req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password,10)
        let userdata = await USER.create(req.body)
        res.status(201).json({
            status : 'success',
            message : 'user created sucessfully' ,
            data : userdata
        })
    } catch (error) {
        res.status(404).json({
            status : 'fail',
            message : error.message,
        })
    }
};   

exports.login = async function(req, res, next) {
    try {
        let userdata = await USER.findOne({email: req.body.email})
        if(!userdata)
        {
            throw new Error('user not found!')
        }
        let checkpass = await bcrypt.compare(req.body.password,userdata.password)
        if(!checkpass)
        {
            throw new Error('inccorect passowrd!')
        }
        res.status(201).json({
            status : 'success',
            message : 'user Login sucessfull' ,
            data : userdata
        })
    } catch (error) {
        res.status(404).json({
            status : 'fail',
            message : error.message,
        })
    }
};   
