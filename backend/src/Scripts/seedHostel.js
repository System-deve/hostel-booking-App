import ConnectDB from "../Config/database.js";
import Hostel from "../Models/Hostel.js";
const sampleHostels =[
   {
     name: 'sun ways Hostel',
     description: 'Nice hostel',
     location: 'Wandegeya',
     Amenities: ["wifi", "Bus"],
     image: 'https://images.unsplash.com/photo-1623625434462-e5e42318ae49?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',



    }



]
 const seedHostels = async()=>{
    try{
        await ConnectDB()
         console.log('Connected Successfully and ready to seed')
            
         const existingData= await Hostel.find();

       
        if((existingData.length) > 0){
            await Hostel.deleteMany()
            console.log("deleted existing hostels")

        }
        //insert into db
        const insertedHostels= await Hostel.insertMany(sampleHostels);
        console.log(`inserted ${insertedHostels.length} hostel(s)`)

    } catch(error){
        console.error('Failed to seed Hotels data', error)
        
    }

 }
 seedHostels()
 