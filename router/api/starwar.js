const express =require('express');

const router =express.Router();

const DB=require('../../config/db');


const api=DB.conn2;





router.get('/', async(req,res)=>{

    try{
        const films=await api.collection("films").find({}).toArray();
 
 
 
         res.json(films);
 
     }catch(err){
 
         console.error(err.message)
 
         res.status(500).send('server error')
     }


})




router.get('/longestopeningcrawl', async(req,res)=>{
    
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







router.get('/appearedinmost', async(req,res)=>{


 
    
 try{

    // fetching films  data from db
    const films=await api.collection("films").find({}).toArray();
 
    var character=films.reduce((acc,data)=>{
        return  acc + data.characters;
    } ,[])

    arrchar=character.split(',');

  let len=arrchar.length

  var arrnum=[]

  for(let i=0;i<len;i++){
      
    arrnum.push(parseInt(arrchar[i]));
  }

  //to find max reapeated number
    function maxRepeating(arr){

       
        
       let max_count = 1;
       let res = arr[0];
       let curr_count = 1;

       for (let i = 1; i < arr.len; i++) 
        { 
            if (arr[i] == arr[i - 1]) 
                curr_count++; 
            else 
            { 
                if (curr_count > max_count) 
                { 
                    max_count = curr_count; 
                    res = arr[i - 1]; 
                } 
                curr_count = 1; 
            } 
        } 
      
      // If last element is most frequent 
      if (curr_count > max_count) 
      { 
          max_count = curr_count; 
          res = arr[n - 1]; 
      } 
    
      return res; 

    }

let result =maxRepeating(arrnum.sort());


// fetching data from people db, for character (person) appeared in most of the Star Wars films by its id

const people=await api.collection("people").findOne({id:result});

 
         res.json(people.name);
 
 }catch(err){

     console.error(err.message)

     res.status(500).send('server error')
 }

})







module.exports=router;