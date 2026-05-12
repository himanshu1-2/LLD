class PaymentProcessor {
    processPayment(amount) {}
}

class CreditCardProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing credit card payment of amount: ${amount}`);
    }
}
class UPIProcessor extends PaymentProcessor {
    processPayment(amount) {
        // UPI payment processing logic
        console.log(`Processing UPI payment of amount: ${amount}`);
    }
}

class PaymentFactory {
    static createPaymentProcessor(type) {
        const paymentMethodTypes={"creditcard":CreditCardProcessor,"upi":UPIProcessor}
        const paymentMethod=paymentMethodTypes[type.toLowerCase()]
        return new paymentMethod()
        
    }
}

const creditCardProcessor = PaymentFactory.createPaymentProcessor('creditcard').processPayment(100);
    