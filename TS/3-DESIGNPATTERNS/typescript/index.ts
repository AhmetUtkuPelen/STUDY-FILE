// ! SINGLETON PATTERN ! \\


class Singleton{

    private static instance:Singleton

    private static _value :number

    private constructor(){}

    public static getInstance():Singleton{

        if(!Singleton.instance){
            Singleton.instance = new Singleton()
        }

        return Singleton.instance

    }

    set value(value : number){
        Singleton._value = value
    }

    getValue(){
        return Singleton._value
    }

}




let instance1 = Singleton.getInstance()
let instance2 = Singleton.getInstance()

instance1.value = 10

console.log(instance1.value)
console.log(instance2.value)

console.log(instance1 === instance2)










// ????????????????????????????????????????????????????????????????  \\




// Singleton Logger Class
// Log Method
// Can Have Multiple Methods


class Logger{

    private static instance : Logger

    private constructor(){}

    public static getInstance():Logger{

        if(!Logger.instance){
            Logger.instance = new Logger()
        }

        return Logger.instance

    }

    public log(message:string):void {
        const timestamp = new Date()
        console.log(`[${timestamp.toLocaleString()}] - ${message}`)
    }

}




class Application{

    constructor(private logger:Logger){}

    run() : void{
        this.logger.log(`Application Is Up And Running !`)
        this.logger.log(`Application Is Shutting Down !`)
    }

}


let logger = Logger.getInstance()
let app = new Application(logger)

app.run()


// // * new instance * \\
// let logger1 = Logger.getInstance()
// logger1.log(`This Is A Message !`)


// let logger2 = Logger.getInstance()
// logger2.log(`This Is A Message Too !`)











// ! PROTOTYPE PATTERN ! \\



interface UserDetails {

    name : string
    age : number
    email : string

}


interface Prototype{

    clone() : Prototype

    getUserDetails() : UserDetails

}



class ConcretePrototype implements Prototype{

    constructor(private user : UserDetails){}

    public clone() : Prototype{
        const clone = Object.create(this)
        clone.user = {...this.user}
        return clone
    }

    public getUserDetails(): UserDetails {
        return this.user    
    }

}



let user1 = new ConcretePrototype({

    name:"JOHN",
    age:25,
    email:"john@john.com",

})


let user2 = user1.clone()


if(user1 === user2){
    console.log("Both Objects Are Same ! ")
}else{
    console.log("Both Objects Are Different ! ")
}







// ???????????????????????????????????????????????????????????????????? \\



interface ShapeProperties{
    color:string
    x:number
    y:number
}


abstract class Shape{

    constructor(public properties : ShapeProperties){}

    abstract clone() : Shape

}


class Rectangle extends Shape{

    constructor(properties:ShapeProperties,public width:number,public height : number){
        super(properties)
    }

    public clone():Shape{
        let clonedProperties : ShapeProperties = {
            color:this.properties.color,
            x:this.properties.x,
            y:this.properties.y
        }

        return new Rectangle(clonedProperties,this.width,this.height)

    }

}




class Circle extends Shape{

    constructor(properties:ShapeProperties,public radius:number){
        super(properties)
    }

    public clone():Shape{
        let clonedProperties : ShapeProperties = {
            color:this.properties.color,
            x:this.properties.x,
            y:this.properties.y
        }

        return new Circle(clonedProperties,this.radius)

    }

}



let blueRectangle : Shape = new Rectangle({
    color:"blue",
    x:25,
    y:20
},
15,
15
)


let otherRectangle : Shape = blueRectangle.clone()
otherRectangle.properties.color = "red"

console.log(blueRectangle)
console.log(otherRectangle)











// ???????????????????????????????????????????????????????????? \\






let Original = {
    name:"John",
    address:{
        street:"100 Street",
        city:"Texas",
    },
}


let ShallowCopy = {...Original}

ShallowCopy.address.city = "New York"

console.log(ShallowCopy.address.city)
console.log(Original.address.city)



let DeepCopy = JSON.parse(JSON.stringify(Original))

DeepCopy.address.city = "Orlando"

console.log(DeepCopy.address.city)
console.log(Original.address.city)











// ! BUILDER PATTERN ! \\




interface Builder{

    setPartA():void
    setPartB():void
    setPartC():void

}


class Product{

    private parts : string[] = []

    public add(part:string):void{
        this.parts.push(part)
    }

    public ListParts():void{
        console.log(`Product Parts ${this.parts.join(",")}`)
    }

}




class ConcreteBuilder implements Builder{

    private product! : Product 

