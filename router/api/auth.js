const express =require('express');

const router =express.Router();

const auth=require('../../middleware/auth');

const bcrypt =require('bcryptjs');

const jwt =require('jsonwebtoken');

const {check,validationResult}=require('express-validator');

const config=require('config');

const DB=require('../../config/db');



const UserConn = require('../../config/db');

const User=UserConn.User;



// @route   POST api/auth

//@desc     search for user

//@access    Private


router.get('/',auth, async(req,res)=>{
    
    try{
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);

    }catch(err){

        console.error(err.message)

        res.status(500).send('server error')
    }
})





// @route   POST api/auth

//@desc     Authenticate user and get Token

//@access    Public


router.post('/',[
    
    check('email','Please include valid email').isEmail(),
    check('password','Please enter a password with 6 or more character').isLength({min:6})
],async (req,res)=>{

    
    const errors=validationResult(req);

    // check for errors
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body;
   
    try{
       
        
    // see user exist

        let user=await User.findOne({email});

        if(!user){
           return res.status(400).json({errors:[{msg: 'Invalid credentails'}]})
        }

        // ckeck for password match
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({errors:[{msg: 'Invalid credentails'}]})
        }

    //return JWTtoken

    const payload ={
        user:{

            id:user.id
        } 
    }

    jwt.sign(
        payload,config.get('jwtSecret'),
        {expiresIn: 360000},
        (err,token)=>{
            if(err) throw err;

            res.json({token})

        }
        
        );


    


    }catch(err){

        console.error(err.message);
        res.status(500).send('Server Error');

    }



    
})





module.exports=router;