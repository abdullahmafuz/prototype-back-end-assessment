const mongoose = require('mongoose');

const config=require('config');

const db=config.get('mongoURI');

const dbAPI=config.get('mongoURIapi');

const userSchema=require('../models/User');




//connection for custom db of user ,etc 


    try{

        var conn1=  mongoose.createConnection(db,{ useUnifiedTopology: true ,useNewUrlParser: true ,useCreateIndex:true})
        console.log("prototype database database is connected ....a ")

    }catch(err){

        console.error(err.message);
    
        // Exit process with failure
    
        process.exit(1);
    
        }    

        

//connection for Starwars api database


try{

    var conn2=  mongoose.createConnection(dbAPI,{ useUnifiedTopology: true ,useNewUrlParser: true,useCreateIndex:true });
    console.log("prototype database database is connected ....b ")

}catch(err){

    console.error(err.message);

    // Exit process with failure

    process.exit(1);

    }    



 
   
const User= conn1.model('User', userSchema);

module.exports = {
    User,
    conn2
}