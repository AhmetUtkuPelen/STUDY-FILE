// ! FACADE PATTERN ! \\



class Grinder {
    public grindBeads(): void {
      console.log("Grinding Beans ...")
    }
  }
  
  class Boiler {
    public boilWater(): void {
      console.log("Boiling Water ...")
    }
  }
  
  class Brewer {
    public brewCoffee(): void {
      console.log("Brewing Coffee ...")
    }
  }
  
  class CoffeeMakerFacade {
    constructor(
      private grinder: Grinder,
      private boiler: Boiler,
      private brewer: Brewer
    ) {}
  
    public makeCoffee() {
      this.grinder.grindBeads()
      this.boiler.boilWater()
      this.brewer.brewCoffee()
      console.log("The Coffee is ready")
    }
  }
  
  // Client code
  let grinder = new Grinder()
  let boiler = new Boiler()
  let brewer = new Brewer()
  
  let coffeeMaker = new CoffeeMakerFacade(grinder, boiler, brewer)

  coffeeMaker.makeCoffee()









// ???????????????????????????????????????????????????????????????? \\






class Amplifier {
    public turnOn(): void {
      console.log("Amplifier Is Turned On !")
    }
  
    public setVolume(level: number): void {
      console.log(`Volume Is Set To ${level}`)
    }
  }
  
  class DvdPlayer {
    public turnOn(): void {
      console.log("The DVD Player Is Tuned On !")
    }
  
    public play(movie: string) {
      console.log(`Playing ${movie} !`)
    }
  }
  
  class Projector {
    public turnOn(): void {
      console.log("Projector Is Turned On !")
    }
  
    public setInput(dvdPlayer: DvdPlayer): void {
      console.log("Input Set To DvdPlayer !")
    }
  }
  
  class Lights {
    public dim(level: number): void {
      console.log(`Lights Dimmed To ${level}`)
    }
  }
  
  class HomeTheaterFacade {
    constructor(
      private amplifier: Amplifier,
      private dvdPlayer: DvdPlayer,
      private projector: Projector,
      private lights: Lights
    ) {}
  
    public watchMovie(movie: string, volume: number, level: number) {
      console.log(`Get Ready To Watch ${movie}`)
      this.lights.dim(level)
      this.amplifier.turnOn()
      this.amplifier.setVolume(volume)
      this.dvdPlayer.turnOn()
      this.projector.turnOn()
      this.projector.setInput(this.dvdPlayer)
      this.dvdPlayer.play(movie)
    }
  }
  
  // * client Code * \\
  let amplifier = new Amplifier()
  let dvdPlayer = new DvdPlayer()
  let projector = new Projector()
  let lights = new Lights()
  
  let homeTheater = new HomeTheaterFacade(
    amplifier,
    dvdPlayer,
    projector,
    lights
  )
  
  homeTheater.watchMovie("Inception", 10, 5)













// ! BRIDGE PATTERN ! \\




interface MediaPlayerImplementation {
    playAudio(): void
    playVideo(): void
  }
  
  class WindowsMediaPlayer implements MediaPlayerImplementation {
    public playAudio(): void {
      console.log("Playing Audio On Windows Media Player !")
    }
  
    public playVideo(): void {
      console.log("Playing Video On Windows Media Player !")
    }
  }
  
  class MacOsMediaPlayer implements MediaPlayerImplementation {
    public playAudio(): void {
      console.log("Playing Audio On MacOS Media Player !")
    }
  
    public playVideo(): void {
      console.log("Playing Video On MacOS Media Player !")
    }
  }
  
  abstract class MediaPlayerAbstraction {
    constructor(protected implementation: MediaPlayerImplementation) {}
  
    abstract playFile(): void
  }
  
  class AudioPlayer extends MediaPlayerAbstraction {
    public playFile(): void {
      this.implementation.playAudio()
    }
  }
  
  class VideoPlayer extends MediaPlayerAbstraction {
    public playFile(): void {
      this.implementation.playVideo()
    }
  }
  
  // * client Code * \\
  let windowsAudioPlayer = new AudioPlayer(new WindowsMediaPlayer())
  windowsAudioPlayer.playFile()
  
  let macOSVideoPlayer = new VideoPlayer(new MacOsMediaPlayer())
  macOSVideoPlayer.playFile()










// ??????????????????????????????????????????????????????????????? \\




