const mongoose = require('mongoose');
const { Schema } = mongoose;



const noteSchema = new Schema({
    category:{type:String, required: true},
    title:{type:String, required: true},
    note: String,
    created:{type:Date, default: Date.now},
    user: String
});


const model = mongoose.model('notes', noteSchema, 'notes_collection');

exports.getNoteSchema = ()=>{
    return model;
};

