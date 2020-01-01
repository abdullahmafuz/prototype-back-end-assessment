const express =require('express');

const router =express.Router();

const DB=require('../../config/db');


const api=DB.conn2;






 router.get('/', async(req,res)=>{

    try{

    // working with Vehical db    
        const arrofvehicles=await api.collection("vehicles").find({}).toArray();
 
// gathering all pilots ref to pople db

        let arrvehicles=arrofvehicles.map((data)=>{
            let val= data.pilots;
            if (val || val.length) {
                return val;
            }
        })

        var filtedArrOfpilots=[]
        for (let i = 0; i < arrvehicles.length; i++) {
            
            if(arrvehicles[i].length > 0){
                if(arrvehicles[i][0] != null){
                    filtedArrOfpilots.push(arrvehicles[i][0]);
                }
                
                if(arrvehicles[i][1] != null){
                    filtedArrOfpilots.push(arrvehicles[i][1]);
                }
            }
            
        }


        // find max value from array of pilots

        const allPilots_id=uniq(filtedArrOfpilots)



                                
                        



                            // collection of people
                        const arrofpeople=await api.collection("people").find({}).toArray();    
                        
                        

                        var arrofpeople_homeworld=[]
        
                        arrofpeople.forEach(item =>{
                
                        if(allPilots_id.includes(item.id)){
                           
                            let planetId=item.homeworld;
                            arrofpeople_homeworld.push(planetId);
                        }
                        
                    })
                
                    var arrofpeople_name_home=[]
   //*****list of pople with homwworld id */             
                    arrofpeople.forEach(item =>{
                
                        if(allPilots_id.includes(item.id)){
                            let peopleId=item.id;
                            let peopleName=item.name;
                            let planetId=item.homeworld;
                            arrofpeople_name_home.push({peopleId,planetId,peopleName});
                        }
                        
                    })
                
                
                    arrofpeople_homeworld=uniq(arrofpeople_homeworld);




                    const arrofplanets=await api.collection("planets").find({}).toArray();




 
             
                  
                    
                     //List of homeWorld id and homeWorld name
                    
                     var listOfpilotHomeWorld=[]
                     arrofplanets.forEach(item =>{
                    
                        if(arrofpeople_homeworld.includes(item.id)){
                            let planetId=item.id;
                            let planetName=item.name;
                            listOfpilotHomeWorld.push({planetId,planetName});
                        }
                        
                    })
                    
                    
                    
                    // speces name also

                    const arrofspecies=await api.collection("species").find({}).toArray();


                    //list of homeworld id and spieces name of the pilots
                        
                    var listofPilotspecies=[];

                    arrofspecies.forEach(item =>{

                        let speciesId=item.id;
                        let planetId=item.homeworld;
                        let speciesName=item.name;

                        item.people.forEach(val =>{
                            if(allPilots_id.includes(val)){
                                let peopleId=val
                                
                                listofPilotspecies.push({peopleId,speciesId,planetId,speciesName});
                            }
                        })

                        
                        
                    })



/*
arrofpeople_name_home

listOfpilotHomeWorld

listofPilotspecies

*/

var initDataCollection=[]

listOfpilotHomeWorld.forEach(data =>{
    let planetId=data.planetId;
    let planetName=data.planetName;
    var peopleId;
    var peopleName;
    arrofpeople_name_home.forEach(data2 =>{

       
      peopleId=data2.peopleId;
       
      peopleName=data2.peopleName;

        if(data.planetId == data2.planetId){
            initDataCollection.push({planetId,planetName,peopleId,peopleName})
        }

    })


    

})

var DataCollection=[]

initDataCollection.forEach(data =>{
    let planetId=data.planetId;
    let planetName=data.planetName;

 let peopleId=data.peopleId
 let peopleName=data.peopleName
 var speciesId;
 var speciesName;

 for(let i=0;i<listofPilotspecies.length;i++){


    speciesId=listofPilotspecies[i].speciesId;
         speciesName=listofPilotspecies[i].speciesName

        if(data.planetId == listofPilotspecies[i].planetId){
            DataCollection.push({planetId,planetName,peopleId,peopleName ,speciesId,speciesName});
            return ;
        }
        
        if(i == listofPilotspecies.length -1){

            
            speciesId='unknown';
            speciesName='unknown';
            DataCollection.push({planetId,planetName,peopleId,peopleName ,speciesId,speciesName})
            
        }
 }
    

   
    

})


         res.json(DataCollection);
 
     }catch(err){
 
         console.error(err.message)
 
         res.status(500).send('server error')
     }


})





// uni element in array

function uniq(arr) {
    return arr.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}




 






module.exports=router;