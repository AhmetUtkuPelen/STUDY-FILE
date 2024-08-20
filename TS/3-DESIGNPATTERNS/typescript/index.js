"use strict";
// ! SINGLETON PATTERN ! \\
class Singleton {
    constructor() { }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    set value(value) {
        Singleton._value = value;
    }
    getValue() {
        return Singleton._value;
    }
}
let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();
instance1.value = 10;
console.log(instance1.value);
console.log(instance2.value);
console.log(instance1 === instance2);
// ????????????????????????????????????????????????????????????????  \\
// Singleton Logger Class
// Log Method
// Can Have Multiple Methods
class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(message) {
        const timestamp = new Date();
        console.log(`[${timestamp.toLocaleString()}] - ${message}`);
    }
}
class Application {
    constructor(logger) {
        this.logger = logger;
    }
    run() {
        this.logger.log(`Application Is Up And Running !`);
        this.logger.log(`Application Is Shutting Down !`);
    }
}
let logger = Logger.getInstance();
let app = new Application(logger);
app.run();
class ConcretePrototype {
    constructor(user) {
        this.user = user;
    }
    clone() {
        const clone = Object.create(this);
        clone.user = Object.assign({}, this.user);
        return clone;
    }
    getUserDetails() {
        return this.user;
    }
}
let user1 = new ConcretePrototype({
    name: "JOHN",
    age: 25,
    email: "john@john.com",
});
let user2 = user1.clone();
if (user1 === user2) {
    console.log("Both Objects Are Same ! ");
}
else {
    console.log("Both Objects Are Different ! ");
}
class Shape {
    constructor(properties) {
        this.properties = properties;
    }
}
class Rectangle extends Shape {
    constructor(properties, width, height) {
        super(properties);
        this.width = width;
        this.height = height;
    }
    clone() {
        let clonedProperties = {
            color: this.properties.color,
            x: this.properties.x,
            y: this.properties.y
        };
        return new Rectangle(clonedProperties, this.width, this.height);
    }
}
class Circle extends Shape {
    constructor(properties, radius) {
        super(properties);
        this.radius = radius;
    }
    clone() {
        let clonedProperties = {
            color: this.properties.color,
            x: this.properties.x,
            y: this.properties.y
        };
        return new Circle(clonedProperties, this.radius);
    }
}
let blueRectangle = new Rectangle({
    color: "blue",
    x: 25,
    y: 20
}, 15, 15);
let otherRectangle = blueRectangle.clone();
otherRectangle.properties.color = "red";
console.log(blueRectangle);
console.log(otherRectangle);
// ???????????????????????????????????????????????????????????? \\
let Original = {
    name: "John",
    address: {
        street: "100 Street",
        city: "Texas",
    },
};
let ShallowCopy = Object.assign({}, Original);
ShallowCopy.address.city = "New York";
console.log(ShallowCopy.address.city);
console.log(Original.address.city);
let DeepCopy = JSON.parse(JSON.stringify(Original));
DeepCopy.address.city = "Orlando";
console.log(DeepCopy.address.city);
console.log(Original.address.city);
class Product {
    constructor() {
        this.parts = [];
    }
    add(part) {
        this.parts.push(part);
    }
    ListParts() {
        console.log(`Product Parts ${this.parts.join(",")}`);
    }
}
class ConcreteBuilder {
    constructor() { }
    reset() {
        this.product = new Product();
    }
    setPartA() {
        this.product.add("Part A");
    }
    setPartB() {
        this.product.add("Part B");
    }
    setPartC() {
        this.product.add("Part C");
    }
    GetProduct() {
        const result = this.product;
        this.reset();
        return result;
    }
}
class Director {
    setBuilder(builder) {
        this.builder = builder;
    }
    buildMinimumProduct() {
        this.builder.setPartA();
    }
    buildFullProduct() {
        this.builder.setPartA();
        this.builder.setPartB();
        this.builder.setPartC();
    }
}
const builder = new ConcreteBuilder();
const director = new Director();
director.setBuilder(builder);
director.buildMinimumProduct();
let minProduct = builder.GetProduct();
console.log(minProduct);
director.buildFullProduct();
let fullProduct = builder.GetProduct();
console.log(fullProduct);
class Customer {
    constructor(firstName, lastName, email, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
class CustomerBuilder {
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phoneNumber = "";
    }
    setFirstName(firstName) {
        this.firstName = firstName;
        return this;
    }
    setLastName(lastName) {
        this.lastName = lastName;
        return this;
    }
    setEmail(email) {
        this.email = email;
        return this;
    }
    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }
    build() {
        return new Customer(this.firstName, this.lastName, this.email, this.phoneNumber);
    }
}
class CustomerDirector {
    constructor(builder) {
        this.builder = builder;
    }
    buildMinimalCustomer(firstName, lastName, email) {
        return this.builder.setFirstName(firstName).setLastName(lastName).setEmail(email).build();
    }
}
const builder2 = new CustomerBuilder();
const director2 = new CustomerDirector(builder2);
const customer2 = director2.buildMinimalCustomer("John", "Doe", "johndoe@example.com");
console.log(customer2);
// ! FACTORY PATTERN ! \\
class Car {
    constructor(model, productionYear) {
        this.model = model;
        this.productionYear = productionYear;
    }
}
class FORD extends Car {
    DisplayCarInfo() {
        console.log(`This Is A Ford Car : ${this.model} - This Car Was Produced In ${this.productionYear}`);
    }
}
class PORSCHE extends Car {
    DisplayCarInfo() {
        console.log(`This Is A Porsche Car : ${this.model} - This Car Was Produced In ${this.productionYear}`);
    }
}
class FERRARI extends Car {
    DisplayCarInfo() {
        console.log(`This Is A Ferrari Car : ${this.model} - This Car Was Produced In ${this.productionYear}`);
    }
}
class CarFactory {
    createCar(type, model, productionYear) {
        switch (type) {
            case 'FORD':
                return new FORD(model, productionYear);
            case 'PORSCHE':
                return new PORSCHE(model, productionYear);
            case 'FERRARI':
                return new FERRARI(model, productionYear);
            default:
                throw new Error(`Invalid Car Type !`);
        }
    }
}
const carFactory = new CarFactory();
const ford = carFactory.createCar("FORD", "Focus", 2020);
ford.DisplayCarInfo();
const porsche = carFactory.createCar("PORSCHE", "Jaguar", 2019);
porsche.DisplayCarInfo();
const ferrari = carFactory.createCar("FERRARI", "XT550", 2024);
ferrari.DisplayCarInfo();
// ????????????????????????????????????????????? \\
class PaymentProcessor {
    constructor(amount) {
        this.amount = amount;
    }
}
class PaypalProcessor extends PaymentProcessor {
    processPayment() {
        console.log(`Processing PayPal Payment For ${this.amount} ! `);
    }
}
class StripeProcessor extends PaymentProcessor {
    processPayment() {
        console.log(`Processing Stripe Payment For ${this.amount} ! `);
    }
}
class BankTransferProcessor extends PaymentProcessor {
    processPayment() {
        console.log(`Processing Bank Transfer Payment For ${this.amount} ! `);
    }
}
class PaymentProcessorFactory {
    createProcessor(type, amount) {
        switch (type) {
            case 'paypal':
                return new PaypalProcessor(amount);
            case 'stripe':
                return new StripeProcessor(amount);
            case 'bank':
                return new BankTransferProcessor(amount);
            default:
                throw new Error(`Invalid Payment Processor Type!`);
        }
    }
}
const ProcessorFactory = new PaymentProcessorFactory();
const PaypalPayment = ProcessorFactory.createProcessor('paypal', 250);
const StripPayment = ProcessorFactory.createProcessor("stripe", 500);
PaypalPayment.processPayment();
StripPayment.processPayment();
class ProductA {
    operationA() {
        return "This Is The Result Of Operation A";
    }
}
class ProductB {
    operationB() {
        return "This Is The Result Of Operation B";
    }
    combinedOperation(collaborator) {
        const result = collaborator.operationA();
        return `The Result Of Product B Callobrating With (${result})`;
    }
}
class Factory {
    createProductA() {
        return new ProductA();
    }
    createProductB() {
        return new ProductB();
    }
}
//  Client Code
const factory = new Factory();
const productA = factory.createProductA();
console.log(productA.operationA());
const productB = factory.createProductB();
console.log(productB.combinedOperation(productA));
console.log(productB.operationB());
class WindowsButton {
    render() {
        console.log("Render a button in Windows Style");
    }
    onClick(f) {
        console.log("Windows button was clicked");
        f();
    }
}
class WindowsCheckbox {
    constructor(button) {
        this.button = button;
    }
    render() {
        console.log("Render a checkbox in Windows Style");
    }
    toggle() {
        this.button.onClick(() => {
            console.log("Windows checkbox toggled");
        });
    }
}
class MacOSButton {
    render() {
        console.log("Render a button in MacOS Style");
    }
    onClick(f) {
        console.log("MacOS button was clicked");
        f();
    }
}
class MacOSCheckbox {
    constructor(button) {
        this.button = button;
    }
    render() {
        console.log("Render a checkbox in MacOS Style");
    }
    toggle() {
        this.button.onClick(() => {
            console.log("MacOS checkbox toggled");
        });
    }
}
class WindowsFactory {
    createButton() {
        return new WindowsButton();
    }
    createCheckbox(button) {
        return new WindowsCheckbox(button);
    }
}
class MacOsFactory {
    createButton() {
        return new MacOSButton();
    }
    createCheckbox(button) {
        return new MacOSCheckbox(button);
    }
}
// * client Code * \\
function renderUI(factory) {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox(button);
    button.render();
    checkbox.render();
    button.onClick(() => {
        console.log("Button Clicked");
    });
    checkbox.toggle();
}
renderUI(new WindowsFactory());
renderUI(new MacOsFactory());
console.log('UB)DSADBSADYBSADO');
