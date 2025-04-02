const express = requuire('express');

const app = express();
app.use(express.joson())
app.get('/', (req,res) => 
res.json({message: "Hello from server"}))




app.listen(process.env.PORT);