import ConnectDB from "../Config/database.js";
import Hostel from "../Models/Hostel.js";
import Room from "../Models/Room.js";

const sampleHostels = [
  // Makerere University Area Hostels
  {
    name: 'Sun Ways Hostel',
    description: 'Nice hostel in the heart of the city near Makerere University',
    location: 'Wandegeya, Uganda',
    amenities: ["Free WiFi", "Swimming Pool", "Gym", "Bar", "Restaurant", "24/7 Security", "Laundry", "Air Conditioning", "Study Room", "Parking"],
    image: 'https://images.unsplash.com/photo-1623625434462-e5e42318ae49?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    rating: 4.8
  },
  {
    name: 'Makerere University Hostel',
    description: 'Official university hostel with modern facilities for students',
    location: 'Makerere Hill, Uganda',
    amenities: ["Free WiFi", "Library", "Study Rooms", "Cafeteria", "24/7 Security", "Laundry", "Sports Facilities", "Computer Lab"],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
    rating: 4.6
  },
  {
    name: 'Kikoni Students Hostel',
    description: 'Affordable student accommodation near Makerere University',
    location: 'Kikoni, Uganda',
    amenities: ["Free WiFi", "Common Kitchen", "Study Area", "24/7 Security", "Laundry", "Backup Generator", "Water Heater"],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
    rating: 4.2
  },
  {
    name: 'Nana Hostel',
    description: 'Modern hostel with excellent amenities for students and travelers',
    location: 'Wandegeya, Uganda',
    amenities: ["Free WiFi", "Restaurant", "Bar", "24/7 Security", "Laundry", "Air Conditioning", "Parking", "TV Lounge"],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
    rating: 4.5
  },
  {
    name: 'Bativa Hostel',
    description: 'Comfortable and secure accommodation for university students',
    location: 'Kikoni, Uganda',
    amenities: ["Free WiFi", "Security", "Laundry", "Common Room", "Backup Generator", "Water Supply"],
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
    rating: 4.3
  },
  {
    name: 'Hostel Maria',
    description: 'Female-only hostel providing safe and comfortable accommodation',
    location: 'Makerere, Uganda',
    amenities: ["Free WiFi", "Female Only", "Security", "Laundry", "Study Room", "Common Kitchen", "Backup Generator"],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    rating: 4.7
  },

  // Other Kampala Areas
  {
    name: 'City View Hostel',
    description: 'Hostel with panoramic views of Kampala city',
    location: 'Nakasero, Uganda',
    amenities: ["Free WiFi", "City View", "Restaurant", "Bar", "24/7 Security", "Laundry", "Air Conditioning", "Parking"],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    rating: 4.4
  },
  {
    name: 'Backpackers Kampala',
    description: 'Budget-friendly hostel for travelers and backpackers',
    location: 'Kabalagala, Uganda',
    amenities: ["Free WiFi", "Common Kitchen", "Bar", "Tour Desk", "24/7 Security", "Laundry", "Luggage Storage"],
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop',
    rating: 4.1
  },
  {
    name: 'Garden Hostel',
    description: 'Peaceful hostel with beautiful gardens and outdoor spaces',
    location: 'Kololo, Uganda',
    amenities: ["Free WiFi", "Garden", "BBQ Area", "24/7 Security", "Laundry", "Parking", "Common Lounge"],
    image: 'https://images.unsplash.com/photo-1540518614846-7eded102d7bf?w=400&h=300&fit=crop',
    rating: 4.6
  },
  {
    name: 'Business Travelers Hostel',
    description: 'Comfortable accommodation for business travelers and professionals',
    location: 'Kampala Road, Uganda',
    amenities: ["Free WiFi", "Business Center", "Meeting Rooms", "24/7 Security", "Laundry", "Air Conditioning", "Restaurant"],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop',
    rating: 4.5
  },

  // Other University Areas in Uganda
  {
    name: 'Kyambogo Students Hostel',
    description: 'Affordable accommodation for Kyambogo University students',
    location: 'Kyambogo, Uganda',
    amenities: ["Free WiFi", "Study Rooms", "Common Kitchen", "24/7 Security", "Laundry", "Sports Ground"],
    image: 'https://images.unsplash.com/photo-1571508601891-ca5e7f71339e?w=400&h=300&fit=crop',
    rating: 4.2
  },
  {
    name: 'UCU Hostel Annex',
    description: 'Hostel serving Uganda Christian University students',
    location: 'Mukono, Uganda',
    amenities: ["Free WiFi", "Chapel", "Study Rooms", "24/7 Security", "Laundry", "Dining Hall"],
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop',
    rating: 4.4
  },
  {
    name: 'MUBS Accommodation',
    description: 'Hostel for Makerere University Business School students',
    location: 'Nakawa, Uganda',
    amenities: ["Free WiFi", "Library", "Computer Lab", "24/7 Security", "Laundry", "Cafeteria"],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop',
    rating: 4.3
  }
];

