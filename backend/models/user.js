const mongoose = require('mongoose')

const validator = require('validator');

const userSchema = new mongoose.Schema({

    fullName: {type:String, required: true}, // String is shorthand for {type: String}
    phoneNumber: {type:String, required: true},
    email: {String, required: true, unique: true, validate: [validator.isEmail, 'please enter a valid email']},
    password: {
        type:String, 
        required: [true, 'please enter your password'], 
        minLength: [6, 'please enter your password'], 
        select:false
    },
    avatar: {
        public_id :{
            type: String,
            required:true,
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default: 'user'
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

module.exports =mongoose.model('User', userSchema);