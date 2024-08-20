"use strict";
// ! SINGLE RESPONSIBILITY ! \\
class User {
    constructor(name, email) { }
}
class userAuthentication {
    constructor(user) { }
    authenticate(password) {
        // * implement logic here * \\
    }
}
// ??????????????????????????????????????????????????? \\
class BlogPost {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
    // ? methods related to manage content ? \\
    CreatePost() {
        // * implement logic here * \\
    }
    UpdatePost() {
        // * implement logic here * \\
    }
    DeletePost() {
        // * implement logic here * \\
    }
    DisplayHtml() {
        return `<h1>${this.title}</h1><p>${this.content}</p>`;
    }
}
class BlogPostDisplay {
    constructor(BlogPost) {
        this.BlogPost = BlogPost;
    }
    DisplayHtml() {
        return `<h1>${this.BlogPost}</h1>`;
    }
}
class BlogPostJson {
    constructor(BlogPost) {
        this.BlogPost = BlogPost;
    }
    ReturnJson() {
        return {
            title: this.BlogPost.title,
            content: this.BlogPost.content
        };
    }
}
class RegularCustomer {
    GiveDiscount() {
        return 10;
    }
    AddLoyaltyPoints(amountSpent) {
        return amountSpent;
    }
}
class PremiumCustomer {
    GiveDiscount() {
        return 20;
    }
    AddLoyaltyPoints(amountSpent) {
        return amountSpent * 2;
    }
}
class GoldCustomer {
    GiveDiscount() {
        return 30;
    }
    AddLoyaltyPoints(amountSpent) {
        return amountSpent * 3;
    }
}
class Discount {
    GiveDiscount(customer) {
        return customer.GiveDiscount();
    }
}
let premiumCustomer = new PremiumCustomer();
let goldCustomer = new GoldCustomer();
let discount = new Discount();
let FinalValue = discount.GiveDiscount(premiumCustomer);
let FinalValueGoldCustomer = discount.GiveDiscount(goldCustomer);
console.log(FinalValue);
console.log(FinalValueGoldCustomer);
//////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// ! LISKOV SUBSTITUTION PRINCIPLE ! \\
class Shape {
}
class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    CalculateArea() {
        return this.width * this.height;
    }
}
class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }
    CalculateArea() {
        return this.side * this.side;
    }
}
// ?????????????????????????????? \\
function Area(shape) {
    return shape.CalculateArea();
}
let rectangle = new Rectangle(10, 15);
let square = new Square(10);
Area(rectangle);
Area(square);
// ????????????????????????????????????????????????????????????????????????? \\
// Payment Processor
//  Credit Card
// Debit Card
// Paypal
class PaymentProcessor {
}
class CreditCardProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing Credit Card Payment of ${amount}`);
    }
}
class DebitCardProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing Debit Card Payment of ${amount}`);
    }
}
class PaypalProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing Paypal Payment Payment of ${amount}`);
    }
}
class BitcoinProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing Bitcoin Payment Payment of ${amount}`);
    }
}
function ExecutePayment(paymentProcessor, amount) {
    paymentProcessor.processPayment(amount);
}
let creditCardProcessor = new CreditCardProcessor();
let debitCardProcessor = new DebitCardProcessor();
let paypalProcessor = new PaypalProcessor();
let bitcoinProcessor = new BitcoinProcessor();
ExecutePayment(creditCardProcessor, 200);
ExecutePayment(debitCardProcessor, 150);
ExecutePayment(paypalProcessor, 280);
ExecutePayment(bitcoinProcessor, 180);
class SimplePRinter {
    print(document) {
        console.log(`Printer Machine Is Printing ${document}`);
    }
}
class MultiFunctionPrinter {
    print(document) {
        console.log(`Machine Is Printing ${document}`);
    }
    scan(document) {
        console.log(`Machine Is Scanning ${document}`);
    }
    fax(document) {
        console.log(`Machine Is Sending Fax ${document}`);
    }
}
class Admin {
    CreatePost(post) {
        console.log(`Created Post By Admin , ${post}`);
    }
    CreateComment(comment) {
        console.log(`Created Post By Admin , ${comment}`);
    }
    SharePost(post) {
        console.log(`Shared Post By Admin , ${post}`);
    }
}
class RegularUser {
    CreateComment(comment) {
        console.log(`Created Post By RegularUser , ${comment}`);
    }
    SharePost(post) {
        console.log(`Shared Post By RegularUser , ${post}`);
    }
}
class MySqlDatabase {
    save(data) {
        console.log(`${data} Is Being Kept By MySql`);
    }
}
class MongoDbDatabase {
    save(data) {
        console.log(`${data} Is Being Kept By Mongo Db`);
    }
}
class HighLeveLModule {
    constructor(database) {
        this.database = database;
    }
    execute(data) {
        this.database.save(data);
    }
}
let mySql = new MySqlDatabase();
let mongoDb = new MongoDbDatabase();
let user = new HighLeveLModule(mySql);
user.execute("HELLO");
let post = new HighLeveLModule(mongoDb);
post.execute("NEW POST");
