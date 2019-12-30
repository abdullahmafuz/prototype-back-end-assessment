const mongoose = require('mongoose');

const config=require('config');

const db=config.get('mongoURI');

const dbAPI=config.get('mongoURIapi');


//connection for custom db of user ,etc 

const connectDB = async ()=>{
    try{

        await mongoose.connect(db,{ useUnifiedTopology: true ,useNewUrlParser: true});

        console.log("prototype database database is connected .... ")

    }catch(err){

    console.error(err.message);

    // Exit process with failure

    process.exit(1);

    }
}

//connection for Starwars api database

const connectDBapi = async ()=>{
    try{

        await mongoose.connect(dbAPI,{ useUnifiedTopology: true ,useNewUrlParser: true });

        console.log("Starwars api database is connected .... ")

    }catch(err){

    console.error(err.message);

    // Exit process with failure

    process.exit(1);

    }
}


module.exports = {
    connectDB,
    connectDBapi
};