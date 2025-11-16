// src/store/HostelManagerStore.js
import { 
  sampleManagerProfile, 
  sampleHostels, 
  sampleBookings, 
  sampleReviews, 
  samplePayments 
} from './sampleData';
// Sample rooms data with multiple tenants for shared rooms
const sampleRooms = [
  {
    id: "room_101",
    roomNumber: "101",
    hostelId: "hostel_001",
    hostelName: "Green Valley Hostel",
    roomType: "single",
    capacity: 1,
    currentOccupancy: 1,
    floorNumber: 1,
    isSelfContained: true,
    status: "occupied",
    price: 450000,
    managerId: "manager_001",
    createdAt: "2024-01-01T00:00:00.000Z",
    tenants: [
      {
        id: "tenant_001",
        name: "Sarah K. Nalwoga",
        phone: "+256 773 123 456",
        email: "sarah.nalwoga@students.mak.ac.ug",
        university: "Makerere University",
        course: "Bachelor of Medicine",
        checkInDate: "2024-01-15",
        checkOutDate: "2024-03-15",
        paidUntil: "2024-02-15",
        totalRent: 1350000,
        amountPaid: 900000,
        balance: 450000,
        paymentHistory: [
          { id: "pay_1", date: "2024-01-15", amount: 450000, type: "partial", method: "cash" },
          { id: "pay_2", date: "2024-02-01", amount: 450000, type: "partial", method: "mobile money" }
        ]
      }
    ]
  },
  {
    id: "room_102",
    roomNumber: "102",
    hostelId: "hostel_001", 
    hostelName: "Green Valley Hostel",
    roomType: "single",
    capacity: 1,
    currentOccupancy: 0,
    floorNumber: 1,
    isSelfContained: true,
    status: "available",
    price: 450000,
    managerId: "manager_001",
    createdAt: "2024-01-01T00:00:00.000Z",
    tenants: []
  },
  {
    id: "room_201",
    roomNumber: "201",
    hostelId: "hostel_001",
    hostelName: "Green Valley Hostel",
    roomType: "double", 
    capacity: 2,
    currentOccupancy: 1,
    floorNumber: 2,
    isSelfContained: false,
    status: "partially-occupied",
    price: 320000,
    managerId: "manager_001",
    createdAt: "2024-01-01T00:00:00.000Z",
    tenants: [
      {
        id: "tenant_002",
        name: "John M. Ssemakula",
        phone: "+256 752 234 567",
        email: "john.s@students.kyu.ac.ug",
        university: "Kyambogo University",
        course: "Bachelor of Education",
        checkInDate: "2024-02-01",
        checkOutDate: "2024-06-01",
        paidUntil: "2024-04-01",
        totalRent: 1280000,
        amountPaid: 640000,
        balance: 640000,
        paymentHistory: [
          { id: "pay_3", date: "2024-02-01", amount: 320000, type: "partial", method: "bank" },
          { id: "pay_4", date: "2024-03-01", amount: 320000, type: "partial", method: "mobile money" }
        ]
      }
    ]
  },
  {
    id: "room_202",
    roomNumber: "202",
    hostelId: "hostel_001",
    hostelName: "Green Valley Hostel",
    roomType: "triple",
    capacity: 3,
    currentOccupancy: 3,
    floorNumber: 2,
    isSelfContained: false,
    status: "occupied",
    price: 250000,
    managerId: "manager_001",
    createdAt: "2024-01-01T00:00:00.000Z",
    tenants: [
      {
        id: "tenant_003",
        name: "David O. Okello",
        phone: "+256 787 456 789",
        email: "david.okello@students.mak.ac.ug",
        university: "Makerere University", 
        course: "Computer Science",
        checkInDate: "2024-01-10",
        checkOutDate: "2024-12-10",
        paidUntil: "2024-12-10",
        totalRent: 2750000,
        amountPaid: 2750000,
        balance: 0,
        paymentHistory: [
          { id: "pay_5", date: "2024-01-10", amount: 2750000, type: "full", method: "bank" }
        ]
      },
      {
        id: "tenant_004",
        name: "Michael T. Mugisha",
        phone: "+256 789 123 456",
        email: "michael.m@students.mak.ac.ug",
        university: "Makerere University",
        course: "Electrical Engineering",
        checkInDate: "2024-01-12",
        checkOutDate: "2024-12-12",
        paidUntil: "2024-06-12",
        totalRent: 2750000,
        amountPaid: 1375000,
        balance: 1375000,
        paymentHistory: [
          { id: "pay_6", date: "2024-01-12", amount: 1375000, type: "partial", method: "mobile money" }
        ]
      },
      {
        id: "tenant_005",
        name: "Grace L. Nalubega",
        phone: "+256 756 789 123",
        email: "grace.n@students.kyu.ac.ug",
        university: "Kyambogo University",
        course: "Business Administration",
        checkInDate: "2024-01-15",
        checkOutDate: "2024-12-15",
        paidUntil: "2024-03-15",
        totalRent: 2750000,
        amountPaid: 550000,
        balance: 2200000,
        paymentHistory: [
          { id: "pay_7", date: "2024-01-15", amount: 550000, type: "partial", method: "cash" }
        ]
      }
    ]
  },
  {
    id: "room_301",
    roomNumber: "301",
    hostelId: "hostel_001",
    hostelName: "Green Valley Hostel",
    roomType: "single",
    capacity: 1,
    currentOccupancy: 0,
    floorNumber: 3,
    isSelfContained: true,
    status: "maintenance",
    price: 450000,
    maintenanceReason: "Water leakage repair",
    managerId: "manager_001",
    createdAt: "2024-01-01T00:00:00.000Z",
    tenants: []
  }
];

