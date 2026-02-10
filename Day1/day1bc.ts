
// let namem = "Pavan Teja";
// console.log("Welcome to " + namem);


 export function calculateDeliveryfee (
     orderValue: number,
     distanceinKm: number,
     isSurgtime: boolean
 ): number{
    //free delivery for orders above 500 or above
    if (orderValue >=500) return 0;
    //Base fee
    let fee = 30;
    //extra charges for distance beyond  5km
    if (distanceinKm > 5){
      const extrakm = distanceinKm - 5 ;
      fee += extrakm * 5;

    }
    //surg pricing 20% extra 
    if (isSurgtime){
        fee = fee * 1.2;

    }
    //minimum fee is 20/-
    return Math.max(Math.round(fee), 20);

 }
 {
    console.log(calculateDeliveryfee(300, 3, false));
console.log(calculateDeliveryfee(600, 10, true));
console.log(calculateDeliveryfee(250, 8, true));
 }