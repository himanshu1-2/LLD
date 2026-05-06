# 🚗 Vehicle Reservation System (ZoomCar-like)

A simple Low-Level Design (LLD) implementation of a vehicle rental system similar to ZoomCar, built using JavaScript.

---

## 📌 Features

- Create users and vehicles
- Add vehicles to store
- Check available vehicles
- Book a vehicle
- Start and complete trips
- Calculate billing based on hourly rate

---

## 🏗️ System Design Overview

### Entities

#### 1. Vehicle
- `id`
- `plate`
- `model`
- `hourlyRate`
- `status` (AVAILABLE, BOOKED, IN_SERVICE)

#### 2. User
- `id`
- `name`
- `email`

#### 3. Store
- Holds a list of vehicles
- Can return available vehicles

#### 4. Reservation
- Links user and vehicle
- Tracks trip lifecycle:
  - Scheduled
  - In Progress
  - Completed
  - Cancelled
- Calculates billing

#### 5. ZoomCarService
- Handles booking logic
- Maintains all reservations

---

## 🔄 Flow

1. User selects a vehicle
2. Booking is created
3. Vehicle status becomes `BOOKED`
4. Trip is started → `IN_PROGRESS`
5. Trip is completed → `COMPLETED`
6. Bill is calculated

---

## ⚙️ How to Run

```bash
node zoomcar.js