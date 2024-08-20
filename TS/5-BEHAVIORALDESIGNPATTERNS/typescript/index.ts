// ! OBSERVER PATTERN ! \\



interface Observer {
    update(subject: Subject): void
  }
  
  class ConcreteObserver implements Observer {
    constructor(private id: number) {}
    public update(subject: Subject): void {
      console.log(
        `Observer ${this.id} Updated, New State: ${subject.getState()} !`
      )
    }
  }
  
  interface Subject {
    addObserver(observer: Observer): void
    removeObserver(observer: Observer): void
    notifyObservers(): void
    getState(): number
    setState(state: number): void
  }
  
  class ConcreteSubject implements Subject {
    private observers: Observer[] = []
    private state: number = 0
  
    public addObserver(observer: Observer): void {
      const isExists = this.observers.includes(observer)
      if (isExists) {
        return console.log("Observer Already Exists !")
      }
  
      this.observers.push(observer)
      console.log("Observer Added Successfully !")
    }
  
    public removeObserver(observer: Observer): void {
      const observerIndex = this.observers.indexOf(observer)
      if (observerIndex === -1) {
        return console.log("Observer Does Not Exist !")
      }
      this.observers.splice(observerIndex, 1)
      console.log("Observer Was Successfully Removed !")
    }
  
    public notifyObservers(): void {
      this.observers.forEach((observer) => observer.update(this))
    }
  
    public getState(): number {
      return this.state
    }
  
    public setState(state: number): void {
      this.state = state
      console.log("Setting State ....")
      this.notifyObservers()
    }
  }
  
  // * client code * \\
  const subject = new ConcreteSubject()
  
  const observer1 = new ConcreteObserver(1)
  subject.addObserver(observer1)
  
  const observer2 = new ConcreteObserver(2)
  subject.addObserver(observer2)
  
  subject.setState(123)









// ??????????????????????????????????????????????????????????? \\






interface Observer2 {
    update(temperature: number, humidity: number, pressure: number): void
  }
  
  interface Subject2 {
    registerObserver(observer: Observer2): void
    removeObserver(observer: Observer2): void
    notifyObservers(): void
  }
  
  class WeatherData implements Subject2 {
    private observers: Observer2[] = []
    private temperature: number | undefined
    private humidity: number | undefined
    private pressure: number | undefined
  
    public registerObserver(observer: Observer2): void {
      this.observers.push(observer)
    }
  
    public removeObserver(observer: Observer2): void {
      const index = this.observers.indexOf(observer)
      if (index >= 0) {
        this.observers.splice(index, 1)
      }
    }
  
    public notifyObservers(): void {
      if (
        this.temperature !== undefined &&
        this.humidity !== undefined &&
        this.pressure !== undefined
      ) {
        for (let observer of this.observers) {
          observer.update(this.temperature, this.humidity, this.pressure)
        }
      }
    }
  
    public setMeasurements(
      temperature: number,
      humidity: number,
      pressure: number
    ): void {
      this.temperature = temperature
      this.humidity = humidity
      this.pressure = pressure
      this.notifyObservers()
    }
  
    // additional weather data
  }
  
  class CurrentConditionsDisplay implements Observer2 {
    private temperature: number | undefined
    private humidity: number | undefined
    private pressure: number | undefined
  
    constructor(private weatherData: Subject2) {
      this.weatherData.registerObserver(this)
    }
  
    public update(temperature: number, humidity: number, pressure: number): void {
      this.temperature = temperature
      this.humidity = humidity
      this.pressure = pressure
      this.display()
    }
  
    public display(): void {
      if (
        this.temperature !== undefined &&
        this.humidity !== undefined &&
        this.pressure !== undefined
      ) {
        console.log(
          `Temperature: ${this.temperature}, Humidity: ${this.humidity}, Pressure: ${this.pressure}`
        )
      } else {
        console.log("Weather data is not available")
      }
    }
  }
  
  // client code
  const weatherData = new WeatherData()
  const currentDisplay = new CurrentConditionsDisplay(weatherData)
  
  // Simulate new Weather Adjustments
  weatherData.setMeasurements(80, 65, 30.4)
  weatherData.setMeasurements(82, 70, 30.4)














// ! ITERATOR PATTERN ! \\





class ArrayIterator<T> {
    private position: number = 0;
    constructor(private collection: T[]) {}
  
    public next(): T {
      // Get the next element in the collection
      let result: T = this.collection[this.position];
      this.position += 1;
      return result;
    }
  
