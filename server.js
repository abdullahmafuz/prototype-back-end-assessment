const express =require('express');

const DB=require('./config/db');

const app=express();



//connet DB

DB.connectDB();
DB.connectDBapi();


app.get('/',(req,res)=>{
    res.send('APi is Running !!!');
})


//Port allocation
const PORT=process.env.PORT || 5000 ;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})