// Sample reported issues for maintenance system
const sampleIssues = [
  {
    id: "issue_1",
    roomId: "room_101",
    roomNumber: "101",
    tenantName: "Sarah K. Nalwoga",
    tenantPhone: "+256 773 123 456",
    issueType: "plumbing",
    description: "Toilet is not flushing properly and there's water leakage",
    priority: "high",
    status: "reported",
    reportedDate: "2024-03-10T09:30:00.000Z",
    images: []
  },
  {
    id: "issue_2",
    roomId: "room_201",
    roomNumber: "201", 
    tenantName: "John M. Ssemakula",
    tenantPhone: "+256 752 234 567",
    issueType: "electrical",
    description: "Power socket in bedroom not working",
    priority: "medium",
    status: "in-progress",
    reportedDate: "2024-03-09T14:20:00.000Z",
    assignedTo: "Maintenance Team",
    images: []
  },
  {
    id: "issue_3",
    roomId: "room_202",
    roomNumber: "202",
    tenantName: "David O. Okello",
    tenantPhone: "+256 787 456 789",
    issueType: "furniture",
    description: "Study desk drawer is broken",
    priority: "low",
    status: "reported",
    reportedDate: "2024-03-11T11:15:00.000Z",
    images: []
  }
];

export class HostelManagerStore {
constructor() {
  this.manager = this.loadManagerData(); // ✅ load from localStorage
  this.hostels = sampleHostels;
  this.bookings = sampleBookings;
  this.reviews = sampleReviews;
  this.payments = samplePayments;
  this.rooms = this.initializeManagerRooms();
  this.issues = sampleIssues;
  this.isLoading = false;
  this.error = null;

  // Initialize localStorage
  this.initializeStorage();
}



  // Initialize localStorage for data persistence
  initializeStorage() {
    try {
      if (!localStorage.getItem('hostelManagerRooms')) {
        localStorage.setItem('hostelManagerRooms', JSON.stringify(this.rooms));
      } else {
        this.rooms = JSON.parse(localStorage.getItem('hostelManagerRooms')) || this.rooms;
      }
      
      if (!localStorage.getItem('hostelManagerIssues')) {
        localStorage.setItem('hostelManagerIssues', JSON.stringify(this.issues));
      } else {
        this.issues = JSON.parse(localStorage.getItem('hostelManagerIssues')) || this.issues;
      }
    } catch (err) {
      // In non-browser environments localStorage may be undefined
      console.warn('localStorage unavailable:', err);
    }
  }
loadManagerData() {
  // Try to get the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user'));

  if (currentUser) {
    return {
      id: currentUser._id || currentUser.id || 'demo_manager',
      profile: {
        fullName: currentUser.fullName || 'Hostel Manager',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        profileImage: currentUser.profileImage || ''
      },
      hostels: ['hostel_001', 'hostel_002'],
      joinDate: currentUser.joinDate || new Date().toISOString()
    };
  }

  // Default manager if no user is logged in
  return {
    id: 'demo_manager',
    profile: {
      fullName: 'Demo Manager',
      email: 'demo@hostelmanager.com',
      phone: '+256 700 000 000',
      address: 'Kampala, Uganda',
      profileImage: ''
    },
    hostels: ['hostel_001', 'hostel_002'],
    joinDate: new Date().toISOString()
  };
}

    

