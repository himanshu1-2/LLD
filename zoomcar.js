const VehicleStatus = {
    AVAILABLE: "available",
    BOOKED: "booked",
    IN_SERVICE: "in_service"
};

const ReservationStatus = {
    SCHEDULED: "scheduled",
    CANCELLED: "cancelled",
    COMPLETED: "completed",
    IN_PROGRESS: "in_progress"
};

class Vehicle {
    constructor(id, plate, model, hourlyRate) {
        this.id = id;
        this.plate = plate;
        this.model = model;
        this.hourlyRate = hourlyRate;
        this.status = VehicleStatus.AVAILABLE;
    }
}

class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

class Store {
    constructor(id, city) {
        this.id = id;
        this.city = city;
        this.vehicles = [];
    }

    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }

    getAvailableVehicles() {
        return this.vehicles.filter(
            vehicle => vehicle.status === VehicleStatus.AVAILABLE
        );
    }
}

class Reservation {
    constructor(user, vehicle, startTime, endTime) {
        this.id = `RES-${Math.floor(Math.random() * 10000)}`;
        this.user = user;
        this.vehicle = vehicle;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = ReservationStatus.SCHEDULED;
    }

    calculateBill(start, end) {
        const hours = (end - start) / (1000 * 60 * 60);

        console.log(
            `Hours: ${hours}, Hourly Rate: ${this.vehicle.hourlyRate}`
        );

        return hours * this.vehicle.hourlyRate;
    }

    startTrip() {
        if (this.status === ReservationStatus.SCHEDULED) {
            this.status = ReservationStatus.IN_PROGRESS;
            console.log("Trip started");
        } else {
            console.log("Trip cannot be started.");
        }
    }

    completeTrip() {
        if (this.status === ReservationStatus.IN_PROGRESS) {
            this.status = ReservationStatus.COMPLETED;

            this.actualEndTime = new Date();

            this.vehicle.status = VehicleStatus.AVAILABLE;

            this.finalBill = this.calculateBill(
                this.startTime,
                this.actualEndTime
            );

            console.log(`Trip completed. Final bill: $${this.finalBill}`);
        }
    }
}

class ZoomCarService {
    constructor() {
        this.reservations = [];
        this.stores = [];
    }

    addStore(store) {
        this.stores.push(store);
    }

    getVehiclesInLocation(city) {
        const store = this.stores.find(s => s.city === city);

        return store ? store.getAvailableVehicles() : [];
    }

    createBooking(user, city, vehicle, startTime, endTime) {
        const store = this.stores.find(s => s.city === city);

        if (!store) {
            throw new Error("Location not found");
        }

        if (vehicle.status !== VehicleStatus.AVAILABLE) {
            console.log("Vehicle is not available for booking.");
            return null;
        }

        const reservation = new Reservation(
            user,
            vehicle,
            startTime,
            endTime
        );

        vehicle.status = VehicleStatus.BOOKED;

        this.reservations.push(reservation);

        console.log(
            `Booking created successfully with ID: ${reservation.id}`
        );

        return reservation;
    }
}

/* -------------------- TESTING -------------------- */

const app = new ZoomCarService();

const store = new Store(1, "Delhi");

const car = new Vehicle(
    "CAR-001",
    "DL-1234",
    "Toyota Camry",
    10
);

const car1 = new Vehicle(
    "CAR-002",
    "DL-5678",
    "Honda City",
    15
);

store.addVehicle(car);
store.addVehicle(car1);

app.addStore(store);

const user = new User(101, "Amit", "amit@gmail.com");

const scheduledEnd = new Date(Date.now() + 2 * 60 * 60 * 1000);

const myBooking = app.createBooking(
    user,
    "Delhi",
    car,
    new Date(),
    scheduledEnd
);

if (myBooking) {
    myBooking.startTrip();

    setTimeout(() => {
        myBooking.completeTrip();
    }, 2000);
}

/* ---------------- PREFIX SUM ---------------- */

const prefixSum = (arr, k) => {
    let currentSum = 0;
    let count = 0;

    const map = {};
    map[0] = 1;

    for (let i = 0; i < arr.length; i++) {
        currentSum += arr[i];

        if ((currentSum - k) in map) {
            count += map[currentSum - k];
        }

        map[currentSum] = (map[currentSum] || 0) + 1;
    }

    return count;
};

console.log(prefixSum([1, 1, 1], 2)); // 2