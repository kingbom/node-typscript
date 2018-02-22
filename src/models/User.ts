import { Schema, model } from 'mongoose';

let UserSchema : Schema = new Schema({
    name : {
        type : String,
        default : '',
        required : true
    },
    email : {
        type : String,
        default : '',
        required : true,
        unique : true
    },
    username : {
        type : String,
        default : '',
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        default : '',
        required : true
    },
    createdAt : Date,
    updatedAt : Date
});

export default model('User', UserSchema);