const jwt = require('jsonwebtoken')
const { signupSchema, signinSchema } = require("../middleware/validator");
const { doHash, dohashValidation } = require("../utils/hashing");
const User = require('../models/userModel')

exports.signup = async (req, res) => {
    const {email,password} = req.body;
    try {
        const {error, value} = signupSchema.validate({email,password});

        if(error){
            return res.status(401).json({success:false, message: error.details[0].message})
        }
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(401).json({success:false, message: 'User already exist!'})
        }

        const hashedPassword = await doHash(password, 12);

        const newUser = new User({
            email,
            password:hashedPassword,
        })
        const result = await newUser.save();
        result.password = undefined;
        res.status(201).json({
            success: true, message: 'Your account has been created successfully', result
        })
    } catch (error) {
        console.log(error);
    
    }
};

exports.signin = async (req,res) => {
    const {email,password} = req.body;
    try {
        const {error,value} = signinSchema.validate({email,password});
        if(error){
            return res
            .status(401)
            .json({success:false, message: error.details[0].message})
        }
        const existingUser = await User.findOne({email}).select('+password')
        if(!existingUser){
            return res
            .status(401)
            .json({success: false, message: 'User does not exist!'})
        }
        const result = await dohashValidation(password, existingUser.password)
        if(!result){
            return res
            .status(401)
            .json({sucess: false, message: 'Invalid credentials!'});
        }
        const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            verified: existingUser.verified,
        }, process.env.TOKEN_SECRET
    );
    res.cookie('Authorization', 'Bearer' + token, { expires: new Date(Date.now() + 8 + 3600000), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production'}).json({ success: true, token, message: 'logged in successfully',})

    } catch (error) {
        console.log(error);
        
    }
}