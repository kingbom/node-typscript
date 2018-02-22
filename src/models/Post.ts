import { Schema, model } from 'mongoose';

let PostSchema : Schema = new Schema({
    title : {
        type : String,
        default : '',
        required : true
    },
    content : {
        type : String,
        default : '',
        required : true
    },
    slug : {
        type : String,
        default : '',
        required : true,
        unique : true,
        lowercase : true
    },
    image: {
        type : String,
        default : ''
    },
    createdAt : Date,
    updatedAt : Date
});

export default model('Post', PostSchema);