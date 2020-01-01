const express =require('express');

const router =express.Router();

const DB=require('../../config/db');


const api=DB.conn2;






//task2





router.get('/', async(req,res)=>{


 
    
 try{

    // fetching films  data from db
    const films=await api.collection("films").find({}).toArray();
 
    var character=films.reduce((acc,data)=>{
        return  acc + data.characters;
    } ,[])

   let arrchar=character.split(',');

  let len=arrchar.length

  var arrnum=[]

  for(let i=0;i<len;i++){
      
    arrnum.push(parseInt(arrchar[i]));
  }

  

let result =maxRepeating(arrnum);


let mostsp=result.modeMap

let arryOfMaxSpec=[]



  
// finding max species apparent in films
for (let key in mostsp){
    if(mostsp.hasOwnProperty(key)){

        if(mostsp[key] >= result.maxCount  )
        {
        let keyval=(Number(key));
        let people=await api.collection("people").findOne({id:keyval});
        arryOfMaxSpec.push(people.name);
        }
    }
 }


// fetching data from people db, for character (person) appeared in most of the Star Wars films by its id



 
         res.json(arryOfMaxSpec);
 
 }catch(err){

     console.error(err.message)

     res.status(500).send('server error')
 }

})












 

//Function to find max reapeated number
 function maxRepeating(array)
 {
     if(array.length == 0)
         return null;
     var modeMap = {};
     var maxEl = array[0], maxCount = 1;
     for(var i = 0; i < array.length; i++)
     {
         var el = array[i];
         if(modeMap[el] == null)
             modeMap[el] = 1;
         else
             modeMap[el]++;  
         if(modeMap[el] > maxCount)
         {
             maxEl = el;
             maxCount = modeMap[el];
         }
     }
     return {maxEl,maxCount,modeMap};
 }







module.exports=router;