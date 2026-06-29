class Car{
    constructor(builder){
        this.engine= builder.engine;
        this.wheels= builder.wheels;
        this.color= builder.color;
    }
}

class CarBuilder{
    constructor(engine){
        this.engine= engine;
    }
    setColor(color){
        this.color= color;
        return this;
    }
    setWheels(wheels){
        this.wheels= wheels;
        return this;
    }
    build(){
        return new Car(this);
    }
}

const car= new CarBuilder('2.o turbo')
.setColor('red').setWheels(4).build();
console.log(car)