  // Save data to localStorage
  saveToStorage() {
    try {
      localStorage.setItem('hostelManagerRooms', JSON.stringify(this.rooms));
      localStorage.setItem('hostelManagerIssues', JSON.stringify(this.issues));
    } catch (err) {
      console.warn('Failed to save to localStorage:', err);
    }
  }

  // Initialize rooms with manager ownership
  initializeManagerRooms() {
    const managerId = this.manager.id;
    return (sampleRooms || []).map(room => ({
      ...room,
      managerId: managerId,
      createdAt: room.createdAt || new Date().toISOString(),
      tenants: room.tenants || []
    }));
  }

  // Get rooms for current manager only
 getManagerRooms() {
    const managerId = this.manager?.id;
    if (managerId) {
      return this.rooms.filter(room => room.managerId === managerId);
    }
    return this.rooms; // Fallback to all rooms for demo
  }


  // Add room with manager ownership
  addRoom(roomData) {
    try {
      const newRoom = {
        id: `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...roomData,
        managerId: this.manager.id,
        createdAt: new Date().toISOString(),
        currentOccupancy: 0,
        status: "available",
        tenants: []
      };
      
      this.rooms.push(newRoom);
      this.saveToStorage();
      return newRoom;
    } catch (error) {
      console.error('Error adding room:', error);
      this.error = error.message;
      return null;
    }
  }

  // Update room status only
  updateRoomStatus(roomId, newStatus) {
    try {
      const roomIndex = this.rooms.findIndex(room => room.id === roomId && room.managerId === this.manager.id);
      if (roomIndex !== -1) {
        this.rooms[roomIndex].status = newStatus;
        this.rooms[roomIndex].updatedAt = new Date().toISOString();
        this.saveToStorage();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating room status:', error);
      this.error = error.message;
      return false;
    }
  }

  // Delete room (only if unoccupied and belongs to manager)
  deleteRoom(roomId) {
    try {
      const roomIndex = this.rooms.findIndex(room => 
        room.id === roomId && 
        room.managerId === this.manager.id &&
        room.currentOccupancy === 0
      );
      
      if (roomIndex !== -1) {
        this.rooms.splice(roomIndex, 1);
        this.saveToStorage();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting room:', error);
      this.error = error.message;
      return false;
    }
  }

  // Check-in tenant to a room
  checkInTenant(roomId, tenantData) {
    try {
      const roomIndex = this.rooms.findIndex(room => room.id === roomId && room.managerId === this.manager.id);
      
      if (roomIndex === -1) {
        this.error = 'Room not found';
        return false;
      }
      
      const room = this.rooms[roomIndex];
      
      if (room.currentOccupancy >= room.capacity) {
        this.error = 'Room is already at full capacity';
        return false;
      }
      
      if (room.status === 'maintenance') {
        this.error = 'Cannot check in tenant to a room under maintenance';
        return false;
      }

      const newTenant = {
        id: `tenant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...tenantData,
        paymentHistory: tenantData.paymentHistory || [],
        checkInDate: tenantData.checkInDate || new Date().toISOString().split('T')[0],
        amountPaid: tenantData.amountPaid || 0,
        balance: tenantData.totalRent || 0
      };
      
      room.tenants.push(newTenant);
      room.currentOccupancy = room.tenants.length;
      
      // Update room status based on occupancy
      this.updateRoomStatusBasedOnOccupancy(roomIndex);
      this.saveToStorage();
      
      return newTenant.id;
    } catch (error) {
      console.error('Error checking in tenant:', error);
      this.error = error.message;
      return false;
    }
  }

