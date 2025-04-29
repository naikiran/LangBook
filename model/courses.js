const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    }
});

const COURSE = mongoose.model('Course', courseSchema);
module.exports = COURSE;
