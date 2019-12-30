const express =require('express');

const app=express();

//Port allocation
const PORT=process.env.PORT || 5000 ;



app.get('/',(req,res)=>{
    res.send('APi is Running !!!');
})




app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})