    public hasNext(): boolean {
      return this.position < this.collection.length;
    }
  }
  
  // client code
  const array: number[] = [1, 2, 3, 4, 5, 6];
  const iterator = new ArrayIterator<number>(array);
  console.log(iterator.hasNext());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.hasNext());
  
  const arrayString = ["Hello", "World"];
  const stringIterator = new ArrayIterator<string>(arrayString);
  console.log(stringIterator.hasNext());
  console.log(stringIterator.next());
  console.log(stringIterator.next());










// ???????????????????????????????? \\


class User {
    constructor(public name: string) {}
  }
  
  interface MyIteratorResult<T> {
    value: T | null;
    done: boolean;
  }
  
  interface MyIterator<T> {
    next(): MyIteratorResult<T>;
    hastNext(): boolean;
  }
  
  interface Collection<T> {
    createIterator(): MyIterator<T>;
  }
  
  class UserCollection implements Collection<User> {
    constructor(private users: User[]) {}
  
    public createIterator(): MyIterator<User> {
      return new UserIterator(this);
    }
  
    public getItems(): User[] {
      return this.users;
    }
  }
  
  class UserIterator implements MyIterator<User> {
    private collection: UserCollection;
    private position: number = 0;
  
    constructor(collection: UserCollection) {
      this.collection = collection;
    }
  
    public hastNext(): boolean {
      console.log(this.collection.getItems());
      return this.position < this.collection.getItems().length;
    }
  
    public next(): MyIteratorResult<User> {
      if (this.hastNext()) {
        return {
          value: this.collection.getItems()[this.position++],
          done: false,
        };
      } else {
        return { value: null, done: true };
      }
    }
  }
  
  // Client Code
  const users = [new User("Alice"), new User("Bob"), new User("Charlie")];
  
  // Convert Array of Users into a collection
  const userCollection = new UserCollection(users);
  
  // create an iterator
  const iterator2= userCollection.createIterator();
  
  console.log(iterator.next());
  console.log(iterator.next());














// ! STRATEGY PATTERN ! \\