    constructor(){}

    public reset():void{
        this.product = new Product()
    }

    public setPartA(): void {
        this.product.add("Part A")
    }

    public setPartB(): void {
        this.product.add("Part B")
    }

    public setPartC(): void {
        this.product.add("Part C")
    }

    public GetProduct():Product{
        const result = this.product
        this.reset()
        return result
    }

}


class Director{

    private builder!: Builder

    public setBuilder(builder:Builder):void{
        this.builder = builder
    }

    public buildMinimumProduct():void{
        this.builder.setPartA()
    }

    public buildFullProduct():void{
        this.builder.setPartA()
        this.builder.setPartB()
        this.builder.setPartC()
    }

}



const builder = new ConcreteBuilder()
const director = new Director()

director.setBuilder(builder)

director.buildMinimumProduct()
let minProduct = builder.GetProduct()
console.log(minProduct)


director.buildFullProduct()
let fullProduct = builder.GetProduct()
console.log(fullProduct)





























// ????????????????????????????????????????????????????????? \\


interface ICustomer{
    firstName:string
    lastName:string
    email:string
    phoneNumber:string
}



interface ICustomerBuilder{

    setFirstName(firstName:string):ICustomerBuilder
    setLastName(lastName:string):ICustomerBuilder
    setEmail(email:string):ICustomerBuilder
    setPhoneNumber(phoneNumber:string):ICustomerBuilder
    build():ICustomer

}



class Customer implements ICustomer{

    constructor(public firstName:string,public lastName:string,public email:string,public phoneNumber:string){}

}



class CustomerBuilder implements ICustomerBuilder{

    private firstName : string = ""
    private lastName : string = ""
    private email : string = ""
    private phoneNumber : string = ""

    public setFirstName(firstName : string):ICustomerBuilder{
        this.firstName = firstName
        return this
    }

    public setLastName(lastName : string):ICustomerBuilder{
        this.lastName = lastName
        return this
    }

    public setEmail(email : string):ICustomerBuilder{
        this.email = email
        return this
    }

    public setPhoneNumber(phoneNumber : string):ICustomerBuilder{
        this.phoneNumber = phoneNumber
        return this
    }

    public build():ICustomer{
        return new Customer(this.firstName,this.lastName,this.email,this.phoneNumber)
    }

}



class CustomerDirector{

    constructor(private builder:ICustomerBuilder){}

    public buildMinimalCustomer(firstName:string,lastName:string,email:string){
        return this.builder.setFirstName(firstName).setLastName(lastName).setEmail(email).build()
    }

}


const builder2 : ICustomerBuilder = new CustomerBuilder()

const director2 : CustomerDirector = new CustomerDirector(builder2)

const customer2 : ICustomer = director2.buildMinimalCustomer(
    "John",
    "Doe",
    "johndoe@example.com",
)


console.log(customer2)
















// ! FACTORY PATTERN ! \\



abstract class Car {

    constructor(public model:string,public productionYear:number){}

    abstract DisplayCarInfo():void

}


class FORD extends Car{

    public DisplayCarInfo(): void {
        console.log(`This Is A Ford Car : ${this.model} - This Car Was Produced In ${this.productionYear}`)
    }

}

class PORSCHE extends Car{

    public DisplayCarInfo(): void {
        console.log(`This Is A Porsche Car : ${this.model} - This Car Was Produced In ${this.productionYear}`)
    }

}


class FERRARI extends Car{

    public DisplayCarInfo(): void {
        console.log(`This Is A Ferrari Car : ${this.model} - This Car Was Produced In ${this.productionYear}`)
    }

}




class CarFactory{

    public createCar(type:'FORD' | 'PORSCHE' | 'FERRARI',model:string,productionYear:number):Car{
        switch(type){
            case 'FORD':
                return new FORD (model,productionYear)
            case 'PORSCHE':
                return new PORSCHE(model,productionYear)
            case 'FERRARI':
                return new FERRARI(model,productionYear)
            default:
                throw new Error(`Invalid Car Type !`)
        }
    }

}



const carFactory = new CarFactory()


const ford = carFactory.createCar("FORD","Focus",2020)
ford.DisplayCarInfo()

const porsche = carFactory.createCar("PORSCHE","Jaguar",2019)
porsche.DisplayCarInfo()


const ferrari = carFactory.createCar("FERRARI","XT550",2024)
ferrari.DisplayCarInfo()


























// ????????????????????????????????????????????? \\



abstract class PaymentProcessor{
    
    constructor(public amount : number){}

    abstract processPayment():void

}


