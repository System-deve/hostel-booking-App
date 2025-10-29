// src/data/sampleData.js
export const sampleManagerProfile = {
  id: "manager_001",
  profile: {
    fullName: "John Mugisha",
    email: "john@greenvalleyhostels.com",
    phone: "+256 712 345 678",
    companyName: "Green Valley Hostels Ltd",
    businessRegistration: "URSBRG00123456",
    tinNumber: "123456789",
    physicalAddress: "Plot 123, Makerere Hill Road, Kampala",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    verificationStatus: "verified",
    verificationDocuments: [
      "business_registration.pdf",
      "tin_certificate.pdf",
      "id_copy.pdf"
    ]
  },
  subscription: {
    plan: "premium",
    status: "active",
    expiresAt: "2024-12-31",
    features: ["multiple_hostels", "advanced_analytics", "priority_support"]
  },
  settings: {
    notifications: {
      email: true,
      sms: true,
      push: true
    },
    paymentReminders: true,
    autoConfirmBookings: false
  }
};

export const sampleHostels = [
  {
    id: "hostel_001",
    basicInfo: {
      name: "Green Valley Hostel",
      description: "A premium student accommodation located in the heart of Makerere.",
      type: "mixed",
      totalCapacity: 60,
      currentOccupancy: 55,
      hostelCategory: "premium",
      universityFocus: ["Makerere University", "Uganda Martyrs University"],
      yearEstablished: 2018
    },
    location: {
      country: "Uganda",
      district: "Kampala",
      division: "Kawempe",
      street: "Makerere Hill Road",
      gpsCoordinates: { lat: 0.3476, lng: 32.5825 }
    },
    rooms: [
      {
        id: "room_001",
        roomNumber: "101",
        roomType: "single",
        capacity: 1,
        occupancy: 1,
        isSelfContained: true,
        availability: "occupied"
      },
      {
        id: "room_002", 
        roomNumber: "102",
        roomType: "double",
        capacity: 2,
        occupancy: 1,
        isSelfContained: true,
        availability: "available"
      }
    ],
    amenities: {
      security: {
        cctv: true,
        securityGuards: true,
        secureGate: true
      },
      internet: {
        hasWifi: true,
        wifiCost: "included"
      },
      commonAreas: {
        commonRoom: true,
        studyRoom: true,
        laundryArea: true
      }
    },
    pricing: {
      currency: "UGX",
      roomPrices: {
        single: 450000,
        double: 320000,
        triple: 280000
      }
    },
    status: "active"
  },
  {
    id: "hostel_002",
    basicInfo: {
      name: "Campus Comfort Hostel", 
      description: "Affordable accommodation near Kyambogo University.",
      type: "mixed",
      totalCapacity: 40,
      currentOccupancy: 32,
      hostelCategory: "standard",
      universityFocus: ["Kyambogo University"],
      yearEstablished: 2015
    },
    location: {
      country: "Uganda",
      district: "Kampala", 
      division: "Nakawa",
      street: "Banda Road"
    },
    rooms: [
      {
        id: "room_003",
        roomNumber: "A101",
        roomType: "double", 
        capacity: 2,
        occupancy: 2,
        isSelfContained: false,
        availability: "occupied"
      }
    ],
    amenities: {
      security: {
        securityGuards: true,
        secureGate: true
      },
      internet: {
        hasWifi: true,
        wifiCost: "paid"
      }
    },
    pricing: {
      currency: "UGX",
      roomPrices: {
        single: 350000,
        double: 250000
      }
    },
    status: "active"
  }
];

export const sampleBookings = [
  {
    id: "booking_001",
    tenant: {
      id: "tenant_001",
      fullName: "Sarah K. Nalwoga",
      phone: "+256 773 123 456",
      email: "sarah.nalwoga@students.mak.ac.ug",
      university: "Makerere University",
      course: "Bachelor of Medicine"
    },
    hostelId: "hostel_001",
    roomId: "room_001",
    checkInDate: "2024-01-15",
    checkOutDate: "2024-12-15",
    totalAmount: 4950000,
    amountPaid: 1500000,
    paymentStatus: "partial",
    bookingStatus: "confirmed",
    createdAt: "2023-12-10T10:30:00Z"
  },
  {
    id: "booking_002", 
    tenant: {
      id: "tenant_002",
      fullName: "Michael T. Ssemakula",
      phone: "+256 752 234 567", 
      email: "michael.s@students.kyu.ac.ug",
      university: "Kyambogo University",
      course: "Bachelor of Education"
    },
    hostelId: "hostel_002",
    roomId: "room_003", 
    checkInDate: "2024-01-10",
    checkOutDate: "2024-06-10",
    totalAmount: 1250000,
    amountPaid: 1250000,
    paymentStatus: "paid", 
    bookingStatus: "active",
    createdAt: "2023-12-05T14:20:00Z"
  },
  {
    id: "booking_003",
    tenant: {
      id: "tenant_003",
      fullName: "Jennifer K. Namugga", 
      phone: "+256 787 345 678",
      email: "j.namugga@students.ucu.ac.ug",
      university: "Uganda Christian University",
      course: "Bachelor of Business Administration"
    },
    hostelId: "hostel_001",
    roomId: "room_002",
    checkInDate: "2024-02-01", 
    checkOutDate: "2024-12-31",
    totalAmount: 3520000,
    amountPaid: 0,
    paymentStatus: "pending",
    bookingStatus: "pending",
    createdAt: "2023-12-12T09:15:00Z"
  }
];

export const sampleReviews = [
  {
    id: "review_001",
    hostelId: "hostel_001", 
    tenantName: "Sarah K. Nalwoga",
    rating: 5,
    comment: "Green Valley Hostel has been perfect for my medical studies. The WiFi is reliable and security is tight.",
    date: "2023-11-15T08:30:00Z"
  },
  {
    id: "review_002",
    hostelId: "hostel_002",
    tenantName: "Michael T. Ssemakula", 
    rating: 4,
    comment: "Campus Comfort offers great value. The location is perfect for Kyambogo students.",
    date: "2023-11-20T16:45:00Z"
  }
];

export const samplePayments = [
  {
    id: "payment_001",
    bookingId: "booking_001",
    amount: 500000,
    currency: "UGX", 
    paymentMethod: "mobile_money",
    status: "completed",
    purpose: "registration_fee",
    paidDate: "2023-12-10T11:30:00Z"
  },
  {
    id: "payment_002", 
    bookingId: "booking_001",
    amount: 1000000,
    currency: "UGX",
    paymentMethod: "bank_transfer", 
    status: "completed",
    purpose: "first_month_rent",
    paidDate: "2023-12-28T09:15:00Z"
  },
  {
    id: "payment_003",
    bookingId: "booking_002", 
    amount: 1250000,
    currency: "UGX",
    paymentMethod: "mobile_money",
    status: "completed",
    purpose: "full_payment", 
    paidDate: "2023-12-20T14:45:00Z"
  }
];