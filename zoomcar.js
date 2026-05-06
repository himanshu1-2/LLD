const VechileStatus={
    AVAIBLE:"available",
    BOOKED:"booked",
    IN_SERVICE:"IN_SERVICE"
}


const ReservationStatus={
    SCHEDULED:"scheduled",
    CANCELLED:"cancelled",
    COMPLETED:"completed",
    IN_PROGRESS:"in_progress"
}

class Vehicle{
    constructor(id,plate,model,hourlyRate){
        this.id=id;
        this.plate=plate;
        this.model=model;
        this.hourlyRate=hourlyRate;
        this.status=VechileStatus.AVAIBLE;
    }
}
class User{
    constructor(id,name,email){
        this.id=id;
        this.name=name;
        this.email=email;
    }
}

class Store{
    constructor(id,city){
        this.id=id;
        this.city=city;
        this.vechiles=[]
    }

    addVehicle(vechile){
        this.vechiles.push(vechile)
    }

    getAvailableVechiles(){
        return this.vechiles.filter(ele=>ele.status===VechileStatus.AVAIBLE)
    }

}

class Reservation{
    constructor(user,vechile,startTime,endTime){
        this.id=`RES-${Math.floor(Math.random() * 10000)}`;
        this.user=user;
        this.vechile=vechile;
        this.startTime=startTime;
        this.endTime=endTime;
        this.status=ReservationStatus.SCHEDULED
    }
    calcuteBill(){
      const hours=(this.endTime-this.startTime)/(1000*60*60)
      //console.log(this.vechile)
      console.log(`Hours: ${hours}`,`Hourly Rate: ${this.vechile.hourlyRate}`) 
      return hours* this.vechile.hourlyRate
      
    }
    startTrip(){
         
        if(this.status==ReservationStatus.SCHEDULED){
            this.status=ReservationStatus.IN_PROGRESS
            console.log('trip started')
        }
        else {
            console.log('Trip cannot be started.')
        }
    }
    completeTrip(){
       
        if(this.status==ReservationStatus.IN_PROGRESS){
            this.status=ReservationStatus.COMPLETED;
            this.actualEndTime= new Date();
            this.vechile.status=VechileStatus.AVAIBLE
            this.finalBill=this.calcuteBill(this.startTime,this.actualEndTime)
        }
    }
}

class ZoomCarService{
    constructor(){
        this.reservation=[]
    }
    createBooking(user,vechile,startTime,endTime){
       //console.log(vechile)
        if(vechile.status!=VechileStatus.AVAIBLE){
        console.log('Vehicle is not available for booking.')

       }
       const reservation=new Reservation(user,vechile,startTime,endTime)
       vechile.status=VechileStatus.BOOKED
       this.reservation.push(reservation)
       console.log(`Booking created successfully with ID: ${reservation.id}`)
       return reservation
    }
   
}
const app = new ZoomCarService();
const user= new User(101,'AMit')
const car = new Vehicle('CAR-001','DL-1234','Toyota Camry',10)
//console.log(car)
const ScheduledEnd= new Date(Date.now() + 2*1000) // 2 hours from now
const myBooking=app.createBooking( user,car,new Date(),ScheduledEnd)
car.status=VechileStatus.BOOKED;
myBooking.startTrip();
 myBooking.completeTrip();
console.log(`Trip completed. Final bill: $${myBooking.finalBill}`)