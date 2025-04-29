let CODE = require('../model/code')

exports.create = async function(req, res, next) {
    try {
        let codeData = await CODE.create(req.body) 
        res.status(201).json({
            status : 'success',
            message : 'User Created succesfully',
            data : codeData
        })
    } catch (error) {
        res.status(404).json({
            status : 'fail',
            message : error.message
        })
    }
}

exports.foundalldata = async function(req, res, next) {
    try {
        let codeData = await CODE.find() 
        res.status(201).json({
            status : 'success',
            message : 'User All data Fetch succesfully',
            data : codeData
        })
    } catch (error) {
        res.status(404).json({
            status : 'fail',
            message : error.message
        })
    }
}


exports.userData = async function(req, res, next) {
    try {
        let id = req.params.id
        let codeData = await CODE.findById(id) 
        res.status(201).json({
            status : 'success',
            message : 'User data found succesfully',
            data : codeData
        })
    } catch (error) {
        res.status(404).json({
            status : 'fail',
            message : error.message
        })
    }
}

exports.userdelete = async function(req, res, next) {
    try {
        let id = req.params.id
        let codeData = await CODE.findByIdAndDelete(id) 
        res.status(201).json({
            status : 'success',
            message : 'User Deleted succesfully',
            data : codeData
        })
    } catch (error) {
        res.status(404).json({
            status : 'fail',
            message : error.message
        })
    }
}


exports.userupdate = async function(req, res, next) {
    try {
        let id = req.params.id
        let codeData = await CODE.findByIdAndUpdate(id,req.body,{new : true}) 
        res.status(201).json({
            status : 'success',
            message : 'User Updated succesfully',
            data : codeData
        })
    } catch (error) {
        res.status(404).json({
            status : 'fail',
            message : error.message
        })
    }
}