  // Check-out tenant from a room
  checkOutTenant(roomId, tenantId) {
    try {
      const roomIndex = this.rooms.findIndex(room => room.id === roomId && room.managerId === this.manager.id);
      
      if (roomIndex === -1) {
        this.error = 'Room not found';
        return false;
      }
      
      const room = this.rooms[roomIndex];
      const tenantIndex = room.tenants.findIndex(tenant => tenant.id === tenantId);
      
      if (tenantIndex === -1) {
        this.error = 'Tenant not found in this room';
        return false;
      }
      
      const tenant = room.tenants[tenantIndex];
      
      // Record any outstanding balance before checkout
      if (tenant.balance > 0) {
        console.log(`Outstanding balance of UGX ${tenant.balance.toLocaleString()} for ${tenant.name}`);
      }
      
      room.tenants.splice(tenantIndex, 1);
      room.currentOccupancy = room.tenants.length;
      
      // Update room status based on occupancy
      this.updateRoomStatusBasedOnOccupancy(roomIndex);
      this.saveToStorage();
      
      return true;
    } catch (error) {
      console.error('Error checking out tenant:', error);
      this.error = error.message;
      return false;
    }
  }

  // Helper method to update room status based on occupancy
  updateRoomStatusBasedOnOccupancy(roomIndex) {
    const room = this.rooms[roomIndex];
    if (room.currentOccupancy === 0) {
      room.status = 'available';
    } else if (room.currentOccupancy === room.capacity) {
      room.status = 'occupied';
    } else {
      room.status = 'partially-occupied';
    }
  }

  // Add payment for specific tenant
  addPayment(roomId, tenantId, paymentData) {
    try {
      const roomIndex = this.rooms.findIndex(room => room.id === roomId && room.managerId === this.manager.id);
      
      if (roomIndex === -1) {
        this.error = 'Room not found';
        return false;
      }
      
      const room = this.rooms[roomIndex];
      const tenantIndex = room.tenants.findIndex(tenant => tenant.id === tenantId);
      
      if (tenantIndex === -1) {
        this.error = 'Tenant not found';
        return false;
      }
      
      const tenant = room.tenants[tenantIndex];
      const payment = {
        id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        date: new Date().toISOString().split('T')[0],
        amount: paymentData.amount,
        type: paymentData.amount >= tenant.balance ? 'full' : 'partial',
        method: paymentData.method || 'cash',
        notes: paymentData.notes || ''
      };
      
      tenant.paymentHistory.push(payment);
      tenant.amountPaid = (tenant.amountPaid || 0) + payment.amount;
      tenant.balance = (tenant.balance || 0) - payment.amount;
      
      // Update paidUntil date
      if (payment.type === 'full') {
        tenant.paidUntil = tenant.checkOutDate;
        tenant.balance = 0;
      } else {
        // Calculate new paid until date based on payment
        const monthsPaid = Math.floor(payment.amount / room.price);
        try {
          const currentPaidUntil = new Date(tenant.paidUntil);
          currentPaidUntil.setMonth(currentPaidUntil.getMonth() + monthsPaid);
          tenant.paidUntil = currentPaidUntil.toISOString().split('T')[0];
        } catch (err) {
          // If paidUntil is invalid or missing, fallback to today's date plus monthsPaid
          console.warn('Invalid paidUntil date:', err);
          const fallback = new Date();
          fallback.setMonth(fallback.getMonth() + monthsPaid);
          tenant.paidUntil = fallback.toISOString().split('T')[0];
        }
      }
      
      this.saveToStorage();
      return payment.id;
    } catch (error) {
      console.error('Error adding payment:', error);
      this.error = error.message;
      return false;
    }
  }
  // In HostelManagerStore.js - add this method
updateManagerProfile(updatedProfile) {
  try {
    this.manager.profile = {
      ...this.manager.profile,
      ...updatedProfile
    };
    
    // In a real app, you would save to localStorage or backend here
    // localStorage.setItem('hostelManager', JSON.stringify(this.manager));
    
    return true;
  } catch (error) {
    console.error('Error updating manager profile:', error);
    return false;
  }
}

// Add these methods to your HostelManagerStore

addRoomImages(roomId, images) {
  try {
    const room = this.rooms.find(r => r.id === roomId);
    if (!room) {
      this.error = 'Room not found';
      return false;
    }

    if (!room.images) {
      room.images = [];
    }

    // Add new images (limit to 10 total)
    const totalImages = room.images.length + images.length;
    if (totalImages > 10) {
      this.error = 'Maximum 10 images allowed per room';
      return false;
    }

    room.images = [...room.images, ...images];
    return true;
  } catch (error) {
    this.error = error.message;
    return false;
  }
}

deleteRoomImage(roomId, imageIndex) {
  try {
    const room = this.rooms.find(r => r.id === roomId);
    if (!room || !room.images) {
      this.error = 'Room or image not found';
      return false;
    }

    if (imageIndex < 0 || imageIndex >= room.images.length) {
      this.error = 'Invalid image index';
      return false;
    }

    room.images.splice(imageIndex, 1);
    return true;
  } catch (error) {
    this.error = error.message;
    return false;
  }
}

// Get all tenants for current manager
getManagerTenants() {
  const managerRooms = this.getManagerRooms();
  const allTenants = [];

    managerRooms.forEach(room => {
      room.tenants.forEach(tenant => {
        allTenants.push({
          ...tenant,
          roomNumber: room.roomNumber,
          roomType: room.roomType,
          hostelName: room.hostelName,
          roomId: room.id,
          roomPrice: room.price
        });
      });
    });
    
    return allTenants;
  }

