const express =require('express');

const router =express.Router();

const bcrypt =require('bcryptjs');

const {check,validationResult}=require('express-validator');

const DB=require('../../config/db');

DB.connectDB();

const User = require('../../models/User');


// @route   POST api/users

//@desc     Register User

//@access    Public


router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include valid email').isEmail(),
    check('password','Please enter a password with 6 or more character').isLength({min:6})
],async (req,res)=>{

    
    const errors=validationResult(req);

    // check for errors
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name,email,password}=req.body;
   
    try{

    // see user exist

        let user=await User.findOne({email});

        if(user){
           return res.status(400).json({errors:[{msg: 'User already exist'}]})
        }


        // Create user 

        user=new User({
            name,
            email,
            password
        });


    //Encrypt password with bcrypt.js


    const salt =await bcrypt.genSalt(10);

    user.password =await bcrypt.hash(password,salt);

    await user.save();



    //return JWTtoken

    res.send("users Created ..")


    }catch(err){

        console.error(err.message);
        res.status(500).send('Server Error');

    }



    
})



module.exports =router;