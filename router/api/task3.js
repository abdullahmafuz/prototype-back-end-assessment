const express =require('express');

const router =express.Router();

const DB=require('../../config/db');


const api=DB.conn2;





//task3









router.get('/', async(req,res)=>{
    
   
     
     try{

         // fetching films  data from db

        const films=await api.collection("films").find({}).toArray();
 
        var species=films.reduce((acc,data)=>{
            return  acc + data.species;
        } ,[])
        
        let arrchar=species.split(',');

            let len=arrchar.length

            var arrnum1=[]

            for(let i=0;i<len;i++){
                
                arrnum1.push(parseInt(arrchar[i]));
            }

  
// finding max number of 1 specie apparent in films

var result =maxRepeating(arrnum1);


let mostsp=result.modeMap

let arryOfMaxSpec=[]



  
// finding max species apparent in films
for (let key in mostsp){
    if(mostsp.hasOwnProperty(key)){

        if(mostsp[key] > result.maxCount -4  )
        {
        arryOfMaxSpec.push(Number(key))
        }
    }
 }
 let newArryOfMaxSpec=[]
 

 
 // fetching specices  data from db
    let listOfSpecies =await api.collection("species").find({}).toArray();
    
 
    listOfSpecies.forEach(item =>{

        if(arryOfMaxSpec.includes(item.id)){
            let id =item.id
            let val=item.name;
           newArryOfMaxSpec.push({id,val});
        }
        
    })

    let finalarr=[]

    arryOfMaxSpec=[];
    for (let key in mostsp){
        if(mostsp.hasOwnProperty(key)){
    
            if(mostsp[key] > result.maxEl  )
            {
                let val=mostsp[key]
                let id=Number(key)
            arryOfMaxSpec.push({id,val})
            }
        }
     }
 

     //combine speices data and number of apparent in films
     
     newArryOfMaxSpec.forEach((item,index)=>{

        let size=0;
        for (let key in arryOfMaxSpec) {
            if (arryOfMaxSpec.hasOwnProperty(key)) 
            size++;
        }
        
        for(let i=0;i < size;i++){
           
            if(arryOfMaxSpec[i].id == item.id){
                let species=item.val;
                let noOfAppeared=arryOfMaxSpec[i].val;
                finalarr.push({species,noOfAppeared})
            }
        }
            
    
       
     })

     finalarr.sort((a,b)=>{
        return a.noOfAppeared < b.noOfAppeared
     });

        res.json(finalarr);
 
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