  // Get all payments from all manager's tenants
  getAllPayments() {
    const managerTenants = this.getManagerTenants();
    const allPayments = [];
    
    managerTenants.forEach(tenant => {
      if (tenant.paymentHistory && tenant.paymentHistory.length > 0) {
        tenant.paymentHistory.forEach(payment => {
          allPayments.push({
            ...payment,
            id: payment.id,
            tenantId: tenant.id,
            tenantName: tenant.name,
            roomNumber: tenant.roomNumber,
            roomType: tenant.roomType,
            tenantBalance: tenant.balance,
            tenantPhone: tenant.phone,
            tenantEmail: tenant.email,
            roomId: tenant.roomId,
            hostelName: tenant.hostelName
          });
        });
      }
    });
    
    // Sort by date (newest first)
    return allPayments.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Get payments statistics
  getPaymentsStats() {
    const allPayments = this.getAllPayments();
    const managerTenants = this.getManagerTenants();
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Filter payments for current month
    const monthlyPayments = allPayments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate.getMonth() === currentMonth && 
             paymentDate.getFullYear() === currentYear;
    });
    
    const totalRevenue = allPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const monthlyRevenue = monthlyPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const pendingBalance = managerTenants.reduce((sum, tenant) => sum + tenant.balance, 0);
    const totalTransactions = allPayments.length;

