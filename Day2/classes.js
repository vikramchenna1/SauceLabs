var MyBankAccount = /** @class */ (function () {
    function MyBankAccount(owner) {
        this.balance = 0;
        this.owner = owner;
    }
    MyBankAccount.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    MyBankAccount.prototype.withdraw = function (amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds");
            return;
        }
        this.balance -= amount;
    };
    return MyBankAccount;
}());
var account = new MyBankAccount("Pavan Teja");
account.deposit(500);
account.withdraw(200);
console.log("Account owner: ".concat(account.owner));
console.log("Account balance: ".concat(account.balance));
