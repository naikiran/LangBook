let category = require('../model/category')

exports.create = async (req, res) => {
    try {
        let data = await category.create(req.body)
        res.status(201).json({
            status: 'success',
            message: 'Category created successfully',
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        })
    }
}

exports.foundalldata = async (req, res) => {
    try {
        let data = await category.find()
        res.status(201).json({
            status: 'success',
            message: 'All data found successfully',
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        })
    }
}

exports.found = async (req, res) => {
    try {
        let data = await category.findById(req.params.id)
        res.status(201).json({
            status: 'success',
            message: 'Data found successfully',
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        })
    }
}
exports.delete = async (req, res) => {
    try {
        let data = await category.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: 'success',
            message: 'Data deleted successfully',
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        })
    }
}

exports.update = async (req, res) => {
    try {
        let data = await category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.status(201).json({
            status: 'success',
            message: 'Data updated successfully',
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        })
        
    }
}