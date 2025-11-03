import Hostel from '../Models/Hostel.js'

export const getTopRatedHostels = async(req, res)=>{
    try{
        const hostels = await Hostel.aggregate([
            {
                $addFields:{
                    amenitiesCount:{
                        $size: "$amenities"
                    }
                }
            },
            {
                $sort:{
                    amenitiesCount: -1
                }
            },
            {
                $limit:10
            }
        ])

        res.status(200).json({
            success: true,
            data: hostels,
            count: (await hostels).length
        })


    } catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })

    }

}

export const fetchDifferentLocation = async (req, res) => {
    try {
        const hostels = await Hostel.aggregate([
            {
                $addFields: {
                    locationLower: { $toLower: "$location" } // Convert location to lowercase, for case in-sensitive
                }
            },
            {
                $sort: { _id: -1 } // Sort by ObjectId (newest first)
            },
            {
                $group: {
                    _id: "$locationLower", // Group by lowercase location
                    hostel: { $first: "$$ROOT" } // Take the newest hostel from each location
                }
            },
            {
                $replaceRoot: { newRoot: "$hostel" }
            }
        ])

        res.status(200).json({
            success: true,
            data: hostels,
            count: hostels.length
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const getAllHostel = async (req, res) => {
    try {
        const hostels = await Hostel.find();
        
        if (hostels.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Hostel(s) found!",
                data: hostels,
                count: hostels.length
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No hostels found",
                data: []
            });
        }

    } catch (error) {
        console.log('Server Error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}