"use strict";
// ! FACADE PATTERN ! \\
class Grinder {
    grindBeads() {
        console.log("Grinding Beans ...");
    }
}
class Boiler {
    boilWater() {
        console.log("Boiling Water ...");
    }
}
class Brewer {
    brewCoffee() {
        console.log("Brewing Coffee ...");
    }
}
class CoffeeMakerFacade {
    constructor(grinder, boiler, brewer) {
        this.grinder = grinder;
        this.boiler = boiler;
        this.brewer = brewer;
    }
    makeCoffee() {
        this.grinder.grindBeads();
        this.boiler.boilWater();
        this.brewer.brewCoffee();
        console.log("The Coffee is ready");
    }
}
// Client code
let grinder = new Grinder();
let boiler = new Boiler();
let brewer = new Brewer();
let coffeeMaker = new CoffeeMakerFacade(grinder, boiler, brewer);
coffeeMaker.makeCoffee();
// ???????????????????????????????????????????????????????????????? \\
class Amplifier {
    turnOn() {
        console.log("Amplifier Is Turned On !");
    }
    setVolume(level) {
        console.log(`Volume Is Set To ${level}`);
    }
}
class DvdPlayer {
    turnOn() {
        console.log("The DVD Player Is Tuned On !");
    }
    play(movie) {
        console.log(`Playing ${movie} !`);
    }
}
class Projector {
    turnOn() {
        console.log("Projector Is Turned On !");
    }
    setInput(dvdPlayer) {
        console.log("Input Set To DvdPlayer !");
    }
}
class Lights {
    dim(level) {
        console.log(`Lights Dimmed To ${level}`);
    }
}
class HomeTheaterFacade {
    constructor(amplifier, dvdPlayer, projector, lights) {
        this.amplifier = amplifier;
        this.dvdPlayer = dvdPlayer;
        this.projector = projector;
        this.lights = lights;
    }
    watchMovie(movie, volume, level) {
        console.log(`Get Ready To Watch ${movie}`);
        this.lights.dim(level);
        this.amplifier.turnOn();
        this.amplifier.setVolume(volume);
        this.dvdPlayer.turnOn();
        this.projector.turnOn();
        this.projector.setInput(this.dvdPlayer);
        this.dvdPlayer.play(movie);
    }
}
// * client Code * \\
let amplifier = new Amplifier();
let dvdPlayer = new DvdPlayer();
let projector = new Projector();
let lights = new Lights();
let homeTheater = new HomeTheaterFacade(amplifier, dvdPlayer, projector, lights);
homeTheater.watchMovie("Inception", 10, 5);
class WindowsMediaPlayer {
    playAudio() {
        console.log("Playing Audio On Windows Media Player !");
    }
    playVideo() {
        console.log("Playing Video On Windows Media Player !");
    }
}
class MacOsMediaPlayer {
    playAudio() {
        console.log("Playing Audio On MacOS Media Player !");
    }
    playVideo() {
        console.log("Playing Video On MacOS Media Player !");
    }
}
class MediaPlayerAbstraction {
    constructor(implementation) {
        this.implementation = implementation;
    }
}
class AudioPlayer extends MediaPlayerAbstraction {
    playFile() {
        this.implementation.playAudio();
    }
}
class VideoPlayer extends MediaPlayerAbstraction {
    playFile() {
        this.implementation.playVideo();
    }
}
// * client Code * \\
let windowsAudioPlayer = new AudioPlayer(new WindowsMediaPlayer());
windowsAudioPlayer.playFile();
let macOSVideoPlayer = new VideoPlayer(new MacOsMediaPlayer());
macOSVideoPlayer.playFile();
class PostgreSQLDatabase {
    connect() {
        console.log("Connecting To PostgreSql !");
    }
    query(query) {
        console.log(`Executing Query: ${query} !`);
        // detailed implementation
    }
    close() {
        console.log("Closing Connection PostgreSQL !");
    }
}
class MongoDBDatabase {
    connect() {
        console.log("Connecting To MongoDB !");
    }
    query(query) {
        console.log(`Executing Query: ${query} !`);
        // * detailed implementation * \\
    }
    close() {
        console.log("Closing Connection MongoDB !");
    }
}
class DatabaseService {
    constructor(database) {
        this.database = database;
    }
}
class ClientDatabaseService extends DatabaseService {
    fetchData(query) {
        this.database.connect();
        this.database.query(query);
        this.database.close();
    }
}
// * client code * \\
let PostgreService = new ClientDatabaseService(new PostgreSQLDatabase());
PostgreService.fetchData("USERS");
let mongoDbService = new ClientDatabaseService(new MongoDBDatabase());
mongoDbService.fetchData("USERS");
class Developer {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    getname() {
        return this.name;
    }
    getSalary() {
        return this.salary;
    }
    getRole() {
        return "Developer";
    }
}
class Designer {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    getname() {
        return this.name;
    }
    getSalary() {
        return this.salary;
    }
    getRole() {
        return "Designer";
    }
}
class Manager {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
        this.employees = [];
    }
    getname() {
        return this.name;
    }
    getSalary() {
        return this.salary;
    }
    getRole() {
        return "Manager";
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    removeEmployee(employee) {
        const index = this.employees.indexOf(employee);
        if (index !== -1) {
            this.employees.splice(index, 1);
        }
    }
    getEmployees() {
        return this.employees;
    }
}
// Client Code
let dev1 = new Developer("John Doe", 12000);
let dev2 = new Developer("Jane Doe", 15000);
let designer = new Designer("Mark", 10000);
let manager = new Manager("Michael", 25000);
manager.addEmployee(dev1);
manager.addEmployee(dev2);
manager.addEmployee(designer);
console.log(manager);
console.log(manager.getRole());
console.log(manager.getSalary());
console.log(manager.getEmployees()[1].getname());
console.log(manager.getEmployees()[1].getSalary());
class FileComponent {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
    getName() {
        return this.name;
    }
    getSize() {
        return this.size;
    }
}
class Folder {
    constructor(name) {
        this.name = name;
        this.components = [];
    }
    getName() {
        return this.name;
    }
    getSize() {
        return this.components.reduce((total, component) => total + component.getSize(), 0);
    }
    addComponent(component) {
        this.components.push(component);
    }
    removeComponent(component) {
        const index = this.components.indexOf(component);
        if (index !== -1) {
            this.components.splice(index, 1);
        }
    }
    getComponents() {
        return this.components;
    }
}
// * client code * \\
let file1 = new FileComponent("file1.txt", 500);
let file2 = new FileComponent("file2.txt", 800);
let file3 = new FileComponent("file3.txt", 1200);
let folder = new Folder("My Folder");
folder.addComponent(file1);
folder.addComponent(file2);
folder.addComponent(file3);
console.log(`Folder ${folder.getName()}  Contains:`);
folder.getComponents().map((component) => console.log(`- ${component.getName()} With The Size Of ${component.getSize()} Bytes !`));
console.log(`Total Size ${folder.getSize()} !`);
class SimpleCoffee {
    cost() {
        return 10;
    }
    description() {
        return "Simple Coffee";
    }
}
class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
}
class MilkDecorator extends CoffeeDecorator {
    constructor(coffee) {
        super(coffee);
    }
    cost() {
        return this.coffee.cost() + 2;
    }
    description() {
        return `${this.coffee.description()}, with milk`;
    }
}
// * client code * \\
let coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
console.log(`Cost: ${coffee.cost()} !`);
console.log(`Description: ${coffee.description()} !`);
class BaseServer {
    handle(request) {
        console.log("Handling Request: ", request);
    }
}
class ServerRequestDecorator {
    constructor(serverRequest) {
        this.serverRequest = serverRequest;
    }
}
class LoggingMiddleware extends ServerRequestDecorator {
    handle(request) {
        console.log("Logging Request: ", request);
        this.serverRequest.handle(request);
    }
}
class AuthMiddleware extends ServerRequestDecorator {
    handle(request) {
        if (request.isAuthenticated) {
            console.log("Request is authenticated");
            this.serverRequest.handle(request);
        }
        else {
            console.log("UnAuthorized Access !");
        }
    }
}
// Client Code
const request = {
    isAuthenticated: false,
    body: "Hello World !",
};
let server = new BaseServer();
server = new LoggingMiddleware(server);
server = new AuthMiddleware(server);
server.handle(request);
// ! ADAPTER PATTERN ! \\
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    area() {
        return this.width * this.height;
    }
}
class Square {
    constructor(side) {
        this.side = side;
    }
    getSide() {
        return this.side;
    }
    area() {
        return this.side * this.side;
    }
}
class SquareToRectangleAdapter {
    constructor(square) {
        this.square = square;
    }
    getWidth() {
        return this.square.getSide();
    }
    getHeight() {
        return this.square.getSide();
    }
    area() {
        return this.square.area();
    }
}
// * client code * \\
let square = new Square(5);
let adapter = new SquareToRectangleAdapter(square);
console.log(adapter.getHeight());
console.log(adapter.getWidth());
console.log(adapter.area());
console.log(adapter);
// ????????????????????????????????????????????????????????? \\
class MySQLDatabase {
    connectToMySQL(uri) {
        console.log(`Connecting to MySQL at ${uri}`);
        // * implementation * \\
    }
    executeMySQLQuery(query) {
        console.log(`Executing MySQL Query ${query}`);
    }
}
class PostgreSQLDatabase2 {
    connectToPostgreSQL(uri) {
        console.log(`Connecting to PostgreSQL ${uri}`);
    }
    executePostgreSQLQuery(query) {
        console.log(`Executing PostgreSQL Query ${query} !`);
    }
}
class DatabaseAdapter {
    constructor(postgreSQl) {
        this.postgreSQl = postgreSQl;
    }
    connectToMySQL(uri) {
        this.postgreSQl.connectToPostgreSQL(uri);
    }
    executeMySQLQuery(query) {
        this.postgreSQl.executePostgreSQLQuery(query);
    }
}
// * Client Code * \\
let database = new DatabaseAdapter(new PostgreSQLDatabase());
database.connectToMySQL("postgresql://localhost:5432/mydb");
database.executeMySQLQuery("SELECT * FROM * users");
