// ! ABSTRACTION ! \\

// shapes
// area - parameter

interface Shape {

  area(): number
  perimeter(): number

}

class Circle implements Shape {

    constructor(private radius: number){}

    area():number{
        return Math.PI * this.radius
    }

    perimeter():number{

        return 2 * Math.PI * this.radius

    }

}


class Rectangle implements Shape {

    constructor(private width:number,private height:number){}

    area():number{
        return this.width * this.height
    }

    perimeter(): number {
        return 2 * (this.width + this.height)
    }

}



function CalculateTotalArea(shape:Shape) : number {

    return shape.area()

}


let circle:Circle = new Circle(5)

let rectangle:Rectangle = new Rectangle(4,6)

console.log("Area Of Circle : ",CalculateTotalArea(circle))
console.log("Area of Rectangle : ",CalculateTotalArea(rectangle))



// ??????????????????????????????????????????????????? \\


// Date class
// Get Current Year
// Get Current Month
// Get Current Date

const now = new Date()

const CurrentYear = now.getFullYear()

const CurrentMonth = now.getMonth() + 1

const CurrentDate = now.getDate()






//////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\






// ! ENCAPSULATION ! \\

// BankAccount
// Depositing
// Withdraw
// Balance - Hidden => 200


class BankAccount {

    private _balance:number

    constructor(initialBalance:number){
        this._balance = initialBalance
    }

    // * Getter To Get The Balance Of Bank Account * \\
    public get Balance():number {
        return this._balance
    }

    // * Method Deposit Monet * \\
    public Deposit(amount:number):void{
        if(amount < 0){
            console.log("Invalid Deposit Amount !")
            return
        }

        this._balance += amount

    }

    // * Method Draw Money * \\
    public Withdraw(amount:number):void{
        if(amount < 0){
            console.log("Invalid Withdraw Amount !")
            return
        }
        if( (this._balance - amount) < 0 ){
            console.log("Insufficient Funds !")
            return
        }

        this._balance -= amount

    }

}


// * my account * \\
const MyAccount = new BankAccount(1000)

MyAccount.Deposit(300)

MyAccount.Withdraw(200)

console.log("Current Balance : ",MyAccount.Balance)





//////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\






// ! POLYMORPHISM ! \\



function identity<T>(value: T): T {
    return value;
  }
  

  const numIdentity: number = identity<number>(42);
  const strIdentity: string = identity<string>("Hello, TypeScript!");
  
  console.log(`Number identity: ${numIdentity}`);
  console.log(`String identity: ${strIdentity}`);
  

  class Pair<T> {
    constructor(public first: T, public second: T) {}
  

    swap(): void {
      const temp = this.first;
      this.first = this.second;
      this.second = temp;
    }
  }
  

  const numPair: Pair<number> = new Pair(1, 2);
  const strPair: Pair<string> = new Pair("Alice", "Bob");
  
  numPair.swap();
  strPair.swap();
  
  console.log(`Number pair after swap: (${numPair.first}, ${numPair.second})`);
  console.log(`String pair after swap: (${strPair.first}, ${strPair.second})`);





  
//////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\






// ! INHERITANCE ! \\


class Animal {

    constructor(public name:string){}

    move(distance:number):void{

        console.log(`${this.name} moved ${distance} meters.`);

    }

}


class Dog extends Animal{

    constructor(public name : string = "DOG"){

        super(name)

    }

}


let MyDog = new Dog("DOG2")


MyDog.move(15)





// ??????????????????????????????????????????????????? \\





class Product {

    constructor(public id:string , public price:number , public description:string){}

    display():void{
        console.log(`ID : ${this.id} , PRICE : ${this.price} , DESCRIPTION : ${this.description}`)
    }

}



class Book extends Product {

    constructor(public id:string , public price:number , public description:string , public title:string , public author : string){

        super(id,price,description)

    }

    display():void{

        super.display()

        console.log(`Author : ${this.author} , Title : ${this.title}`)

    }

}





class Electronic extends Product {

    constructor(public id :string , public price : number , public description : string , public brand : string , public model : string){

        super(id,price , description)

    }

    display():void{

        super.display()

        console.log(`Brand : ${this.brand} , Model : ${this.model}`)

    }

}



let book = new Book ("1",20,"Cool Book" , "John Doe","John's Book")
book.display()


let laptop = new Electronic("2",3000,"A Cool Laptop","Toshiba","CM 500")
laptop.display()