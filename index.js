const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Database Connecting ..........');
    
})

app.get('/', (req,res) => {
    res.json({message: 'Hello from the server'})
})


app.listen(process.env.PORT, () => {
    console.log(`Server is listening`);
    
})