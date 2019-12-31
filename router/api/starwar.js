const express =require('express');

const router =express.Router();

const DB=require('../../config/db');


const api=DB.conn2;





router.get('/', async(req,res)=>{

    try{
        const films=await api.collection("species").find({}).toArray();
 
 
 
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

   let arrchar=character.split(',');

  let len=arrchar.length

  var arrnum=[]

  for(let i=0;i<len;i++){
      
    arrnum.push(parseInt(arrchar[i]));
  }

  

let result =maxRepeating(arrnum);


// fetching data from people db, for character (person) appeared in most of the Star Wars films by its id

const people=await api.collection("people").findOne({id:result.maxEl});

 
         res.json(people.name);
 
 }catch(err){

     console.error(err.message)

     res.status(500).send('server error')
 }

})












router.get('/speciesappearedmost', async(req,res)=>{
    
   
     
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

  

var result =maxRepeating(arrnum1);


let mostsp=result.modeMap

let arryOfMaxSpec=[]

for (let key in mostsp){
    if(mostsp.hasOwnProperty(key)){

        if(mostsp[key] > result.maxEl  )
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
            console.log(arryOfMaxSpec[i].id)
            if(arryOfMaxSpec[i].id == item.id){
                let species=item.val;
                let noOfAppeared=arryOfMaxSpec[i].val;
                finalarr.push({species,noOfAppeared})
            }
        }
            
    
       
     })

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