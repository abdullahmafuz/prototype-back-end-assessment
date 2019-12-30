const express =require('express');




const cors = require('cors')

const app=express();


//connet DB



//INit Middleware

app.use(express.json({ extended:false }));

app.use(cors());


// Define Routes

app.get('/',(req,res)=>{
    res.send('APi is Running !!!');
})

app.use('/api/users',require('./router/api/user'));

//Port allocation
const PORT=process.env.PORT || 5000 ;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})