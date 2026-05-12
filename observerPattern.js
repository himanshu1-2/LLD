class Observer{
    update(data) {

    }
}

class EmailObserver extends Observer {
    update(data) {
        console.log("Email sent to user");
    }
} 

class SMSObserver extends Observer{
    update(data) {
        console.log("SMS sent to user");
    }
}


class Subject{
    constructor(){
        this.Observers=[]
    }

    subscribe(observer){
        this.Observers.push(observer)
    }
    removeObserver(observer){
        this.Observers=this.Observers.filter(obs=>obs!==observer)
    }
    notifyObservers(data){
        for(let obs of this.Observers){
            obs.update(data)
        }
    }
}

class NotificaitionService{
    constructor(){
        this.notificationSubject = new Subject()
        this.notificationSubject.subscribe(new EmailObserver())
        this.notificationSubject.subscribe(new SMSObserver())

    }
    sendNotification(){
        console.log("Notifying users...")
        this.notificationSubject.notifyObservers({message:"New notification"})
    }
}
new NotificaitionService().sendNotification()