import mongoose, { Schema } from 'mongoose'
 const hostelScheme = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
        

    },

    description:{
        type: String,
        required: [true, 'Description is required'],
        maxLength: 200,

    },

    location:{
        type: String,
        required:[true, 'Location is required']

    },

    Amenities:{
        type: [String],
           

    },
    image:{
        type: String,
        required: [true, "hostel must have an image"]

    },



 },{
    timestamps: true
 })
  export default mongoose.model("Hostel", hostelScheme)