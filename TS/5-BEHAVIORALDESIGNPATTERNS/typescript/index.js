"use strict";
// ! OBSERVER PATTERN ! \\
class ConcreteObserver {
    constructor(id) {
        this.id = id;
    }
    update(subject) {
        console.log(`Observer ${this.id} Updated, New State: ${subject.getState()} !`);
    }
}
class ConcreteSubject {
    constructor() {
        this.observers = [];
        this.state = 0;
    }
    addObserver(observer) {
        const isExists = this.observers.includes(observer);
        if (isExists) {
            return console.log("Observer Already Exists !");
        }
        this.observers.push(observer);
        console.log("Observer Added Successfully !");
    }
    removeObserver(observer) {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log("Observer Does Not Exist !");
        }
        this.observers.splice(observerIndex, 1);
        console.log("Observer Was Successfully Removed !");
    }
    notifyObservers() {
        this.observers.forEach((observer) => observer.update(this));
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
        console.log("Setting State ....");
        this.notifyObservers();
    }
}
// * client code * \\
const subject = new ConcreteSubject();
const observer1 = new ConcreteObserver(1);
subject.addObserver(observer1);
const observer2 = new ConcreteObserver(2);
subject.addObserver(observer2);
subject.setState(123);
class WeatherData {
    constructor() {
        this.observers = [];
        // additional weather data
    }
    registerObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index >= 0) {
            this.observers.splice(index, 1);
        }
    }
    notifyObservers() {
        if (this.temperature !== undefined &&
            this.humidity !== undefined &&
            this.pressure !== undefined) {
            for (let observer of this.observers) {
                observer.update(this.temperature, this.humidity, this.pressure);
            }
        }
    }
    setMeasurements(temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.notifyObservers();
    }
}
class CurrentConditionsDisplay {
    constructor(weatherData) {
        this.weatherData = weatherData;
        this.weatherData.registerObserver(this);
    }
    update(temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.display();
    }
    display() {
        if (this.temperature !== undefined &&
            this.humidity !== undefined &&
            this.pressure !== undefined) {
            console.log(`Temperature: ${this.temperature}, Humidity: ${this.humidity}, Pressure: ${this.pressure}`);
        }
        else {
            console.log("Weather data is not available");
        }
    }
}
// client code
const weatherData = new WeatherData();
const currentDisplay = new CurrentConditionsDisplay(weatherData);
// Simulate new Weather Adjustments
weatherData.setMeasurements(80, 65, 30.4);
weatherData.setMeasurements(82, 70, 30.4);
// ! ITERATOR PATTERN ! \\
class ArrayIterator {
    constructor(collection) {
        this.collection = collection;
        this.position = 0;
    }
    next() {
        // Get the next element in the collection
        let result = this.collection[this.position];
        this.position += 1;
        return result;
    }
    hasNext() {
        return this.position < this.collection.length;
    }
}
// client code
const array = [1, 2, 3, 4, 5, 6];
const iterator = new ArrayIterator(array);
console.log(iterator.hasNext());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.hasNext());
const arrayString = ["Hello", "World"];
const stringIterator = new ArrayIterator(arrayString);
console.log(stringIterator.hasNext());
console.log(stringIterator.next());
console.log(stringIterator.next());
// ???????????????????????????????? \\
class User {
    constructor(name) {
        this.name = name;
    }
}
class UserCollection {
    constructor(users) {
        this.users = users;
    }
    createIterator() {
        return new UserIterator(this);
    }
    getItems() {
        return this.users;
    }
}
class UserIterator {
    constructor(collection) {
        this.position = 0;
        this.collection = collection;
    }
    hastNext() {
        console.log(this.collection.getItems());
        return this.position < this.collection.getItems().length;
    }
    next() {
        if (this.hastNext()) {
            return {
                value: this.collection.getItems()[this.position++],
                done: false,
            };
        }
        else {
            return { value: null, done: true };
        }
    }
}
// Client Code
const users = [new User("Alice"), new User("Bob"), new User("Charlie")];
// Convert Array of Users into a collection
const userCollection = new UserCollection(users);
// create an iterator
const iterator2 = userCollection.createIterator();
console.log(iterator.next());
console.log(iterator.next());
class PaypalStrategy {
    pay(amount) {
        console.log(`Paid ${amount} Using PayPal !`);
    }
}
class CreditCardStrategy {
    pay(amount) {
        console.log(`Paid ${amount} Using Credit Card !`);
    }
}
class BitcoinStrategy {
    pay(amount) {
        console.log(`Paid ${amount} Using Bitcoin !`);
    }
}
class ShoppingCart {
    constructor(strategy) {
        this.strategy = strategy;
        this.amount = 0;
    }
    setPaymentStrategy(strategy) {
        this.strategy = strategy;
    }
    addToCart(value) {
        this.amount += value;
    }
    checkout() {
        this.strategy.pay(this.amount);
        this.amount = 0;
    }
}
// * client code * \\
let cart = new ShoppingCart(new PaypalStrategy());
cart.addToCart(100);
cart.addToCart(50);
cart.checkout();
cart.setPaymentStrategy(new CreditCardStrategy());
cart.addToCart(100);
cart.checkout();
class GreyScaleStrategy {
    apply(image) {
        console.log(`Applying Grey Scale Filter To ${image} !`);
    }
}
class SepiaStrategy {
    apply(image) {
        console.log(`Applying Sepia Filter To ${image} !`);
    }
}
class NegativeStrategy {
    apply(image) {
        console.log(`Applying Negative Filter To ${image} !`);
    }
}
class ImageProcessor {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setFilterStrategy(strategy) {
        this.strategy = strategy;
    }
    applyFilter(image) {
        this.strategy.apply(image);
    }
}
// * client code * \\
const imageProcessor = new ImageProcessor(new GreyScaleStrategy());
imageProcessor.applyFilter("Image.jpg");
imageProcessor.setFilterStrategy(new SepiaStrategy());
imageProcessor.applyFilter("Image2.jpg");
// ! TEMPLATE PATTERN ! \\
class CakeRecipe {
    bakeCake() {
        this.preHeatOven();
        this.mixIngredients();
        this.bake();
        this.coolingDown();
        this.decorate();
    }
    preHeatOven() {
        console.log("Preheating Oven To 175 Degree C !");
    }
    bake() {
        console.log("Baking Cake ....");
    }
    coolingDown() {
        console.log("Cooling Down The Cake ...");
    }
    decorate() {
        console.log("Decorating Cake ...");
    }
}
class ChocolateCake extends CakeRecipe {
    mixIngredients() {
        console.log("Mixing: Chocolate, Sugar, Butter, Flour, Eggs !");
    }
    decorate() {
        console.log(" Decorating Cake With Chocolate !");
    }
}
class VanillaCake extends CakeRecipe {
    mixIngredients() {
        console.log("Mixing: Vanilla Extract, Sugar, Butter, Flour, Eggs !");
    }
}
// * client code * \\
function bakecake(cake) {
    cake.bakeCake();
}
console.log("Baking A Chocolate Cake !");
bakecake(new ChocolateCake());
console.log("Baking A Vanilla Cake");
bakecake(new VanillaCake());
// ???????????????????????????????????????????? \\
class DataParser {
    parseData() {
        this.loadData();
        const data = "Sample Data";
        const parsedData = this.parse(data);
        this.validate(parsedData);
        this.useData(parsedData);
    }
    loadData() {
        console.log("Loading Data...");
    }
    validate(data) {
        console.log("Validating Data....");
    }
    useData(data) {
        console.log("Using Data...");
    }
}
class JSONParser extends DataParser {
    parse(data) {
        console.log("Parsing Data As JSON !");
        // JSON.parse(data);
        return data;
    }
}
class XMLParser extends DataParser {
    parse(data) {
        console.log("Parsing Data As XML !");
        return data;
    }
}
// * client code * \\
function dataParser(dataParser) {
    dataParser.parseData();
}
console.log("Parsing JSON Data !");
dataParser(new JSONParser());
console.log("Parsing XML Data !");
dataParser(new XMLParser());
class Light {
    turnOn() {
        console.log("The Light Is On !");
    }
    turnOff() {
        console.log("The Light Is Off !");
    }
}
class TurnOnCommand {
    constructor(light) {
        this.light = light;
    }
    execute() {
        this.light.turnOn();
    }
    undo() {
        this.light.turnOff();
    }
}
class TurnOffCommand {
    constructor(light) {
        this.light = light;
    }
    execute() {
        this.light.turnOff();
    }
    undo() {
        this.light.turnOn();
    }
}
class SimpleRemoteControl {
    constructor() {
        this.commandQueue = [];
    }
    setCommand(command) {
        this.undoCommand = this.currentCommand;
        this.currentCommand = command;
        this.commandQueue.push(command);
    }
    buttonWasPressed() {
        if (this.commandQueue.length) {
            const command = this.commandQueue.shift();
            command === null || command === void 0 ? void 0 : command.execute();
        }
    }
    undoButtonWasPressed() {
        this.undoCommand.execute();
    }
    hasCommands() {
        return this.commandQueue.length > 0;
    }
}
// client Code
const remote = new SimpleRemoteControl();
const light = new Light();
// * turning on the light * \\
remote.setCommand(new TurnOnCommand(light));
remote.buttonWasPressed();
// * turning off the light * \\
remote.setCommand(new TurnOffCommand(light));
remote.buttonWasPressed();
// * undo last operation * \\
remote.undoButtonWasPressed();
// * create a command que \\
remote.setCommand(new TurnOnCommand(light));
remote.setCommand(new TurnOffCommand(light));
while (remote.hasCommands()) {
    remote.buttonWasPressed();
}
class MyFileSystem {
    constructor() {
        this.commandQueue = [];
    }
    addCommand(command) {
        this.commandQueue.push(command);
    }
    executeCommand() {
        if (this.commandQueue.length > 0) {
            let command = this.commandQueue.shift();
            command === null || command === void 0 ? void 0 : command.execute();
        }
    }
    undoCommand() {
        if (this.commandQueue.length > 0) {
            let command = this.commandQueue.pop();
            command === null || command === void 0 ? void 0 : command.undo();
        }
    }
    hasCommands() {
        return this.commandQueue.length > 0;
    }
}
class CreateFileCommand {
    constructor(path) {
        this.path = path;
    }
    execute() {
        console.log(`Creating File At ${this.path} !`);
        // logic
    }
    undo() {
        console.log(`Deleting File At ${this.path} !`);
    }
}
class DeleteFileCommand {
    constructor(path) {
        this.path = path;
    }
    execute() {
        console.log(`Deleting File At ${this.path} !`);
        // * logic * \\
    }
    undo() {
        console.log(`Restoring File At ${this.path} !`);
    }
}
class ReadFileCommand {
    constructor(path) {
        this.path = path;
    }
    execute() {
        console.log(`Reading file at ${this.path}`);
        // * logic * \\
    }
    undo() {
        console.log(`Undo Operation Not Available !`);
    }
}
class UpdateFileCommand {
    constructor(path, newContent, oldContent) {
        this.path = path;
        this.newContent = newContent;
        this.oldContent = oldContent;
    }
    execute() {
        console.log(`Updating File ${this.path}, New Content: ${this.newContent}`);
    }
    undo() {
        console.log(`Reverting File ${this.path} , Old Content: ${this.oldContent}`);
    }
}
// * client code * \\
let myFileSystem = new MyFileSystem();
// * creating a file * \\
myFileSystem.addCommand(new CreateFileCommand("/path/file.txt"));
// * update file * \\
let updateFile = new UpdateFileCommand("/path/file.txt", "new content", "old content");
myFileSystem.addCommand(updateFile);
// * read file * \\
myFileSystem.addCommand(new ReadFileCommand("/path/file.txt"));
// * deleting a command * \\
myFileSystem.addCommand(new DeleteFileCommand("/path/file.txt"));
while (myFileSystem.hasCommands()) {
    myFileSystem.executeCommand();
}
myFileSystem.undoCommand();
class OnState {
    switchState(lightSwitch) {
        console.log("Light State Is On. Turning Off ...");
        lightSwitch.setState(new OffState());
    }
}
class OffState {
    switchState(lightSwitch) {
        console.log("Light State Is Off. Turning On ...");
        lightSwitch.setState(new OnState());
    }
}
class LightSwitch {
    constructor(state) {
        this.state = state;
    }
    setState(state) {
        this.state = state;
    }
    press() {
        this.state.switchState(this);
    }
}
// client code
const lightSwitch = new LightSwitch(new OffState());
lightSwitch.press();
lightSwitch.press();
class SelectionTool {
    onMouseDown() {
        console.log("Selection Started !");
    }
    onMouseUp() {
        console.log("Selection Drawn !");
    }
}
class BrushTool {
    onMouseDown() {
        console.log("Brush Stroke Started !");
    }
    onMouseUp() {
        console.log("Brush Stroke Drawn !");
    }
}
class EraserTool {
    onMouseDown() {
        console.log("Eraser Started !");
    }
    onMouseUp() {
        console.log("Erased !");
    }
}
class Canvas {
    constructor(tool) {
        this.tool = tool;
    }
    setTool(tool) {
        this.tool = tool;
    }
    onMouseDown() {
        this.tool.onMouseDown();
    }
    onMouseUp() {
        this.tool.onMouseUp();
    }
}
// * client code * \\
let canvas = new Canvas(new SelectionTool());
canvas.onMouseDown();
canvas.onMouseUp();
canvas.setTool(new BrushTool());
canvas.onMouseDown();
canvas.onMouseUp();
canvas.setTool(new EraserTool());
canvas.onMouseDown();
canvas.onMouseUp();
// ! CHAIN OF RESPONSIBILITY PATTERN ! \\
// interface Handler {
//     setNext(handler: Handler): Handler;
//     handle(request: string): string | null;
//   }
//   abstract class AbstractHandler implements Handler {
//     private nextHandler: Handler | null = null;
//     public setNext(handler: Handler): Handler {
//       this.nextHandler = handler;
//       // * returning a handler * \\
//       // * allows convenient chaining * \\
//       return handler;
//     }
//     public handle(request: string): string | null {
//       if (this.nextHandler) {
//         return this.nextHandler.handle(request);
//       }
//       return null;
//     }
//   }
//   class MonkeyHandler extends AbstractHandler {
//     public handle(request: string): string | null {
//       if (request === "Banana") {
//         return `Monkey: I'll Eat The ${request} !`;
//       }
//       return super.handle(request);
//     }
//   }
//   class SquirrelHandler extends AbstractHandler {
//     public handle(request: string): string | null {
//       if (request === "Nut") {
//         return `Squirrel: I'll Eat The ${request} !`;
//       }
//       return super.handle(request);
//     }
//   }
//   class DogHandler extends AbstractHandler {
//     public handle(request: string): string | null {
//       if (request === "MeatBall") {
//         return `Dog: I'll Eat The ${request} !`;
//       }
//       return super.handle(request);
//     }
//   }
//   // * client code * \\
//   function clientCode(handler: Handler) {
//     const foods = ["Nut", "Banana", "Cup Of Coffee", "MeatBall"];
//     for (const food of foods) {
//       console.log(`Who Wants To Eat ${food} ?`);
//       const result = handler.handle(food);
//       if (result) {
//         console.log(result);
//       } else {
//         console.log(`${food} Was Left Untouched !`);
//       }
//     }
//   }
//   const monkey = new MonkeyHandler();
//   const squirrel = new SquirrelHandler();
//   const dog = new DogHandler();
//   // * chaining handlers * \\
//   monkey.setNext(squirrel).setNext(dog);
//   clientCode(monkey);
// ?????????????????????????????????????????? \\
class Order {
    isValid() {
        return true;
    }
    applyDiscount() {
        // discount
    }
    processPayment() {
        return true;
    }
    ship() {
        // shippingthe order
    }
}
class AbstractHandler {
    constructor() {
        this.nextHandler = null;
    }
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    handle(order) {
        if (this.nextHandler) {
            return this.nextHandler.handle(order);
        }
        return null;
    }
}
class ValidationHandler extends AbstractHandler {
    handle(order) {
        if (order.isValid()) {
            return super.handle(order);
        }
        return "Validation Failed";
    }
}
class DiscountHandler extends AbstractHandler {
    handle(order) {
        order.applyDiscount();
        return super.handle(order);
    }
}
class PaymentHandler extends AbstractHandler {
    handle(order) {
        if (order.processPayment()) {
            return super.handle(order);
        }
        return "Payment Failed";
    }
}
class ShippingHandler extends AbstractHandler {
    handle(order) {
        order.ship();
        return "Order processed and shipped";
    }
}
// client code
const order = new Order();
const orderHandler = new ValidationHandler();
orderHandler
    .setNext(new DiscountHandler())
    .setNext(new PaymentHandler())
    .setNext(new ShippingHandler());
console.log(orderHandler.handle(order));