interface PaymentStrategy {
    pay(amount: number): void;
  }
  
  class PaypalStrategy implements PaymentStrategy {
    public pay(amount: number): void {
      console.log(`Paid ${amount} Using PayPal !`);
    }
  }
  
  class CreditCardStrategy implements PaymentStrategy {
    public pay(amount: number): void {
      console.log(`Paid ${amount} Using Credit Card !`);
    }
  }
  
  class BitcoinStrategy implements PaymentStrategy {
    public pay(amount: number): void {
      console.log(`Paid ${amount} Using Bitcoin !`);
    }
  }
  
  class ShoppingCart {
    private amount: number = 0;
  
    constructor(private strategy: PaymentStrategy) {}
  
    public setPaymentStrategy(strategy: PaymentStrategy): void {
      this.strategy = strategy;
    }
  
    public addToCart(value: number): void {
      this.amount += value;
    }
  
    public checkout(): void {
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








// ???????????????????????????????????????????????????? \\






interface FilterStrategy {
    apply(image: string): void;
  }
  
  class GreyScaleStrategy implements FilterStrategy {
    public apply(image: string): void {
      console.log(`Applying Grey Scale Filter To ${image} !`);
    }
  }
  
  class SepiaStrategy implements FilterStrategy {
    public apply(image: string): void {
      console.log(`Applying Sepia Filter To ${image} !`);
    }
  }
  
  class NegativeStrategy implements FilterStrategy {
    public apply(image: string): void {
      console.log(`Applying Negative Filter To ${image} !`);
    }
  }
  
  class ImageProcessor {
    constructor(private strategy: FilterStrategy) {}
  
    public setFilterStrategy(strategy: FilterStrategy): void {
      this.strategy = strategy;
    }
  
    public applyFilter(image: string): void {
      this.strategy.apply(image);
    }
  }
  
  // * client code * \\
  const imageProcessor = new ImageProcessor(new GreyScaleStrategy());
  imageProcessor.applyFilter("Image.jpg");
  
  imageProcessor.setFilterStrategy(new SepiaStrategy());
  imageProcessor.applyFilter("Image2.jpg");









// ! TEMPLATE PATTERN ! \\




abstract class CakeRecipe {
    public bakeCake(): void {
      this.preHeatOven();
      this.mixIngredients();
      this.bake();
      this.coolingDown();
      this.decorate();
    }
  
    protected preHeatOven(): void {
      console.log("Preheating Oven To 175 Degree C !");
    }
  
    protected bake(): void {
      console.log("Baking Cake ....");
    }
  
    protected coolingDown(): void {
      console.log("Cooling Down The Cake ...");
    }
  
    protected decorate(): void {
      console.log("Decorating Cake ...");
    }
  
    protected abstract mixIngredients(): void;
  }
  
  class ChocolateCake extends CakeRecipe {
    protected mixIngredients(): void {
      console.log("Mixing: Chocolate, Sugar, Butter, Flour, Eggs !");
    }
  
    protected decorate(): void {
      console.log(" Decorating Cake With Chocolate !");
    }
  }
  
  class VanillaCake extends CakeRecipe {
    protected mixIngredients(): void {
      console.log("Mixing: Vanilla Extract, Sugar, Butter, Flour, Eggs !");
    }
  }
  
  // * client code * \\
  function bakecake(cake: CakeRecipe) {
    cake.bakeCake();
  }
  
  console.log("Baking A Chocolate Cake !");
  bakecake(new ChocolateCake());
  
  console.log("Baking A Vanilla Cake");
  bakecake(new VanillaCake());









// ???????????????????????????????????????????? \\








  abstract class DataParser {
    public parseData(): void {
      this.loadData();
      const data = "Sample Data";
      const parsedData = this.parse(data);
      this.validate(parsedData);
      this.useData(parsedData);
    }
  
    protected loadData(): void {
      console.log("Loading Data...");
    }
  
    protected validate(data: any): void {
      console.log("Validating Data....");
    }
  
    protected useData(data: any): void {
      console.log("Using Data...");
    }
  
    protected abstract parse(data: any): void;
  }
  
  class JSONParser extends DataParser {
    protected parse(data: any): void {
      console.log("Parsing Data As JSON !");
      // JSON.parse(data);
      return data;
    }
  }
  
  class XMLParser extends DataParser {
    protected parse(data: any): void {
      console.log("Parsing Data As XML !");
      return data;
    }
  }
  
  // * client code * \\
  function dataParser(dataParser: DataParser) {
    dataParser.parseData();
  }
  
  console.log("Parsing JSON Data !");
  dataParser(new JSONParser());
  
  console.log("Parsing XML Data !");
  dataParser(new XMLParser());









// ! COMMAND PATTERN ! \\



  interface ICommand {
    execute(): void;
    undo(): void;
  }
  
  class Light {
    public turnOn(): void {
      console.log("The Light Is On !");
    }
  
    public turnOff(): void {
      console.log("The Light Is Off !");
    }
  }
  
  class TurnOnCommand implements ICommand {
    constructor(private light: Light) {}
  
    public execute(): void {
      this.light.turnOn();
    }
  
    public undo(): void {
      this.light.turnOff();
    }
  }
  
  class TurnOffCommand implements ICommand {
    constructor(private light: Light) {}
  
    public execute(): void {
      this.light.turnOff();
    }
  
    public undo(): void {
      this.light.turnOn();
    }
  }
  
  class SimpleRemoteControl {
    private currentCommand!: ICommand;
    private undoCommand!: ICommand;
    private commandQueue: ICommand[] = [];
  
    public setCommand(command: ICommand): void {
      this.undoCommand = this.currentCommand;
      this.currentCommand = command;
      this.commandQueue.push(command);
    }
  
    public buttonWasPressed(): void {
      if (this.commandQueue.length) {
        const command = this.commandQueue.shift();
        command?.execute();
      }
    }
  
    public undoButtonWasPressed(): void {
      this.undoCommand.execute();
    }
  
    public hasCommands(): boolean {
      return this.commandQueue.length > 0;
    }
  }
  
  // client Code
  const remote: SimpleRemoteControl = new SimpleRemoteControl();
  const light: Light = new Light();
  
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









// ??????????????????????????????????????????????????????? \\




interface ICommand {
    execute(): void;
    undo(): void;
  }
  
  class MyFileSystem {
    private commandQueue: ICommand[] = [];
  
    public addCommand(command: ICommand): void {
      this.commandQueue.push(command);
    }
  
    public executeCommand(): void {
      if (this.commandQueue.length > 0) {
        let command = this.commandQueue.shift();
        command?.execute();
      }
    }
  
    public undoCommand(): void {
      if (this.commandQueue.length > 0) {
        let command = this.commandQueue.pop();
        command?.undo();
      }
    }
  
    public hasCommands(): boolean {
      return this.commandQueue.length > 0;
    }
  }
  
  class CreateFileCommand implements ICommand {
    constructor(private path: string) {}
  
    public execute(): void {
      console.log(`Creating File At ${this.path} !`);
      // logic
    }
  
    public undo(): void {
      console.log(`Deleting File At ${this.path} !`);
    }
  }
  
  class DeleteFileCommand implements ICommand {
    constructor(private path: string) {}
  
    public execute(): void {
      console.log(`Deleting File At ${this.path} !`);
      // * logic * \\
    }
  
    public undo(): void {
      console.log(`Restoring File At ${this.path} !`);
    }
  }
  
  class ReadFileCommand implements ICommand {
    constructor(private path: string) {}
  
    public execute(): void {
      console.log(`Reading file at ${this.path}`);
      // * logic * \\
    }
  
    public undo(): void {
      console.log(`Undo Operation Not Available !`);
    }
  }
  
  class UpdateFileCommand implements ICommand {
    constructor(
      private path: string,
      private newContent: string,
      private oldContent: string
    ) {}
  
    public execute(): void {
      console.log(`Updating File ${this.path}, New Content: ${this.newContent}`);
    }
  
    public undo(): void {
      console.log(`Reverting File ${this.path} , Old Content: ${this.oldContent}`);
    }
  }
  
  // * client code * \\
  let myFileSystem = new MyFileSystem();
  
  // * creating a file * \\
  myFileSystem.addCommand(new CreateFileCommand("/path/file.txt"));
  
  // * update file * \\
  let updateFile = new UpdateFileCommand(
    "/path/file.txt",
    "new content",
    "old content"
  );
  myFileSystem.addCommand(updateFile);
  
  // * read file * \\
  myFileSystem.addCommand(new ReadFileCommand("/path/file.txt"));
  
  // * deleting a command * \\
  myFileSystem.addCommand(new DeleteFileCommand("/path/file.txt"));
  
  while (myFileSystem.hasCommands()) {
    myFileSystem.executeCommand();
  }
  
  myFileSystem.undoCommand();











// ! STATE PATTERN ! \\





interface LightState {
    switchState(lightSwitch: LightSwitch): void;
  }
  
  class OnState implements LightState {
    public switchState(lightSwitch: LightSwitch): void {
      console.log("Light State Is On. Turning Off ...");
      lightSwitch.setState(new OffState());
    }
  }
  class OffState implements LightState {
    public switchState(lightSwitch: LightSwitch): void {
      console.log("Light State Is Off. Turning On ...");
      lightSwitch.setState(new OnState());
    }
  }
  
  class LightSwitch {
    constructor(private state: LightState) {}
  
    public setState(state: LightState): void {
      this.state = state;
    }
    public press(): void {
      this.state.switchState(this);
    }
  }
  
  // client code
  const lightSwitch = new LightSwitch(new OffState());
  lightSwitch.press();
  lightSwitch.press();








// ????????????????????????????????????????????????????????????? \\









interface Tool {
    onMouseDown(): void;
    onMouseUp(): void;
  }
  
  class SelectionTool implements Tool {
    public onMouseDown(): void {
      console.log("Selection Started !");
    }
    public onMouseUp(): void {
      console.log("Selection Drawn !");
    }
  }
  
  class BrushTool implements Tool {
    public onMouseDown(): void {
      console.log("Brush Stroke Started !");
    }
    public onMouseUp(): void {
      console.log("Brush Stroke Drawn !");
    }
  }
  
  class EraserTool implements Tool {
    public onMouseDown(): void {
      console.log("Eraser Started !");
    }
    public onMouseUp(): void {
      console.log("Erased !");
    }
  }
  
  class Canvas {
    constructor(private tool: Tool) {}
  
    public setTool(tool: Tool): void {
      this.tool = tool;
    }
  
    public onMouseDown(): void {
      this.tool.onMouseDown();
    }
  
    public onMouseUp(): void {
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
    public isValid() {
      return true;
    }
  
    public applyDiscount() {
      // discount
    }
  
    public processPayment() {
      return true;
    }
  
    public ship() {
      // shippingthe order
    }
  }
  
  interface Handler {
    setNext(handler: Handler): Handler;
    handle(order: Order): string | null;
  }
  
  abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | null = null;
  
    public setNext(handler: Handler): Handler {
      this.nextHandler = handler;
      return handler;
    }
  
    public handle(order: Order): string | null {
      if (this.nextHandler) {
        return this.nextHandler.handle(order);
      }
      return null;
    }
  }
  
  class ValidationHandler extends AbstractHandler {
    public handle(order: Order): string | null {
      if (order.isValid()) {
        return super.handle(order);
      }
      return "Validation Failed";
    }
  }
  
  class DiscountHandler extends AbstractHandler {
    public handle(order: Order): string | null {
      order.applyDiscount();
      return super.handle(order);
    }
  }
  
  class PaymentHandler extends AbstractHandler {
    public handle(order: Order): string | null {
      if (order.processPayment()) {
        return super.handle(order);
      }
      return "Payment Failed";
    }
  }
  
  class ShippingHandler extends AbstractHandler {
    public handle(order: Order): string | null {
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