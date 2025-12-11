# 🚗 Vehicle-Rental-Service-Backend

A backend service for managing vehicles, users, and bookings with secure authentication and role-based access.

Live Deployment: https://car-service-backend-eight.vercel.app/

## 🛠️ Tech Stack
- TypeScript
- Express.js
- PostgreSQL
- bcrypt
- jsonwebtoken
- dotenv
- pg

## 📌 Features
- User signup & login (JWT-based)
- Admin & Customer roles
- Vehicle CRUD with availability tracking
- Booking creation, cancellation & return handling
- Total price calculation based on rent duration

## 📁 Core Modules
- **Auth** – Login, signup, JWT handling  
- **Users** – Profile & role management  
- **Vehicles** – Inventory operations  
- **Bookings** – Rental flow & status updates  

## 📊 Database Tables
**Users:** id, name, email, password, phone, role  
**Vehicles:** id, vehicle_name, type, registration_number, daily_rent_price, availability_status  
**Bookings:** id, customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status  

## 🔐 Auth Flow
1. Passwords hashed with bcrypt  
2. Login returns JWT  
3. Protected routes use `Authorization: Bearer <token>`  
4. Role-based permissions enforced  

## 🌐 Main Endpoints
### Auth
- POST `/api/v1/auth/signup`
- POST `/api/v1/auth/signin`

### Vehicles
- POST `/api/v1/vehicles` (Admin)
- GET `/api/v1/vehicles`
- GET `/api/v1/vehicles/:vehicleId`
- PUT `/api/v1/vehicles/:vehicleId` (Admin)
- DELETE `/api/v1/vehicles/:vehicleId` (Admin)

### Users
- GET `/api/v1/users` (Admin)
- PUT `/api/v1/users/:userId` (Admin/Own)
- DELETE `/api/v1/users/:userId` (Admin)

### Bookings
- POST `/api/v1/bookings`
- GET `/api/v1/bookings`
- PUT `/api/v1/bookings/:bookingId`



