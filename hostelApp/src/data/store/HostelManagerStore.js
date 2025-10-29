// src/store/HostelManagerStore.js
import { 
  sampleManagerProfile, 
  sampleHostels, 
  sampleBookings, 
  sampleReviews, 
  samplePayments 
} from './sampleData';
const postelManagerStore={
    sampleManagerProfile,
    sampleHostels,
    sampleBookings,
    sampleReviews,
    samplePayments
};

const {sampleManagerProfile:SampleManagerProfile,
        sampleHostels:SampleHostels,
        sampleBookings:SampleBookings,
        sampleReviews:SampleReviews,
        samplePayments:SamplePayments
     } = postelManagerStore;
     console.log(SampleHostels);
     console.log(SampleBookings);
     console.log(SampleReviews);
     console.log(SamplePayments);   

console.log(SampleManagerProfile);

export class HostelManagerStore {
  constructor() {
    this.manager = sampleManagerProfile;
    this.hostels = sampleHostels;
    this.bookings = sampleBookings;
    this.reviews = sampleReviews;
    this.payments = samplePayments;
    this.isLoading = false;
    this.error = null;
  }
  

  // Business logic methods
  getDashboardStats() {
    const totalRevenue = this.payments
      .filter(p => p.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);

    const activeBookings = this.bookings.filter(b => 
      b.bookingStatus === 'confirmed' || b.bookingStatus === 'active'
    ).length;

    const totalOccupancy = this.hostels.reduce((sum, hostel) => {
      return sum + (hostel.basicInfo.currentOccupancy / hostel.basicInfo.totalCapacity) * 100;
    }, 0) / this.hostels.length;

    const averageRating = this.reviews.reduce((sum, review) => 
      sum + review.rating, 0) / this.reviews.length;

    return {
      totalRevenue,
      activeBookings,
      occupancyRate: Math.round(totalOccupancy),
      averageRating: Math.round(averageRating * 10) / 10
    };
  }

  getUpcomingBookings() {
    return this.bookings
      .filter(booking => 
        booking.bookingStatus === 'confirmed' || 
        booking.bookingStatus === 'pending'
      )
      .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate));
  }

  getRecentReviews() {
    return this.reviews
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }

  updateBookingStatus(bookingId, newStatus) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.bookingStatus = newStatus;
      return true;
    }
    return false;
  }
}

// Singleton instance
export const hostelManagerStore = new HostelManagerStore();
