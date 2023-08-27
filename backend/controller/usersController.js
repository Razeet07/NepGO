const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler')

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//Register a User => /api/v1/register

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const { fullName, phoneNumber, email, password } = req.body;


    const user = await User.create({
        fullName,
        phoneNumber,
        email,
        password,
        avatar: {
            public_id:'asbc',
            url:'asdas'
        }
    })

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    
    })

});

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const{email, password} = req.body;
    //checks if email and password is entered by user
    if(!email ||!password){
        return next(new ErrorHandler('please enter email and password', 400))

    }
    //finding user in database
    const user = await User.findOne({ email }).select( '+password');   

    if(!user) {
        return next(new ErrorHandler('Invalid Email or Passoword', 401))
    }
    //checking password 
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Passoword', 401))
    }
    const token= user.getJwtToken()
    res.status(200).json({
        success: true,
        token
    })
})