const sampleRooms = [
  // Sun Ways Hostel Rooms (6 rooms)
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
    roomPrice: 350000,
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
    roomPrice: 450000,
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
    roomPrice: 1200000,
    roomDescription: "Private double room with comfortable queen-sized bed.",
    amenities: ["Free WiFi", "Private Bathroom", "TV", "Air Conditioning"]
  },
  {
    roomNumber: "SW202",
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
    roomPrice: 750000,
    roomDescription: "Private single room with study desk and wardrobe.",
    amenities: ["Free WiFi", "Private Bathroom", "Desk", "Wardrobe"]
  },
  {
    roomNumber: "SW103",
    roomGender: "male",
    roomType: "shared",
    capacity: 8,
    availableBeds: 6,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 280000,
    roomDescription: "Large male-only dormitory with 8 comfortable beds.",
    amenities: ["Free WiFi", "Lockers", "Bed Linens", "Power Outlets"]
  },
  {
    roomNumber: "SW301",
    roomGender: "mixed",
    roomType: "double",
    capacity: 3,
    availableBeds: 1,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 2100000,
    roomDescription: "Premium double room with private bathroom, sitting area and balcony.",
    amenities: ["Free WiFi", "Private Bathroom", "Sitting Area", "Balcony", "Air Conditioning"]
  },

  // Makerere University Hostel Rooms (5 rooms)
  {
    roomNumber: "MU101",
    roomGender: "mixed",
    roomType: "shared",
    capacity: 4,
    availableBeds: 3,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 300000,
    roomDescription: "Standard university shared room with study desks.",
    amenities: ["Free WiFi", "Study Desk", "Lockers", "Bed Linens"]
  },
  {
    roomNumber: "MU102",
    roomGender: "female",
    roomType: "shared",
    capacity: 3,
    availableBeds: 2,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 400000,
    roomDescription: "Female-only shared room with enhanced security.",
    amenities: ["Free WiFi", "Study Desk", "Lockers", "Female Only"]
  },
  {
    roomNumber: "MU201",
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
    roomPrice: 650000,
    roomDescription: "Private single room for focused studying.",
    amenities: ["Free WiFi", "Study Desk", "Private Bathroom", "Wardrobe"]
  },
  {
    roomNumber: "MU202",
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
    roomPrice: 250000,
    roomDescription: "Male-only dormitory with shared study area.",
    amenities: ["Free WiFi", "Study Area", "Lockers", "Bed Linens"]
  },
  {
    roomNumber: "MU301",
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
    roomPrice: 1100000,
    roomDescription: "Private double room for couples or friends.",
    amenities: ["Free WiFi", "Private Bathroom", "Study Desk", "Wardrobe"]
  },

  // Kikoni Students Hostel Rooms (4 rooms)
  {
    roomNumber: "KS101",
    roomGender: "mixed",
    roomType: "shared",
    capacity: 8,
    availableBeds: 7,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 200000,
    roomDescription: "Budget-friendly shared dormitory for students.",
    amenities: ["Free WiFi", "Lockers", "Bed Linens", "Common Kitchen"]
  },
  {
    roomNumber: "KS102",
    roomGender: "female",
    roomType: "shared",
    capacity: 6,
    availableBeds: 4,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 320000,
    roomDescription: "Female-only shared room with security features.",
    amenities: ["Free WiFi", "Lockers", "Female Only", "Common Kitchen"]
  },
  {
    roomNumber: "KS201",
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
    roomPrice: 550000,
    roomDescription: "Affordable private single room.",
    amenities: ["Free WiFi", "Study Desk", "Lockers", "Bed Linens"]
  },
  {
    roomNumber: "KS202",
    roomGender: "male",
    roomType: "shared",
    capacity: 4,
    availableBeds: 3,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 270000,
    roomDescription: "Small male-only shared room.",
    amenities: ["Free WiFi", "Lockers", "Bed Linens", "Study Area"]
  },

  // Nana Hostel Rooms (5 rooms)
  {
    roomNumber: "NH101",
    roomGender: "mixed",
    roomType: "shared",
    capacity: 6,
    availableBeds: 5,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 420000,
    roomDescription: "Comfortable shared dorm with modern amenities.",
    amenities: ["Free WiFi", "Lockers", "Bed Linens", "Reading Light"]
  },
  {
    roomNumber: "NH102",
    roomGender: "female",
    roomType: "shared",
    capacity: 4,
    availableBeds: 2,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 480000,
    roomDescription: "Female-only room with enhanced privacy.",
    amenities: ["Free WiFi", "Lockers", "Female Only", "Reading Light"]
  },
  {
    roomNumber: "NH201",
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
    roomPrice: 1300000,
    roomDescription: "Private double room with ensuite bathroom.",
    amenities: ["Free WiFi", "Private Bathroom", "TV", "Air Conditioning"]
  },
  {
    roomNumber: "NH202",
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
    roomPrice: 850000,
    roomDescription: "Private single room with modern furnishings.",
    amenities: ["Free WiFi", "Private Bathroom", "Desk", "Wardrobe"]
  },
  {
    roomNumber: "NH301",
    roomGender: "mixed",
    roomType: "double",
    capacity: 3,
    availableBeds: 1,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1540518614846-7eded102d7bf?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 2300000,
    roomDescription: "Premium double room with separate living area.",
    amenities: ["Free WiFi", "Private Bathroom", "Living Area", "Mini Fridge", "Air Conditioning"]
  },

  // Bativa Hostel Rooms (4 rooms)
  {
    roomNumber: "BH101",
    roomGender: "mixed",
    roomType: "shared",
    capacity: 8,
    availableBeds: 6,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 180000,
    roomDescription: "Budget shared dormitory for students.",
    amenities: ["Free WiFi", "Lockers", "Bed Linens", "Common Kitchen"]
  },
  {
    roomNumber: "BH102",
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
    roomPrice: 220000,
    roomDescription: "Male-only shared accommodation.",
    amenities: ["Free WiFi", "Lockers", "Bed Linens", "Study Area"]
  },
  {
    roomNumber: "BH201",
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
    roomPrice: 500000,
    roomDescription: "Basic private single room.",
    amenities: ["Free WiFi", "Study Desk", "Lockers", "Bed Linens"]
  },
  {
    roomNumber: "BH202",
    roomGender: "female",
    roomType: "shared",
    capacity: 4,
    availableBeds: 2,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 280000,
    roomDescription: "Female-only shared room.",
    amenities: ["Free WiFi", "Lockers", "Female Only", "Bed Linens"]
  },

  // Hostel Maria Rooms (4 rooms - Female only)
  {
    roomNumber: "HM101",
    roomGender: "female",
    roomType: "shared",
    capacity: 4,
    availableBeds: 3,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 430000,
    roomDescription: "Comfortable female-only shared room.",
    amenities: ["Free WiFi", "Lockers", "Female Only", "Reading Light", "Security"]
  },
  {
    roomNumber: "HM102",
    roomGender: "female",
    roomType: "shared",
    capacity: 6,
    availableBeds: 4,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 380000,
    roomDescription: "Spacious female-only dormitory.",
    amenities: ["Free WiFi", "Lockers", "Female Only", "Study Area"]
  },
  {
    roomNumber: "HM201",
    roomGender: "female",
    roomType: "single",
    capacity: 1,
    availableBeds: 1,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 700000,
    roomDescription: "Private single room for female students.",
    amenities: ["Free WiFi", "Private Bathroom", "Study Desk", "Security"]
  },
  {
    roomNumber: "HM202",
    roomGender: "female",
    roomType: "double",
    capacity: 2,
    availableBeds: 1,
    roomImages: [
      {
        url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop",
        isPrimary: true
      }
    ],
    roomPrice: 1150000,
    roomDescription: "Private double room for female residents.",
    amenities: ["Free WiFi", "Private Bathroom", "TV", "Security"]
  }
];

