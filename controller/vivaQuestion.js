let VIVA = require('../model/vivaQuestion')

exports.create = async function(req, res, next) {
    try {
        let codeData = await VIVA.create(req.body) 
        res.status(201).json({
            status : 'success',
            message : 'Question created succesfully',
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
        let codeData = await VIVA.find() 
        res.status(201).json({
            status : 'success',
            message : 'All data found succesfully',
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
        let codeData = await VIVA.findById(id) 
        res.status(201).json({
            status : 'success',
            message : 'Question data found succesfully',
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
        let codeData = await VIVA.findByIdAndDelete(id) 
        res.status(201).json({
            status : 'success',
            message : 'Question deleted succesfully',
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
        let codeData = await VIVA.findByIdAndUpdate(id,req.body,{new : true}) 
        res.status(201).json({
            status : 'success',
            message : 'Question updated succesfully',
            data : codeData
        })
    } catch (error) {
        res.status(404).json({
            status : 'fail',
            message : error.message
        })
    }
}