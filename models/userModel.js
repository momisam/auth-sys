const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        email:{
            types: String,
            required: true
        }
    }
)