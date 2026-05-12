class TokenBucket{
    constructor(capcity
        ,refillRate){
        this.capcity= capcity;
        this.refillRate=refillRate;
        this.token=capcity;
        this.lastRefillTime=Date.now();
    }
     allowRequest(){
       this.refill();
       if(this.token>=1){
        this.token-=1;
        return true;
       }
       return false;
    }
    refill(){
        const now = Date.now();
        const elaspedTime= (now-this.lastRefillTime)/1000;
        const tokenToken = elaspedTime*this.refillRate;
        this.token=Math.min(this.capcity,this.token+tokenToken);
        this.lastRefillTime=now;
    }
}
const bucket = new TokenBucket(5,1);
for(let i = 1; i <= 6; i++) {

    const allowed =
        bucket.allowRequest();

    console.log(
        `Request ${i}: ${
            allowed
            ? "SUCCESS"
            : "FAILED"
        }`
    );
}