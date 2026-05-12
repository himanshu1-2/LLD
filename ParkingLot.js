// --- 1. VEHICLE FACTORY PATTERN ---
class Vehicle {
  constructor(licensePlate, type) {
    this.licensePlate = licensePlate;
    this.type = type; // 'CAR', 'BIKE', 'TRUCK'
  }
}

class Car extends Vehicle { constructor(plate) { super(plate, 'CAR'); } }
class Bike extends Vehicle { constructor(plate) { super(plate, 'BIKE'); } }

class VehicleFactory {
  static createVehicle(type, plate) {
    const types = { 'CAR': Car, 'BIKE': Bike };
    const VehicleClass = types[type.toUpperCase()];
    if (!VehicleClass) throw new Error("Vehicle type not supported");
    return new VehicleClass(plate);
  }
}

// --- 2. PRICING STRATEGY PATTERN ---
class HourlyStrategy {
  calculate(duration) { return Math.ceil(duration) * 20; }
}

class FlatStrategy {
  calculate() { return 50; }
}

// --- 3. CORE ENTITIES ---
class ParkingSpot {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.vehicle = null;
  }
  isAvailable() { return this.vehicle === null; }
  assign(vehicle) { this.vehicle = vehicle; }
  remove() { this.vehicle = null; }
}

class ParkingFloor {
  constructor(floorNumber, spotsData) {
    this.floorNumber = floorNumber;
    this.spots = spotsData.map(s => new ParkingSpot(s.id, s.type));
  }

  findSpot(vehicleType) {
    return this.spots.find(spot => spot.isAvailable() && spot.type === vehicleType);
  }
}

// --- 4. SINGLETON PARKING LOT ---
class ParkingLot {
  constructor(name) {
    if (ParkingLot.instance) return ParkingLot.instance;
    this.name = name;
    this.floors = [];
    this.activeTickets = new Map();
    this.pricingStrategy = new HourlyStrategy(); 
    ParkingLot.instance = this;
  }

  addFloor(floor) { this.floors.push(floor); }

  setPricingStrategy(strategy) { this.pricingStrategy = strategy; }

  park(vehicleType, plate) {
    const vehicle = VehicleFactory.createVehicle(vehicleType, plate);
    
    for (const floor of this.floors) {
      const spot = floor.findSpot(vehicle.type);
      if (spot) {
        spot.assign(vehicle);
        const ticket = {
          id: `TKT-${Date.now()}`,
          vehicle,
          spot,
          entryTime: new Date(Date.now() - 3600000 * 2) // Simulating 2 hours ago
        };
        this.activeTickets.set(ticket.id, ticket);
        return ticket;
      }
    }
    return "No spots available";
  }

  exit(ticketId) {
    const ticket = this.activeTickets.get(ticketId);
    if (!ticket) return "Invalid Ticket";

    const duration = (new Date() - ticket.entryTime) / 3600000;
    const amount = this.pricingStrategy.calculate(duration);
    
    ticket.spot.remove();
    this.activeTickets.delete(ticketId);

    return { plate: ticket.vehicle.licensePlate, fee: amount, duration: duration.toFixed(2) };
  }
}

// --- 5. EXECUTION ---
const myParking = new ParkingLot("Central Mall");

// Setup: 1 floor with 1 Car spot and 1 Bike spot
myParking.addFloor(new ParkingFloor(1, [
  { id: '1A', type: 'CAR' },
  { id: '1B', type: 'BIKE' }
]));

// Scenario: Car enters
const myTicket = myParking.park("CAR", "ABC-123");
console.log("Vehicle Parked:", myTicket.id);

// Scenario: Car exits with Hourly Strategy
console.log("Exit Receipt (Hourly):", myParking.exit(myTicket.id));

// Scenario: Switch to Flat Rate for a new car
myParking.setPricingStrategy(new FlatStrategy());
const holidayTicket = myParking.park("CAR", "HOLIDAY-1");
console.log("Exit Receipt (Flat):", myParking.exit(holidayTicket.id));
