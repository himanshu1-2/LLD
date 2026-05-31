class Product{
    getDescription(){
        throw new Error("This method should be implemented by subclasses");
    }
    getPrice(){
        throw new Error("This method should be implemented by subclasses");
    }
}

class Laptop extends Product{
    getDescription(){
        return "laptop"
    }
    getPrice(){
        return 50000;
    }
}

class CouponDecorator extends Product{
    constructor(product){
        super();
        this.product = product;
    }
}
class TenPercentOffCoupon extends CouponDecorator{
    getDescription(){
        return rhis.product.getDescription()+"10% off coupon";
    }
    getPrice(){
        return this.product.getPrice()*0.5;
    }
}

class Flat5000OffCoupon extends CouponDecorator{
    getDecription(){
        return this.product.getDescription()+"Flat 5000 off coupon";
    }
    getPrice(){
        return this.product.getPrice()-1000;
    }
}
let product = new Laptop();
const discountedProduct = new TenPercentOffCoupon(product);
console.log(discountedProduct.getPrice());
const finalDiscount = new Flat5000OffCoupon(discountedProduct);
console.log(finalDiscount.getPrice())