class PaypalProcessor extends PaymentProcessor{

    processPayment(): void {
        console.log(`Processing PayPal Payment For ${this.amount} ! `)
    }

}


class StripeProcessor extends PaymentProcessor{

    processPayment(): void {
        console.log(`Processing Stripe Payment For ${this.amount} ! `)
    }

}



class BankTransferProcessor extends PaymentProcessor{

    processPayment(): void {
        console.log(`Processing Bank Transfer Payment For ${this.amount} ! `)
    }

}



class PaymentProcessorFactory {

    public createProcessor(type : 'paypal' | 'stripe' | 'bank' , amount : number){
        switch(type){
            case 'paypal':
                return new PaypalProcessor(amount)
            case'stripe':
                return new StripeProcessor(amount)
            case 'bank':
                return new BankTransferProcessor(amount)
            default:
                throw new Error(`Invalid Payment Processor Type!`)
        }
    }

}



const ProcessorFactory = new PaymentProcessorFactory()


const PaypalPayment = ProcessorFactory.createProcessor('paypal',250)
const StripPayment = ProcessorFactory.createProcessor("stripe", 500)

PaypalPayment.processPayment()
StripPayment.processPayment()

















// ! ABSTRACT FACTORY PATTERN ! \\



interface IProductA {
    operationA(): string
  }
  
  interface IProductB {
    operationB(): string
    combinedOperation(collaborator: IProductA): string
  }
  
  interface IFactory {
    createProductA(): IProductA
    createProductB(): IProductB
  }
  
  class ProductA implements IProductA {
    public operationA(): string {
      return "This Is The Result Of Operation A"
    }
  }
  
  class ProductB implements IProductB {
    public operationB(): string {
      return "This Is The Result Of Operation B"
    }
  
    public combinedOperation(collaborator: IProductA): string {
      const result = collaborator.operationA()
      return `The Result Of Product B Callobrating With (${result})`
    }
  }
  
  class Factory implements IFactory {
    public createProductA(): IProductA {
      return new ProductA()
    }
  
    public createProductB(): IProductB {
      return new ProductB()
    }
  }
  
  //  Client Code
  const factory = new Factory()
  
  const productA = factory.createProductA()
  console.log(productA.operationA())
  
  const productB = factory.createProductB()
  console.log(productB.combinedOperation(productA))
  console.log(productB.operationB())


















// ???????????????????????????????????????????????????? \\



interface Button {
    render(): void
    onClick(f: Function): void
  }
  
  interface Checkbox {
    render(): void
    toggle(): void
  }
  
  interface GUIFactory {
    createButton(): Button
    createCheckbox(button: Button): Checkbox
  }
  
  class WindowsButton implements Button {
    public render(): void {
      console.log("Render a button in Windows Style")
    }
    public onClick(f: Function): void {
      console.log("Windows button was clicked")
      f()
    }
  }
  
  class WindowsCheckbox implements Checkbox {
    constructor(private button: Button) {}
  
    public render(): void {
      console.log("Render a checkbox in Windows Style")
    }
  
    toggle(): void {
      this.button.onClick(() => {
        console.log("Windows checkbox toggled")
      })
    }
  }
  
  class MacOSButton implements Button {
    public render(): void {
      console.log("Render a button in MacOS Style")
    }
    public onClick(f: Function): void {
      console.log("MacOS button was clicked")
      f()
    }
  }
  
  class MacOSCheckbox implements Checkbox {
    constructor(private button: Button) {}
  
    public render(): void {
      console.log("Render a checkbox in MacOS Style")
    }
  
    toggle(): void {
      this.button.onClick(() => {
        console.log("MacOS checkbox toggled")
      })
    }
  }
  
  class WindowsFactory implements GUIFactory {
    public createButton(): Button {
      return new WindowsButton()
    }
    public createCheckbox(button: Button): Checkbox {
      return new WindowsCheckbox(button)
    }
  }
  
  class MacOsFactory implements GUIFactory {
    public createButton(): Button {
      return new MacOSButton()
    }
    public createCheckbox(button: Button): Checkbox {
      return new MacOSCheckbox(button)
    }
  }
  
  // * client Code * \\
  function renderUI(factory: GUIFactory) {
    const button = factory.createButton()
    const checkbox = factory.createCheckbox(button)
  
    button.render()
    checkbox.render()
  
    button.onClick(() => {
      console.log("Button Clicked")
    })
    checkbox.toggle()
  }
  
  renderUI(new WindowsFactory())

  renderUI(new MacOsFactory())