interface Database {
    connect(): void
    query(query: string): void
    close(): void
  }
  
  class PostgreSQLDatabase implements Database {
    public connect(): void {
      console.log("Connecting To PostgreSql !")
    }
    public query(query: string): void {
      console.log(`Executing Query: ${query} !`)
      // detailed implementation
    }
  
    public close(): void {
      console.log("Closing Connection PostgreSQL !")
    }
  }
  
  class MongoDBDatabase implements Database {
    public connect(): void {
      console.log("Connecting To MongoDB !")
    }
    public query(query: string): void {
      console.log(`Executing Query: ${query} !`)
      // * detailed implementation * \\
    }
  
    public close(): void {
      console.log("Closing Connection MongoDB !")
    }
  }
  
  abstract class DatabaseService {
    constructor(protected database: Database) {}
  
    abstract fetchData(query: string): void
  }
  
  class ClientDatabaseService extends DatabaseService {
    public fetchData(query: string): void {
      this.database.connect()
      this.database.query(query)
      this.database.close()
    }
  }
  
  // * client code * \\
  let PostgreService = new ClientDatabaseService(new PostgreSQLDatabase())
  PostgreService.fetchData("USERS")
  
  let mongoDbService = new ClientDatabaseService(new MongoDBDatabase())
  mongoDbService.fetchData("USERS")











// ! COMPOSITE PATTERN ! \\





interface Employee {
    getname(): string
    getSalary(): number
    getRole(): string
  }
  
  class Developer implements Employee {
    constructor(private name: string, private salary: number) {}
    public getname(): string {
      return this.name
    }
  
    public getSalary(): number {
      return this.salary
    }
  
    public getRole(): string {
      return "Developer"
    }
  }
  
  class Designer implements Employee {
    constructor(private name: string, private salary: number) {}
    public getname(): string {
      return this.name
    }
  
    public getSalary(): number {
      return this.salary
    }
  
    public getRole(): string {
      return "Designer"
    }
  }
  
  // Composite
  interface CompositeEmployee extends Employee {
    addEmployee(employee: Employee): void
    removeEmployee(employee: Employee): void
    getEmployees(): Employee[]
  }
  
  class Manager implements CompositeEmployee {
    private employees: Employee[] = []
    constructor(private name: string, private salary: number) {}
  
    public getname(): string {
      return this.name
    }
  
    public getSalary(): number {
      return this.salary
    }
  
    public getRole(): string {
      return "Manager"
    }
  
    public addEmployee(employee: Employee): void {
      this.employees.push(employee)
    }
  
    public removeEmployee(employee: Employee): void {
      const index = this.employees.indexOf(employee)
      if (index !== -1) {
        this.employees.splice(index, 1)
      }
    }
    public getEmployees(): Employee[] {
      return this.employees
    }
  }
  
  // Client Code
  let dev1 = new Developer("John Doe", 12000)
  let dev2 = new Developer("Jane Doe", 15000)
  let designer = new Designer("Mark", 10000)
  
  let manager = new Manager("Michael", 25000)
  manager.addEmployee(dev1)
  manager.addEmployee(dev2)
  manager.addEmployee(designer)
  
  console.log(manager)
  console.log(manager.getRole())
  console.log(manager.getSalary())
  console.log(manager.getEmployees()[1].getname())
  console.log(manager.getEmployees()[1].getSalary())






// ????????????????????????????????????????????????????????????? \\





interface FileSystemComponent {
    getName(): string
    getSize(): number
  }
  
  class FileComponent implements FileSystemComponent {
    constructor(private name: string, private size: number) {}
  
    public getName(): string {
      return this.name
    }
  
    public getSize(): number {
      return this.size
    }
  }
  
  interface CompositeFileSystemComponent extends FileSystemComponent {
    addComponent(component: FileSystemComponent): void
    removeComponent(component: FileSystemComponent): void
    getComponents(): FileSystemComponent[]
  }
  
  class Folder implements CompositeFileSystemComponent {
    private components: FileSystemComponent[] = []
    constructor(private name: string) {}
  
    public getName(): string {
      return this.name
    }
  
    public getSize(): number {
      return this.components.reduce(
        (total, component) => total + component.getSize(),
        0
      )
    }
  
    public addComponent(component: FileSystemComponent): void {
      this.components.push(component)
    }
  
    public removeComponent(component: FileSystemComponent): void {
      const index = this.components.indexOf(component)
      if (index !== -1) {
        this.components.splice(index, 1)
      }
    }
  
    public getComponents(): FileSystemComponent[] {
      return this.components
    }
  }
  
  // * client code * \\
  let file1 = new FileComponent("file1.txt", 500)
  let file2 = new FileComponent("file2.txt", 800)
  let file3 = new FileComponent("file3.txt", 1200)
  
  let folder = new Folder("My Folder")
  folder.addComponent(file1)
  folder.addComponent(file2)
  folder.addComponent(file3)
  
  console.log(`Folder ${folder.getName()}  Contains:`)
  folder.getComponents().map((component) =>
      console.log(
        `- ${component.getName()} With The Size Of ${component.getSize()} Bytes !`
      )
    )
  
  console.log(`Total Size ${folder.getSize()} !`)














