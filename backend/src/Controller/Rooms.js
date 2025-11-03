import Room from '../Models/Room.js';
import Hostel from '../Models/Hostel.js';

// Get all rooms for a specific hostel
export const getRoomsByHostelId = async (req, res) => {
    try {
        const { hostelId } = req.params;
        
        // Verify hostel exists
        const hostel = await Hostel.findById(hostelId);
        if (!hostel) {
            return res.status(404).json({
                success: false,
                message: 'Hostel not found'
            });
        }

        // Get all rooms for this hostel
        const rooms = await Room.find({ hostelId, isAvailable: true })
            .populate('hostelId', 'name location rating')
            .sort({ roomPrice: 1 });

        res.status(200).json({
            success: true,
            hostel: {
                id: hostel._id,
                name: hostel.name,
                location: hostel.location,
                rating: hostel.rating
            },
            data: rooms,
            count: rooms.length
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching rooms',
            error: error.message
        });
    }
};

// Get single room details
export const getRoomById = async (req, res) => {
    try {
        const { roomId } = req.params;

        const room = await Room.findById(roomId)
            .populate('hostelId', 'name location rating amenities description image');

        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        res.status(200).json({
            success: true,
            data: room
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching room details',
            error: error.message
        });
    }
};

// Room Controller - Fixed version
export const getAllAvailableRooms = async (req, res) => {
    try {
        const { 
            roomType, 
            minPrice, 
            maxPrice,
            location 
        } = req.query;

        console.log('Search params:', { roomType, minPrice, maxPrice, location }); // Debug log

        let filter = { isAvailable: true, availableBeds: { $gt: 0 } };

        // Add room type filter if provided
        if (roomType) filter.roomType = roomType;
        
        // Add price range filter if provided
        if (minPrice || maxPrice) {
            filter.roomPrice = {};
            if (minPrice) filter.roomPrice.$gte = Number(minPrice);
            if (maxPrice) filter.roomPrice.$lte = Number(maxPrice);
        }

        console.log('MongoDB filter:', filter); // Debug log

        // Find rooms and populate hostel info
        const rooms = await Room.find(filter)
            .populate('hostelId', 'name location rating image')
            .sort({ roomPrice: 1 });

        console.log(`Found ${rooms.length} rooms before location filter`); // Debug log

        // Filter by hostel location if provided (case-insensitive, partial match)
        let filteredRooms = rooms;
        if (location && location.trim()) {
            const searchTerm = location.trim().toLowerCase();
            filteredRooms = rooms.filter(room => {
                if (!room.hostelId || !room.hostelId.location) return false;
                
                const roomLocation = room.hostelId.location.toLowerCase();
                
                // More flexible matching - check for partial matches and remove common suffixes
                const locationVariations = [
                    roomLocation,
                    roomLocation.replace(', uganda', '').trim(),
                    roomLocation.replace(', kampala', '').trim(),
                    roomLocation.split(',')[0].trim() // Take only the first part before comma
                ];
                
                return locationVariations.some(loc => loc.includes(searchTerm));
            });
            console.log(`After location filter: ${filteredRooms.length} rooms`); // Debug log
            
            // Debug: Log what locations were found
            if (filteredRooms.length > 0) {
                console.log('Matching locations found:');
                filteredRooms.forEach(room => {
                    console.log(`- ${room.hostelId.location}`);
                });
            }
        }

        res.status(200).json({
            success: true,
            data: filteredRooms,
            count: filteredRooms.length
        });

    } catch (error) {
        console.error('Error fetching available rooms:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching available rooms',
            error: error.message
        });
    }
};