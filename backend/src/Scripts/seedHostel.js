import ConnectDB from "../Config/database.js";
import Hostel from "../Models/Hostel.js";
import Room from "../Models/Room.js";

const sampleHostels = [
  {
    name: 'Sun Ways Hostel',
    description: 'Nice hostel in the heart of the city',
    location: 'Wandegeya, Uganda',
    amenities: ["Free WiFi", "Swimming Pool", "Gym", "Bar", "Restaurant", "24/7 Security", "Laundry", "Air Conditioning"],
    image: 'https://images.unsplash.com/photo-1623625434462-e5e42318ae49?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    rating: 4.8
  },
  {
    name: 'Downtown Backpackers Hostel',
    description: 'Modern hostel with excellent amenities for backpackers',
    location: 'Berlin, Germany',
    amenities: ["Free WiFi", "Kitchen", "Lockers", "Common Room", "Game Room", "Bicycle Rental", "Tour Desk", "Free Breakfast", "Luggage Storage"],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
    rating: 4.8
  },
  {
    name: 'Surf & Stay Beach Hostel',
    description: 'Beachfront hostel with amazing ocean views',
    location: 'Barcelona, Spain',
    amenities: ["Beach Access", "Bar", "Pool", "Surf Board Rental", "Yoga Classes", "BBQ Area", "Terrace", "Free Parking", "Beach Volleyball"],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
    rating: 4.9
  },
  {
    name: 'Old Town Social Hostel',
    description: 'Historic hostel in the old town district',
    location: 'Prague, Czech Republic',
    amenities: ["Free Breakfast", "Tours", "WiFi", "Historic Building", "Library", "Coffee Shop", "Walking Tours", "Music Room", "Art Exhibitions"],
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
    rating: 4.7
  }
];

const sampleRooms = [
  // Rooms for Sun Ways Hostel
  {
    roomNumber: "SW101",
    roomGender: "mixed",
    roomType: "shared",
    capacity: 6,
    availableBeds: 4,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 25,
    roomDescription: "Spacious shared dorm with 6 comfortable beds, perfect for budget travelers.",
    amenities: ["Free WiFi", "Lockers", "Bed Linens", "Reading Light"]
  },
  {
    roomNumber: "SW102",
    roomGender: "female",
    roomType: "shared",
    capacity: 4,
    availableBeds: 2,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 30,
    roomDescription: "Female-only shared room with 4 beds and extra security features.",
    amenities: ["Free WiFi", "Lockers", "Bed Linens", "Reading Light", "Female Only"]
  },
  {
    roomNumber: "SW201",
    roomGender: "mixed",
    roomType: "double",
    capacity: 2,
    availableBeds: 1,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 80,
    roomDescription: "Private double room with comfortable queen-sized bed.",
    amenities: ["Free WiFi", "Private Bathroom", "TV", "Air Conditioning"]
  },

  // Rooms for Downtown Backpackers Hostel
  {
    roomNumber: "DB101",
    roomGender: "mixed",
    roomType: "shared",
    capacity: 8,
    availableBeds: 6,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 22,
    roomDescription: "Large shared dormitory with 8 bunk beds and individual lockers.",
    amenities: ["Free WiFi", "Lockers", "Bed Linens", "Power Outlets"]
  },
  {
    roomNumber: "DB102",
    roomGender: "male",
    roomType: "shared",
    capacity: 6,
    availableBeds: 3,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 25,
    roomDescription: "Male-only shared room with 6 comfortable beds.",
    amenities: ["Free WiFi", "Lockers", "Bed Linens", "Reading Light"]
  },
  {
    roomNumber: "DB201",
    roomGender: "mixed",
    roomType: "single",
    capacity: 1,
    availableBeds: 1,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 55,
    roomDescription: "Private single room with ensuite bathroom and study desk.",
    amenities: ["Free WiFi", "Private Bathroom", "Desk", "Air Conditioning"]
  },

  // Rooms for Surf & Stay Beach Hostel
  {
    roomNumber: "SS101",
    roomGender: "mixed",
    roomType: "shared",
    capacity: 6,
    availableBeds: 5,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 28,
    roomDescription: "Beach-themed shared dorm with ocean view and comfortable beds.",
    amenities: ["Free WiFi", "Lockers", "Ocean View", "Beach Access"]
  },
  {
    roomNumber: "SS102",
    roomGender: "female",
    roomType: "shared",
    capacity: 4,
    availableBeds: 2,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 32,
    roomDescription: "Female-only beach room with direct pool access.",
    amenities: ["Free WiFi", "Lockers", "Pool Access", "Female Only"]
  },
  {
    roomNumber: "SS201",
    roomGender: "mixed",
    roomType: "double",
    capacity: 2,
    availableBeds: 1,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 85,
    roomDescription: "Private double room with balcony overlooking the beach.",
    amenities: ["Free WiFi", "Private Balcony", "Beach View", "Air Conditioning"]
  },

  // Rooms for Old Town Social Hostel
  {
    roomNumber: "OT101",
    roomGender: "mixed",
    roomType: "shared",
    capacity: 8,
    availableBeds: 7,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1540518614846-7eded102d7bf?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 20,
    roomDescription: "Historic shared dorm in the heart of old town with character.",
    amenities: ["Free WiFi", "Lockers", "Historic Building", "Central Location"]
  },
  {
    roomNumber: "OT102",
    roomGender: "male",
    roomType: "shared",
    capacity: 6,
    availableBeds: 4,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1571508601891-ca5e7f71339e?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 22,
    roomDescription: "Male-only shared room with traditional decor and comfortable beds.",
    amenities: ["Free WiFi", "Lockers", "Traditional Decor", "Reading Light"]
  },
  {
    roomNumber: "OT201",
    roomGender: "mixed",
    roomType: "single",
    capacity: 1,
    availableBeds: 1,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 50,
    roomDescription: "Cozy single room with historic charm and modern amenities.",
    amenities: ["Free WiFi", "Private Bathroom", "Historic Charm", "Desk"]
  }
];

const seedHostels = async () => {
  try {
    await ConnectDB();
    console.log('Connected Successfully and ready to seed');

    // Clear existing data
    await Hostel.deleteMany();
    await Room.deleteMany();
    console.log("Cleared existing data");

    // Insert hostels
    const insertedHostels = await Hostel.insertMany(sampleHostels);
    console.log(`Inserted ${insertedHostels.length} hostel(s)`);

    // Add hostelId to rooms and insert them
    const roomsToInsert = [];
    const hostelRoomMapping = {
      'Sun Ways Hostel': sampleRooms.slice(0, 3),
      'Downtown Backpackers Hostel': sampleRooms.slice(3, 6),
      'Surf & Stay Beach Hostel': sampleRooms.slice(6, 9),
      'Old Town Social Hostel': sampleRooms.slice(9, 12)
    };

    for (const hostel of insertedHostels) {
      const hostelRooms = hostelRoomMapping[hostel.name];
      if (hostelRooms) {
        for (const room of hostelRooms) {
          roomsToInsert.push({
            ...room,
            hostelId: hostel._id,
            isAvailable: room.availableBeds > 0
          });
        }
      }
    }

    const insertedRooms = await Room.insertMany(roomsToInsert);
    console.log(`Inserted ${insertedRooms.length} room(s)`);

    console.log('\n=== Seeding Completed ===');
    console.log(`Hostels: ${insertedHostels.length}`);
    console.log(`Rooms: ${insertedRooms.length}`);

  } catch (error) {
    console.error('Failed to seed data', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedHostels();