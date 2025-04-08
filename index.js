const express = require('express')

const app = express()

app.get('/', (req,res) => {
    res.json({message: 'Hello from the server'})
})


app.listen(process.env.PORT, () => {
    console.log(`Server is listening`);
    
})