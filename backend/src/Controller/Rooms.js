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

export const getAllAvailableRooms = async (req, res) => {
  try {
    const { 
      roomType, 
      minPrice, 
      maxPrice,
      location 
    } = req.query;

    
    console.log('Query params:', { roomType, minPrice, maxPrice, location });

    // Base filter - only available rooms
    // FIXED: Removed availableBeds filter since your schema doesn't have that field
    let filter = { 
      isAvailable: true
    };

    // Add room type filter
    if (roomType) {
      filter.roomType = roomType;
      console.log('Added room type filter:', roomType);
    }
    
    // Add price range filter
    if (minPrice || maxPrice) {
      filter.roomPrice = {};
      if (minPrice) {
        filter.roomPrice.$gte = Number(minPrice);
        console.log('Added min price filter:', minPrice);
      }
      if (maxPrice) {
        filter.roomPrice.$lte = Number(maxPrice);
        console.log('Added max price filter:', maxPrice);
      }
    }

    console.log('\nMongoDB filter:', JSON.stringify(filter, null, 2));

    // Find all matching rooms with populated hostel data
    const rooms = await Room.find(filter)
      .populate('hostelId', 'name location rating image')
      .sort({ roomPrice: 1 })
      .lean();

    console.log(`\n✓ Found ${rooms.length} rooms BEFORE location filter`);

    // Show all locations in database for debugging
    if (rooms.length > 0) {
      
      const locations = rooms
        .map(r => r.hostelId?.location)
        .filter(Boolean);
      const uniqueLocations = [...new Set(locations)];
      
      uniqueLocations.forEach((loc, idx) => {
        console.log(`${idx + 1}. "${loc}"`);
      });
    } else {
      console.log('\n⚠ WARNING: No rooms found with isAvailable=true');
    }

    // Apply location filter if provided
    let filteredRooms = rooms;
    if (location && location.trim()) {
      const searchTerm = location.trim().toLowerCase();
      
      
      filteredRooms = rooms.filter(room => {
        // Skip if no hostel or location data
        if (!room.hostelId) {
          console.log('⚠ Room missing hostelId');
          return false;
        }
        
        if (!room.hostelId.location) {
          console.log(`⚠ Room in "${room.hostelId.name}" missing location field`);
          return false;
        }
        
        const roomLocation = room.hostelId.location.toLowerCase();
        
        // Multiple matching strategies
        const directMatch = roomLocation.includes(searchTerm);
        const startsWithMatch = roomLocation.startsWith(searchTerm);
        const withoutCountry = roomLocation.replace(', uganda', '').trim() === searchTerm;
        const firstPart = roomLocation.split(',')[0].trim() === searchTerm;
        const anyPartMatch = roomLocation.split(',').some(part => 
          part.trim() === searchTerm || part.trim().includes(searchTerm)
        );
        
        const matches = directMatch || startsWithMatch || withoutCountry || firstPart || anyPartMatch;
        
        if (matches) {
          console.log(`✓ MATCH: "${roomLocation}" <-- "${searchTerm}"`);
        } else {
          console.log(`✗ NO MATCH: "${roomLocation}" ≠ "${searchTerm}"`);
        }
        
        return matches;
      });
      
      console.log(`\n✓ AFTER location filter: ${filteredRooms.length} rooms\n`);
    }

    res.status(200).json({
      success: true,
      data: filteredRooms,
      count: filteredRooms.length,
      filters: {
        roomType: roomType || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        location: location || null
      }
    });

  } catch (error) {
   
    console.error(error);
    console.error('this has been the most challenge controller for me to do 😱🙏🙏 thank God it finally worked');
    
    res.status(500).json({
      success: false,
      message: 'Error fetching available rooms',
      error: error.message
    });
  }
};