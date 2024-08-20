// ! ABSTRACTION ! \\
var Circle = /** @class */ (function () {
    function Circle(radius) {
        this.radius = radius;
    }
    Circle.prototype.area = function () {
        return Math.PI * this.radius;
    };
    Circle.prototype.perimeter = function () {
        return 2 * Math.PI * this.radius;
    };
    return Circle;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.area = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.perimeter = function () {
        return 2 * (this.width + this.height);
    };
    return Rectangle;
}());
function CalculateTotalArea(shape) {
    return shape.area();
}
var circle = new Circle(5);
var rectangle = new Rectangle(4, 6);
console.log("Area Of Circle : ", CalculateTotalArea(circle));
console.log("Area of Rectangle : ", CalculateTotalArea(rectangle));
// Date class
// Get Current Year
// Get Current Month
// Get Current Date
var now = new Date();
var CurrentYear = now.getFullYear();
var CurrentMonth = now.getMonth() + 1;
var CurrentDate = now.getDate();
// ! ENCAPSULATION ! \\
// BankAccount
// Depositing
// Withdraw
// Balance - Hidden => 200
var BankAccount = /** @class */ (function () {
    function BankAccount(initialBalance) {
        this._balance = initialBalance;
    }
    Object.defineProperty(BankAccount.prototype, "Balance", {
        // * Getter To Get The Balance Of Bank Account * \\
        get: function () {
            return this._balance;
        },
        enumerable: false,
        configurable: true
    });
    // * Method Deposit Monet * \\
    BankAccount.prototype.Deposit = function (amount) {
        if (amount < 0) {
            console.log("Invalid Deposit Amount !");
            return;
        }
        this._balance += amount;
    };
    // * Method Draw Money * \\
    BankAccount.prototype.Withdraw = function (amount) {
        if (amount < 0) {
            console.log("Invalid Withdraw Amount !");
            return;
        }
        if ((this._balance - amount) < 0) {
            console.log("Insufficient Funds !");
            return;
        }
        this._balance -= amount;
    };
    return BankAccount;
}());
// * my account * \\
var MyAccount = new BankAccount(1000);
MyAccount.Deposit(300);
MyAccount.Withdraw(200);
console.log("Current Balance : ", MyAccount.Balance);
// ! POLYMORPHISM ! \\