    return {
      totalRevenue,
      monthlyRevenue,
      pendingBalance,
      totalTransactions
    };
  }

  // Filter payments based on criteria
  getFilteredPayments(filters) {
    let filteredPayments = this.getAllPayments();

    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredPayments = filteredPayments.filter(payment =>
        payment.tenantName.toLowerCase().includes(query) ||
        payment.roomNumber.toLowerCase().includes(query) ||
        (payment.method || '').toLowerCase().includes(query)
      );
    }

    // Apply tenant filter
    if (filters.tenantId && filters.tenantId !== 'all') {
      filteredPayments = filteredPayments.filter(payment => 
        payment.tenantId === filters.tenantId
      );
    }

    // Apply payment type filter
    if (filters.paymentType && filters.paymentType !== 'all') {
      filteredPayments = filteredPayments.filter(payment => 
        payment.type === filters.paymentType
      );
    }

    // Apply date range filter
    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date();
      let startDate;

      switch (filters.dateRange) {
        case 'today':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filteredPayments = filteredPayments.filter(payment => {
          const paymentDate = new Date(payment.date);
          return paymentDate >= startDate;
        });
      }
    }

    return filteredPayments;
  }

  // Dashboard statistics for current manager only
  getDashboardStats() {
    const managerRooms = this.getManagerRooms();
    const managerIssues = this.getManagerIssues();
    
    const totalRevenue = this.getAllPayments().reduce((sum, payment) => sum + payment.amount, 0);
    const totalRooms = managerRooms.length;
    const occupiedRooms = managerRooms.filter(room => room.status === 'occupied').length;
    const availableRooms = managerRooms.filter(room => room.status === 'available').length;
    const partiallyOccupiedRooms = managerRooms.filter(room => room.status === 'partially-occupied').length;
    const maintenanceRooms = managerRooms.filter(room => room.status === 'maintenance').length;
    
    const pendingIssues = managerIssues.filter(issue => issue.status !== 'resolved').length;

    // Calculate occupancy rate
    const totalCapacity = managerRooms.reduce((sum, room) => sum + room.capacity, 0);
    const currentOccupancy = managerRooms.reduce((sum, room) => sum + room.currentOccupancy, 0);
    const occupancyRate = totalCapacity > 0 ? Math.round((currentOccupancy / totalCapacity) * 100) : 0;

    return {
      totalRevenue,
      totalRooms,
      occupiedRooms,
      availableRooms,
      partiallyOccupiedRooms,
      maintenanceRooms,
      pendingIssues,
      occupancyRate,
      totalActiveTenants: currentOccupancy,
      tenantsWithBalance: this.getManagerTenants().filter(tenant => tenant.balance > 0).length
    };
  }

  // Enhanced analytics methods for dynamic data (single consolidated implementation)
  getAnalyticsData(timeRange = 'month') {
    const managerRooms = this.getManagerRooms();
    const managerTenants = this.getManagerTenants();
    const allPayments = this.getAllPayments();
    const issues = this.getManagerIssues();
    
    // Current metrics
    const totalRevenue = allPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalRooms = managerRooms.length;
    const occupiedRooms = managerRooms.filter(room => room.status === 'occupied').length;
    const availableRooms = managerRooms.filter(room => room.status === 'available').length;
    const maintenanceRooms = managerRooms.filter(room => room.status === 'maintenance').length;
    
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
    const averageRent = managerRooms.length > 0 ? 
      Math.round(managerRooms.reduce((sum, room) => sum + room.price, 0) / managerRooms.length) : 0;

    // Previous period data for comparison (simple estimate)
    const previousData = this.getPreviousPeriodData(timeRange);
    
    // Dynamic revenue trends
    const revenueTrends = this.generateRevenueTrends(timeRange);
    
    // Real-time occupancy data
    const occupancyData = this.generateOccupancyData(managerRooms);
    
    // Payment methods with real data
    const paymentMethodsData = this.generatePaymentMethodsData(allPayments);
    
    // Recent activity
    const recentActivity = this.generateRecentActivity(managerTenants, allPayments);
    
    return {
      // Current metrics
      totalRevenue,
      occupancyRate,
      totalTenants: managerTenants.length,
      averageRent,
      availableRooms,
      maintenanceRooms,
      maintenanceIssues: issues.filter(issue => issue.status !== 'resolved').length,
      pendingPayments: managerTenants.filter(tenant => tenant.balance > 0).length,
      newTenants: this.getNewTenantsCount(timeRange),
      pendingBalance: managerTenants.reduce((sum, tenant) => sum + (tenant.balance || 0), 0),
      
      // Previous period for comparison
      previousRevenue: previousData.revenue,
      previousOccupancyRate: previousData.occupancyRate,
      previousTenants: previousData.tenants,
      previousAverageRent: previousData.averageRent,
      
      // Dynamic data
      revenueTrends,
      occupancyData,
      paymentMethodsData,
      recentActivity
    };
  }

  getPreviousPeriodData(timeRange) {
    // Determine variation based on requested time range so the parameter is used
    const variation = timeRange === 'week' ? 0.05 :
                      timeRange === 'month' ? 0.1 :
                      timeRange === 'quarter' ? 0.15 : 0.1;
    const totalRevenue = this.getAllPayments().reduce((sum, payment) => sum + payment.amount, 0);
    const managerRooms = this.getManagerRooms();

    return {
      revenue: Math.floor(totalRevenue * (1 - variation)),
      occupancyRate: Math.max(0, Math.floor((Math.random() * 20) + 60)), // 60-80%
      tenants: Math.floor(this.getManagerTenants().length * (1 - variation)),
      averageRent: managerRooms.length > 0 ? Math.floor(managerRooms.reduce((sum, room) => sum + room.price, 0) / managerRooms.length * (1 - variation)) : 0
    };
  }

  generateRevenueTrends(timeRange) {
    const allPayments = this.getAllPayments();
    const baseAmount = allPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const periods = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : timeRange === 'quarter' ? 12 : 6;
    
    if (periods === 0) return [];

    return Array.from({ length: periods }, (_, i) => {
      const variation = (Math.random() - 0.5) * 0.3; // ±15% variation
      const value = Math.floor((baseAmount / Math.max(periods, 1)) * (1 + variation));
      const previousValue = i > 0 ? baseAmount / Math.max(periods, 1) * (1 + (Math.random() - 0.5) * 0.2) : value;
      
      return {
        label: `Period ${i + 1}`,
        value: value,
        trend: value > previousValue ? 'up' : value < previousValue ? 'down' : 'stable'
      };
    });
  }

  generateOccupancyData(rooms) {
    const occupied = rooms.filter(room => room.status === 'occupied').length;
    const available = rooms.filter(room => room.status === 'available').length;
    const maintenance = rooms.filter(room => room.status === 'maintenance').length;
    const partiallyOccupied = rooms.filter(room => room.status === 'partially-occupied').length;

    return [
      { label: 'Occupied', value: occupied, color: '#10b981' },
      { label: 'Available', value: available, color: '#3b82f6' },
      { label: 'Maintenance', value: maintenance, color: '#ef4444' },
      { label: 'Partially Occupied', value: partiallyOccupied, color: '#f59e0b' }
    ].filter(item => item.value > 0);
  }

  generatePaymentMethodsData(payments) {
    const methods = {};
    
    payments.forEach(payment => {
      const methodKey = payment.method || 'unknown';
      methods[methodKey] = (methods[methodKey] || 0) + payment.amount;
    });
    
    // Ensure we have data for common methods
    const defaultMethods = {
      'cash': 0,
      'mobile money': 0,
      'bank': 0
    };
    
    const combined = { ...defaultMethods, ...methods };
    
    return Object.entries(combined)
      .filter(([, amount]) => amount > 0)
      .map(([method, amount], index) => ({
        label: method.charAt(0).toUpperCase() + method.slice(1),
        value: amount,
        color: ['#3b82f6', '#10b981', '#8b5cf6'][index] || '#6b7280'
      }));
  }

  generateRecentActivity(tenants, payments) {
    const activities = [];
    
    // Add recent check-ins
    const recentTenants = tenants.slice(0, 2);
    recentTenants.forEach(tenant => {
      activities.push({
        icon: 'fa-user-plus',
        text: `${tenant.name} checked into Room ${tenant.roomNumber}`,
        time: '2 hours ago'
      });
    });
    
    // Add recent payments
    const recentPayments = payments.slice(0, 2);
    recentPayments.forEach(payment => {
      activities.push({
        icon: 'fa-money-bill-wave',
        text: `Payment of UGX ${payment.amount.toLocaleString()} from ${payment.tenantName}`,
        time: '5 hours ago'
      });
    });
    
    // Add maintenance activities if any rooms are under maintenance
    const maintenanceRooms = this.getManagerRooms().filter(room => room.status === 'maintenance');
    if (maintenanceRooms.length > 0) {
      activities.push({
        icon: 'fa-tools',
        text: `Maintenance in progress for Room ${maintenanceRooms[0].roomNumber}`,
        time: '1 day ago'
      });
    }
    
    return activities;
  }

  getNewTenantsCount(timeRange) {
    const tenants = this.getManagerTenants();
    const now = new Date();
    const periodMs = timeRange === 'week' ? 7 * 24 * 60 * 60 * 1000 :
                    timeRange === 'month' ? 30 * 24 * 60 * 60 * 1000 : 90 * 24 * 60 * 60 * 1000;
    
    return tenants.filter(tenant => {
      const checkInDate = new Date(tenant.checkInDate);
      return (now - checkInDate) <= periodMs;
    }).length;
  }

  // Issue management methods
  getManagerIssues() {
    const managerRoomIds = this.getManagerRooms().map(room => room.id);
    return this.issues.filter(issue => managerRoomIds.includes(issue.roomId));
  }

  addIssue(issueData) {
    try {
      const newIssue = {
        id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...issueData,
        reportedDate: new Date().toISOString(),
        status: 'reported',
        images: issueData.images || []
      };
      this.issues.push(newIssue);
      this.saveToStorage();
      return newIssue;
    } catch (error) {
      console.error('Error adding issue:', error);
      this.error = error.message;
      return null;
    }
  }

  // Clear error
  clearError() {
    this.error = null;
  }
}

// Singleton instance
export const hostelManagerStore = new HostelManagerStore();

console.log('Hostel Manager Store initialized:', {
  manager: hostelManagerStore.manager.profile.fullName,
  rooms: hostelManagerStore.getManagerRooms().length,
  tenants: hostelManagerStore.getManagerTenants().length,
  issues: hostelManagerStore.getManagerIssues().length
});
