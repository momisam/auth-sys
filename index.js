const express = require('express')
const helmet = require('helmet')

const app = express()
app.use(helmet)
app.use(cors)
app.use(express.json())
app.get('/', (req,res) => {
    res.json({message: 'Hello from the server'})
})


app.listen(process.env.PORT, () => {
    console.log(`Server is listening`);
    
})