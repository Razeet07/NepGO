const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const validator = require('validator');

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, 'please enter a name']
    }, // String is shorthand for {type: String}
    phoneNumber: {
        type: Number,
        required: [true, 'please enter a valid phone number']
    },
    email: {
        type: String,
        required: [true, 'please enter a valid email address'],
        unique: true,
        validate: [validator.isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter your password'],
        minlength: [6, 'please must be greater than 6 char'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})
//excrypting password before saving user

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()

    }
    this.password =await bcrypt.hash(this.password, 10)
})
//Compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//return json token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })

}

module.exports = mongoose.model('User', userSchema);