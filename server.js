const express =require('express');

const DB=require('./config/db');


const cors = require('cors')

const app=express();








//INit Middleware

app.use(express.json({ extended:false }));

app.use(cors());


// Define Routes

app.get('/',(req,res)=>{
    res.send('StarWars APi is Running !!!');
})

app.use('/api/users',require('./router/api/user'));

app.use('/api/auth',require('./router/api/auth'));



app.use('/api/task1',require('./router/api/task1'));

app.use('/api/task2',require('./router/api/task2'));

app.use('/api/task3',require('./router/api/task3'));

app.use('/api/task4',require('./router/api/task4'));


//Port allocation
const PORT=process.env.PORT || 5000 ;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})