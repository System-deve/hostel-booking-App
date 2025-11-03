import ConnectDB from "../Config/database.js";
import Hostel from "../Models/Hostel.js";

const sampleHostels = [
  {
    name: 'Sun Ways Hostel',
    description: 'Nice hostel in the heart of the city',
    location: 'Wandegeya',
    amenities: ["Free WiFi", "Swimming Pool", "Gym", "Bar", "Restaurant", "24/7 Security", "Laundry", "Air Conditioning"],
    image: 'https://images.unsplash.com/photo-1623625434462-e5e42318ae49?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
    rating: 4.8,
  },
  {
    name: 'Downtown Backpackers Hostel',
    description: 'Modern hostel with excellent amenities for backpackers',
    location: 'Berlin, Germany',
    amenities: ["Free WiFi", "Kitchen", "Lockers", "Common Room", "Game Room", "Bicycle Rental", "Tour Desk", "Free Breakfast", "Luggage Storage"],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
    rating: 4.8,
  },
  {
    name: 'Surf & Stay Beach Hostel',
    description: 'Beachfront hostel with amazing ocean views',
    location: 'Barcelona, Spain',
    amenities: ["Beach Access", "Bar", "Pool", "Surf Board Rental", "Yoga Classes", "BBQ Area", "Terrace", "Free Parking", "Beach Volleyball"],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop',
    rating: 4.9,
  },
  {
    name: 'Old Town Social Hostel',
    description: 'Historic hostel in the old town district',
    location: 'Prague, Czech Republic',
    amenities: ["Free Breakfast", "Tours", "WiFi", "Historic Building", "Library", "Coffee Shop", "Walking Tours", "Music Room", "Art Exhibitions"],
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
    rating: 4.7,
  },
  {
    name: 'Mountain View Hostel',
    description: 'Scenic hostel with breathtaking mountain views',
    location: 'Interlaken, Switzerland',
    amenities: ["Mountain Views", "Kitchen", "Lockers", "Hiking Gear Rental", "Ski Storage", "Hot Tub", "Fireplace", "Mountain Bike Rental", "Guided Tours"],
    image: 'https://images.pexels.com/photos/32340767/pexels-photo-32340767.jpeg',
    rating: 4.9,
  },
  {
    name: 'City Lights Hostel',
    description: 'Urban hostel with panoramic city views',
    location: 'New York, USA',
    amenities: ["City Views", "Rooftop Terrace", "Free WiFi", "Coffee Bar", "Co-working Space", "Movie Room", "City Tours", "Concierge Service", "24/7 Reception"],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop',
    rating: 4.6,
    
  },
  {
    name: 'Jungle Retreat Hostel',
    description: 'Eco-friendly hostel surrounded by nature',
    location: 'Bali, Indonesia',
    amenities: ["Eco-Friendly", "Yoga Deck", "Organic Garden", "Vegetarian Restaurant", "Meditation Space", "Nature Walks", "Waterfall Tours", "Bamboo Architecture", "Solar Power"],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    rating: 4.9,
    
  },
  {
    name: 'Tech Hub Hostel',
    description: 'Modern hostel for digital nomads and tech enthusiasts',
    location: 'Tokyo, Japan',
    amenities: ["High-Speed WiFi", "Co-working Space", "Gaming Room", "VR Equipment", "3D Printer", "Tech Workshops", "Meeting Rooms", "Printing Services", "Coding Classes"],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    rating: 4.7,
    
  }
];

const seedHostels = async () => {
  try {
    await ConnectDB();
    console.log('Connected Successfully and ready to seed');

    const existingData = await Hostel.find();

    if (existingData.length > 0) {
      await Hostel.deleteMany();
      console.log("Deleted existing hostels");
    }

    // Insert into db
    const insertedHostels = await Hostel.insertMany(sampleHostels);
    console.log(`Inserted ${insertedHostels.length} hostel(s)`);
    
    // Log the amenities count for each hostel to verify they'll appear in top rated
    insertedHostels.forEach(hostel => {
      console.log(`${hostel.name}: ${hostel.amenities.length} amenities`);
    });

  } catch (error) {
    console.error('Failed to seed Hostels data', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedHostels();