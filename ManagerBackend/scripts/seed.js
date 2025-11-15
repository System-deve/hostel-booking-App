// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";       // adjust path if needed
import Room from "../models/Room.js";
import Tenant from "../models/Tenant.js";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import Maintenance from "../models/Maintenance.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/hostelApp";

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB for seeding...");

    // Clear old data
    await Promise.all([
      User.deleteMany({}),
      Room.deleteMany({}),
      Tenant.deleteMany({})
    ]);

    // 1️⃣ Create a sample manager user
    const hashedPassword = await bcrypt.hash("manager123", 10);
    const manager = await User.create({
      fullName: "Admin Manager",
      email: "manager@example.com",
      password: hashedPassword,
      phone: "0700000000",
      role: "manager"
    });

    console.log("👤 Manager created:", manager.email);

   // 2️⃣ Create sample rooms
const rooms = await Room.insertMany([
  {
    roomNumber: "101",
    roomName: "Deluxe Double",
    roomType: "double",
    floorNumber: 1,
    capacity: 2,
    currentOccupancy: 1,
    status: "occupied",
    price: 450000,
    manager: manager._id,
    hostelInfo: {
      name: "Green Valley Hostel",
      location: {
        district: "Kampala",
        street: "Makerere Hill Road"
      },
      contact: {
        phone: "+256712345678",
        email: "info@greenvalleyhostel.com"
      },
      hostelType: "mixed",
      hostelCategory: "premium"
    },
    description: "Comfortable double room with modern amenities at Green Valley Hostel",
    images: [
      "src/assets/room101-1.jpg",
      "src/assets/room101-2.jpg",
      "src/assets/room101-3.jpg"
    ],
    primaryImage: "src/assets/room101-1.jpg"
  },
  {
    roomNumber: "102",
    roomName: "Standard Double",
    roomType: "double",
    floorNumber: 1,
    capacity: 2,
    currentOccupancy: 0,
    status: "available",
    price: 400000,
    manager: manager._id,
    hostelInfo: {
      name: "Green Valley Hostel",
      location: {
        district: "Kampala",
        street: "Makerere Hill Road"
      },
      contact: {
        phone: "+256712345678",
        email: "info@greenvalleyhostel.com"
      },
      hostelType: "mixed",
      hostelCategory: "premium"
    },
    description: "Affordable double room with shared facilities at Green Valley Hostel",
    images: [
      "src/assets/room102-1.jpg",
      "src/assets/room102-2.jpg"
    ],
    primaryImage: "src/assets/room102-1.jpg"
  }
]);

console.log("🛏️ Rooms created:", rooms.map(r => r.roomNumber));

    // 3️⃣ Create a sample tenant
   // 3️⃣ Create a sample tenant
const tenant = await Tenant.create({
  fullName: "John Doe",
  email: "john@example.com",
  phone: "0700123456",
  gender: "male", // ✅ required
  roomId: rooms[0]._id,
  manager: manager._id, // ✅ required
  checkInDate: new Date(),
  rentAmount: 450000,
  emergencyContact: {
    name: "Jane Doe",
    phone: "0700987654",
    relation: "Sister"
  },
  status: "active",
  paymentStatus: "paid"
});

console.log("👨 Tenant created:", tenant.fullName);

    // 4️⃣ Link tenant to room
    rooms[0].tenants = [tenant._id];
    await rooms[0].save();

    // 4️⃣ Find an available room for booking
const availableRoom = rooms.find(r => r.status === "available");

if (!availableRoom) {
  throw new Error("❌ No available rooms found for booking");
}

// 5️⃣ Create a sample booking
const booking = await Booking.create({
  tenant: tenant._id,
  room: availableRoom._id,
  checkInDate: new Date(),
  checkOutDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
  totalAmount: availableRoom.price * 6,
  amountPaid: availableRoom.price,
  currency: "UGX",
  securityDeposit: 100000,
  paymentStatus: "partial",
  bookingStatus: "confirmed",
  specialRequirements: "Prefers a quiet room with good ventilation.",
  notes: `Initial booking for 6-month stay at ${availableRoom.hostelName}.`,
  manager: manager._id
});

console.log(`📘 Booking created for tenant ${tenant.fullName} in room ${availableRoom.roomNumber}`);

// Optionally mark that room as occupied
availableRoom.status = "occupied";
availableRoom.currentOccupancy = 1;
await availableRoom.save();
console.log(`🚪 Room ${availableRoom.roomNumber} status updated to occupied.`);


   // 5️⃣ Create payment
const payment = await Payment.create({
  booking: booking._id,
  tenant: tenant._id,
  amount: 450000,
  currency: "UGX",
  paymentMethod: "mobile_money",
  mobileMoney: {
    provider: "mtn",
    phoneNumber: "0700123456",
    transactionId: "MM123456789"
  },
  purpose: "rent",
  period: {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  },
  status: "completed",
  paidDate: new Date(),
  dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  notes: "Monthly rent payment for November",
  receiptNumber: `RCPT-${Math.floor(100000 + Math.random() * 900000)}`,
  manager: manager._id
});

console.log("💰 Payment created:", payment.receiptNumber);

// 7️⃣ Create a sample maintenance request
const maintenance = await Maintenance.create({
  title: "Leaking bathroom tap",
  description: "The tap in the bathroom is leaking continuously and causing water wastage.",
  priority: "high",
  category: "plumbing",
  room: rooms.find(r => r.status === "occupied")?._id || rooms[0]._id, // pick an occupied room or fallback
  specificLocation: "Bathroom - left side sink",
  reportedBy: tenant.fullName,
  reporterPhone: tenant.phone,
  reporterEmail: tenant.email,
  status: "reported",
  estimatedCost: 20000,
  notes: "Reported by tenant after 3 days of leakage.",
  manager: manager._id
});

console.log(`🧰 Maintenance request created: ${maintenance.title}`);




    console.log("✅ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