// ! DECORATOR PATTERN ! \\



interface Coffee {
    cost(): number
    description(): string
  }
  
  class SimpleCoffee implements Coffee {
    public cost(): number {
      return 10
    }
  
    public description(): string {
      return "Simple Coffee"
    }
  }
  
  abstract class CoffeeDecorator implements Coffee {
    constructor(protected coffee: Coffee) {}
  
    abstract cost(): number
    abstract description(): string
  }
  
  class MilkDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
      super(coffee)
    }
    public cost(): number {
      return this.coffee.cost() + 2
    }
  
    public description(): string {
      return `${this.coffee.description()}, with milk`
    }
  }
  
  // * client code * \\
  let coffee: Coffee = new SimpleCoffee()
  coffee = new MilkDecorator(coffee)
  
  console.log(`Cost: ${coffee.cost()} !`)
  console.log(`Description: ${coffee.description()} !`)







// ??????????????????????????????????????????????????????? \\







interface ServerRequest {
    handle(request: any): void
  }
  
  class BaseServer implements ServerRequest {
    public handle(request: any): void {
      console.log("Handling Request: ", request)
    }
  }
  
  abstract class ServerRequestDecorator implements ServerRequest {
    constructor(protected serverRequest: ServerRequest) {}
  
    abstract handle(request: any): void
  }
  
  class LoggingMiddleware extends ServerRequestDecorator {
    public handle(request: any): void {
      console.log("Logging Request: ", request)
      this.serverRequest.handle(request)
    }
  }
  
  class AuthMiddleware extends ServerRequestDecorator {
    public handle(request: any): void {
      if (request.isAuthenticated) {
        console.log("Request is authenticated")
        this.serverRequest.handle(request)
      } else {
        console.log("UnAuthorized Access !")
      }
    }
  }
  
  // Client Code
  
  const request = {
    isAuthenticated: false,
    body: "Hello World !",
  }
  
  let server: ServerRequest = new BaseServer()
  server = new LoggingMiddleware(server)
  server = new AuthMiddleware(server)
  server.handle(request)












// ! ADAPTER PATTERN ! \\



class Rectangle {
    constructor(private width: number, private height: number) {}
  
    public getWidth(): number {
      return this.width
    }
  
    public getHeight(): number {
      return this.height
    }
  
    public area(): number {
      return this.width * this.height
    }
  }
  
  class Square {
    constructor(private side: number) {}
  
    public getSide(): number {
      return this.side
    }
  
    public area(): number {
      return this.side * this.side
    }
  }
  
  class SquareToRectangleAdapter {
    constructor(private square: Square) {}
  
    public getWidth(): number {
      return this.square.getSide()
    }
  
    public getHeight(): number {
      return this.square.getSide()
    }
  
    public area(): number {
      return this.square.area()
    }
  }
  
  // * client code * \\

  let square = new Square(5)
  let adapter = new SquareToRectangleAdapter(square)
  
  console.log(adapter.getHeight())
  console.log(adapter.getWidth())
  console.log(adapter.area())
  console.log(adapter)











// ????????????????????????????????????????????????????????? \\



class MySQLDatabase {
    public connectToMySQL(uri: string): void {
      console.log(`Connecting to MySQL at ${uri}`)
      // * implementation * \\
    }
  
    public executeMySQLQuery(query: string): void {
      console.log(`Executing MySQL Query ${query}`)
    }
  }
  
  class PostgreSQLDatabase2 {
    public connectToPostgreSQL(uri: string): void {
      console.log(`Connecting to PostgreSQL ${uri}`)
    }
  
    public executePostgreSQLQuery(query: string): void {
      console.log(`Executing PostgreSQL Query ${query} !`)
    }
  }
  
  class DatabaseAdapter {
    constructor(private postgreSQl: PostgreSQLDatabase) {}
  
    public connectToMySQL(uri: string): void {
      this.postgreSQl.connectToPostgreSQL(uri)
    }
  
    public executeMySQLQuery(query: string): void {
      this.postgreSQl.executePostgreSQLQuery(query)
    }
  }
  
  // * Client Code * \\
  let database = new DatabaseAdapter(new PostgreSQLDatabase())
  database.connectToMySQL("postgresql://localhost:5432/mydb")
  database.executeMySQLQuery("SELECT * FROM * users")





