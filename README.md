

# HostelPulse Uganda 🏠

**A seamless hostel booking platform connecting Ugandan students with affordable and convenient accommodation.**

`HostelPulse Uganda` is a full-stack mobile application designed to solve the unique challenges of finding and managing student hostels in Uganda. It empowers students to discover, book, and communicate with hostel managers effortlessly, while providing managers with a powerful tool to streamline their operations.

[![React](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Our Solution](#our-solution)
- [Key Features](#key-features)
  - [For Students](#for-students)
  - [For Hostel Managers](#for-hostel-managers)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Problem Statement

Finding suitable student accommodation in Uganda is often a stressful and inefficient process:
- **For Students:** Relies heavily on word-of-mouth, physical visits, and scattered flyers. It's difficult to compare prices, view authentic photos, and check availability remotely.
- **For Hostel Managers:** Management is manual—using paper records, phone calls, and messages. This leads to double-bookings, difficulty tracking payments, and constant communication overhead.

## Our Solution

HostelPulse Uganda brings the entire hostel ecosystem into one, easy-to-use app. We provide a digital marketplace tailored to the Ugandan context, featuring:
- **Verified Listings:** Ensure students find legitimate and safe hostels.
- **In-App Communication:** Direct chat between students and managers.
- **Digital Management:** Automate booking, payments, and availability tracking for managers.
- **Ugandan-Focused:** Built with local payment methods (e.g., MTN Mobile Money, Airtel Money) and understanding of local university environments.

## Key Features

### For Students
- **🔍 Smart Search & Filters:** Find hostels by university, price range, location, amenities (Wi-Fi, security, self-contained, etc.).
- **📸 Virtual Tours & Galleries:** View high-quality photos and 360-degree images of rooms and facilities.
- **⭐ Reviews & Ratings:** Make informed decisions based on feedback from other students.
- **💬 Direct Chat:** Communicate directly with hostel managers to ask questions before booking.
- **📱 Easy Booking & Payments:** Secure booking process with integrated mobile money payment options.
- **📅 Booking History:** Keep track of all your current and past bookings.

### For Hostel Managers
- **🏠 Hostel Dashboard:** An intuitive overview of bookings, occupancy, and earnings.
- **📊 Listing Management:** Easily add, edit, and update hostel details, photos, and room availability.
- **🔔 Booking Alerts:** Get instant notifications for new bookings and inquiries.
- **💵 Payment Tracking:** Monitor payments received and pending invoices.
- **👥 Tenant Management:** Keep a digital record of current and prospective tenants.

## Tech Stack

This project is built with a modern, scalable technology stack:

- **Frontend (Client):** Reacct
- **Backend (Server):** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Cloud Storage:** (e.g., Cloudinary for image uploads)
- **Payment Gateway:** (e.g., Flutterwave or a custom integration for Mobile Money)
- **Real-time Features:** Socket.io (for chat functionality)

## Project Structure

```bash
hostel-booking-app/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── screens/        # App screens (Home, Search, Profile, etc.)
│   │   ├── navigation/     # Stack and tab navigators
│   │   ├── services/       # API calls and services
│   │   └── utils/          # Helper functions
├── server/                 # Node.js/Express backend application
│   ├── controllers/        # Request handlers
│   ├── models/            # MongoDB data models
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth & other middleware
│   └── config/            # Database and app configuration
├── README.md
└── package.json
```

## Installation & Setup

*This section will be filled in as the project develops. It will provide clear instructions for developers to get the code running on their local machines.*

**Prerequisites:**
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance
- React CLI environment set up

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/hostel-booking-app.git
    cd hostel-booking-app
    ```

2.  **Backend Setup:**
    ```bash
    cd server
    npm install
    # Create a .env file and add your variables (MONGO_URI, JWT_SECRET, etc.)
    npm run dev
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../client
    npm install
  
## Contributing

We welcome contributions! If you'd like to help improve HostelPulse Uganda, please follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Please read our `CONTRIBUTING.md` (to be created) for detailed guidelines.

## Team

- **SSEWANTE LIVINGSTONE** - *Project Lead & Developer* - (https://github.com/ssewanteLivingstone)
- **DDAMULIRA CHARLES** - *MEMBER* - https://github.com/ddamuliracharles
- **[Team Member 3]** - *Role* - [GitHub Profile Link]

## License

This project GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007 - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- Inspiration from the challenges faced by Ugandan students.
- Thanks to the open-source communities of React , Node.js, and MongoDB.
- University communities for their feedback and support.

---

<div align="center">

### **Made with ❤️ for Uganda's student community**

</div>


