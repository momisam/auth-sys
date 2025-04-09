const { types, required } = require('joi')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        email:{
            types: String,
            required: [true, 'Email is required'],
            trim: true,
            unique: [true, 'Email must be unique'],
            minLength: [5, 'Email must have 5 characters'],
            lowercase: true,
        },
        password:{
            types: String,
            required: [true, 'Password must be provided'],
            trim: true,
            select: false,
        },
        verified:{
            
        }
    }
)