const express =require('express');

const router =express.Router();

const DB=require('../../config/db');


const api=DB.conn2;







//task1




router.get('/', async(req,res)=>{
    
   // fetching films  data from db
    
    try{
       const films=await api.collection("films").find({}).toArray();


       // removing regEx and finding length


    const opening_crawl=films.map(data=>{
          return  data.opening_crawl.replace(/(\r\n|\n|\r)/gm, "").length;
      })

      let max=opening_crawl.sort().reverse()




      var Final_opening_crawl;
      
      //finding max opening crawl character


      films.forEach(data=>{
          
          let lenth =data.opening_crawl.replace(/(\r\n|\n|\r)/gm, "").length;
         if(lenth == max[0]){
             Final_opening_crawl=data;
         }
    })


        res.json(Final_opening_crawl.title);

    }catch(err){

        console.error(err.message)

        res.status(500).send('server error')
    }
})










module.exports=router;