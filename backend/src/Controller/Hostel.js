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