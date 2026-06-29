const LogLevel = {
    INFO: 1,
    WARNING: 2,
    ERROR: 3
};
class logger {
  constructor(level) {
    this.level=level;
    this.nextLogger=null;
  }
  setNextLogger(logger){
    this.nextLogger=logger;
    return logger;
  }
  logMessage(level,message){
    //console.log("level: "+level+" this.level: "+this.level); 
    if(this.level==level){
        this.write(message);
     }
     else if(this.nextLogger){
        //console.log("this.nextLogger: ",this.nextLogger);
        this.nextLogger.logMessage(level,message);
     }
     else {
        console.log("No logger found for this level");
     }
  }
  write(message){
   throw new Error("This method should be implemented by subclasses");
  }
}

class InfoLogger extends logger{
    constructor(){
        super(LogLevel.INFO)
    }
    write(message){
        console.log("Info Logger: "+message);
    }
}

class WarnLogger extends logger{
    constructor(){
        super(LogLevel.WARNING)
    }
    write(message){
        console.log("warn Logger: "+message);
    }
}


class ErrorLogger extends logger{
    constructor(){
        super(LogLevel.ERROR)
    }
    write(message){
        console.log("Error Logger: "+message);
    }
}

const infoLogger = new InfoLogger();
const warnLogger = new WarnLogger();
const errorLogger = new ErrorLogger();

infoLogger.setNextLogger(warnLogger).
setNextLogger(errorLogger);

infoLogger.logMessage(LogLevel.INFO, "Application started");

infoLogger.logMessage(LogLevel.WARNING, "Disk space is low");

infoLogger.logMessage(LogLevel.ERROR, "Database connection failed");