// Function to generate additional rooms for remaining hostels
const generateAdditionalRooms = (hostelCount) => {
  const additionalRooms = [];
  const roomTypes = ['shared', 'single', 'double'];
  const genders = ['mixed', 'male', 'female'];
  
  // Room templates with UGX prices distributed across all categories
  const roomTemplates = [
    { type: 'shared', capacity: 4, price: 180000, description: "Basic shared accommodation" },
    { type: 'shared', capacity: 6, price: 250000, description: "Budget dormitory style" },
    { type: 'shared', capacity: 8, price: 320000, description: "Large shared dormitory" },
    { type: 'shared', capacity: 4, price: 450000, description: "Comfortable shared room" },
    { type: 'single', capacity: 1, price: 550000, description: "Private single room" },
    { type: 'single', capacity: 1, price: 750000, description: "Standard private room" },
    { type: 'single', capacity: 1, price: 950000, description: "Superior single room" },
    { type: 'double', capacity: 2, price: 1100000, description: "Private double room" },
    { type: 'double', capacity: 2, price: 1500000, description: "Deluxe double room" },
    { type: 'double', capacity: 3, price: 1850000, description: "Premium double room" },
    { type: 'double', capacity: 2, price: 2200000, description: "Luxury double room" }
  ];

  const images = [
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
  ];

  // Generate 3-5 rooms for each remaining hostel (starting from index 6)
  for (let i = 6; i < hostelCount; i++) {
    const roomCount = Math.floor(Math.random() * 3) + 3; // 3-5 rooms per hostel
    
    for (let j = 1; j <= roomCount; j++) {
      const template = roomTemplates[Math.floor(Math.random() * roomTemplates.length)];
      const gender = template.type === 'shared' ? genders[Math.floor(Math.random() * genders.length)] : 'mixed';
      
      additionalRooms.push({
        roomNumber: `H${i+1}${j.toString().padStart(2, '0')}`,
        roomGender: gender,
        roomType: template.type,
        capacity: template.capacity,
        availableBeds: Math.floor(Math.random() * template.capacity) + 1,
        roomImages: [
          {
            url: images[Math.floor(Math.random() * images.length)],
            isPrimary: true
          }
        ],
        roomPrice: template.price + Math.floor(Math.random() * 100000),
        roomDescription: template.description,
        amenities: ["Free WiFi", "Lockers", "Bed Linens"],
        hostelIndex: i
      });
    }
  }
  
  return additionalRooms;
};

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

    // Generate additional rooms for all hostels
    const allAdditionalRooms = generateAdditionalRooms(sampleHostels.length);
    const allRooms = [...sampleRooms, ...allAdditionalRooms];

    // Add hostelId to rooms and insert them
    const roomsToInsert = [];

    for (const room of allRooms) {
      let hostelIndex;
      
      // For predefined rooms, map to specific hostels
      if (room.roomNumber.startsWith('SW')) hostelIndex = 0;
      else if (room.roomNumber.startsWith('MU')) hostelIndex = 1;
      else if (room.roomNumber.startsWith('KS')) hostelIndex = 2;
      else if (room.roomNumber.startsWith('NH')) hostelIndex = 3;
      else if (room.roomNumber.startsWith('BH')) hostelIndex = 4;
      else if (room.roomNumber.startsWith('HM')) hostelIndex = 5;
      else hostelIndex = room.hostelIndex; // For generated rooms
      
      if (hostelIndex >= 0 && hostelIndex < insertedHostels.length) {
        roomsToInsert.push({
          ...room,
          hostelId: insertedHostels[hostelIndex]._id,
          isAvailable: room.availableBeds > 0
        });
      }
    }

    const insertedRooms = await Room.insertMany(roomsToInsert);
    console.log(`Inserted ${insertedRooms.length} room(s)`);

    console.log('\n=== Seeding Completed ===');
    console.log(`Hostels: ${insertedHostels.length}`);
    console.log(`Rooms: ${insertedRooms.length}`);
    
    // Log hostel locations for reference
    console.log('\nHostel Locations:');
    insertedHostels.forEach(hostel => {
      console.log(`- ${hostel.name}: ${hostel.location}`);
    });

    // Log price distribution
    console.log('\nPrice Distribution (UGX):');
    const priceRanges = {
      'Under 500,000': roomsToInsert.filter(r => r.roomPrice < 500000).length,
      '500,000 - 1,000,000': roomsToInsert.filter(r => r.roomPrice >= 500000 && r.roomPrice <= 1000000).length,
      '1,000,000 - 2,000,000': roomsToInsert.filter(r => r.roomPrice > 1000000 && r.roomPrice <= 2000000).length,
      'Above 2,000,000': roomsToInsert.filter(r => r.roomPrice > 2000000).length
    };
    
    Object.entries(priceRanges).forEach(([range, count]) => {
      console.log(`- ${range}: ${count} rooms`);
    });

  } catch (error) {
    console.error('Failed to seed data', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedHostels();