class MyUniqueBankAccount{
    owner;
    balance = 0;

    constructor(owner){
        this.owner = owner;
    }
    deposit(amount){
        this.balance += amount;

    }
    withdraw(amount){
        if(amount >this.balance){
            console.log("Insufficient funds");
            return;
        }
        this.balance -= amount;
    }
}

const myAccount = new MyUniqueBankAccount("Pavan Teja");
myAccount.deposit(500);
myAccount.withdraw(200);
console.log(`Account owner: ${myAccount.owner}`);
console.log(`Account balance: ${myAccount.balance}`);