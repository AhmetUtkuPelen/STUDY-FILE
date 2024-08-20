// ! SINGLE RESPONSIBILITY ! \\

class User {
    constructor(name:string , email:string){}
}

class userAuthentication{

    constructor(user:User){}

        authenticate(password:string){

            // * implement logic here * \\

        }
}





// ??????????????????????????????????????????????????? \\





class BlogPost {

    title:string
    content:string

    constructor(title:string, content:string){
        this.title = title
        this.content = content
    }

    // ? methods related to manage content ? \\
    CreatePost(){
        // * implement logic here * \\
    }

    UpdatePost(){
        // * implement logic here * \\
    }

    DeletePost(){
        // * implement logic here * \\
    }

    DisplayHtml(){
        return `<h1>${this.title}</h1><p>${this.content}</p>`
    }

}



class BlogPostDisplay{

    constructor(public BlogPost:BlogPost){}

    DisplayHtml(){
        return `<h1>${this.BlogPost}</h1>`
    }

}





class BlogPostJson {

    constructor(public BlogPost:BlogPost){}

    ReturnJson(){
        return {
            title:this.BlogPost.title,
            content:this.BlogPost.content
        }
    }

}





//////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\








// ! OPEN CLOSED PRINCIPLE ! \\

//  regular = 10% => 1
//  premium = 20% => 2
// gold = 30% => 3

// (numbers are loyalty points)







interface Customer {

    GiveDiscount():number

    AddLoyaltyPoints(amountSpent:number):number

}


class RegularCustomer implements Customer{

    GiveDiscount(): number {
        return 10
    }
    
    AddLoyaltyPoints(amountSpent: number): number {
        return amountSpent
    }

}


class PremiumCustomer implements Customer{

    GiveDiscount(): number {
        return 20
    }

    AddLoyaltyPoints(amountSpent: number): number {
        return amountSpent * 2
    }

}


class GoldCustomer implements Customer{

    GiveDiscount(): number {
        return 30
    }

    AddLoyaltyPoints(amountSpent: number): number {
        return amountSpent * 3
    }

}


class Discount{

    GiveDiscount(customer:Customer):number{
        return customer.GiveDiscount()
    }

}


let premiumCustomer : PremiumCustomer = new PremiumCustomer()
let goldCustomer : GoldCustomer = new GoldCustomer()

let discount : Discount = new Discount()


let FinalValue =  discount.GiveDiscount(premiumCustomer)
let FinalValueGoldCustomer = discount.GiveDiscount(goldCustomer)



console.log(FinalValue);
console.log(FinalValueGoldCustomer);





//////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\








// ! LISKOV SUBSTITUTION PRINCIPLE ! \\


abstract class Shape {

    abstract CalculateArea(): number

}


class Rectangle extends Shape {

    constructor(public width:number,public height:number){
        super()
    }

    public CalculateArea(): number {
        return this.width * this.height
    }

}



class Square extends Shape {

    constructor(public side:number){
        super()
    }

    public CalculateArea(): number {
        return this.side * this.side
    }

}





// ?????????????????????????????? \\





function Area(shape:Shape){

    return shape.CalculateArea()

}



let rectangle = new Rectangle(10,15)


let square = new Square(10)



Area(rectangle)
Area(square)










// ????????????????????????????????????????????????????????????????????????? \\



// Payment Processor
//  Credit Card
// Debit Card
// Paypal



abstract class PaymentProcessor{

    abstract processPayment(amount:number):void

}


class CreditCardProcessor extends PaymentProcessor{

    processPayment(amount: number): void {
        console.log(`Processing Credit Card Payment of ${amount}`)
    }

}


class DebitCardProcessor extends PaymentProcessor{

    processPayment(amount: number): void {
        console.log(`Processing Debit Card Payment of ${amount}`)
    }

}


class PaypalProcessor extends PaymentProcessor{

    processPayment(amount: number): void {
        console.log(`Processing Paypal Payment Payment of ${amount}`)
    }

}


class BitcoinProcessor extends PaymentProcessor{

    processPayment(amount: number): void {
        console.log(`Processing Bitcoin Payment Payment of ${amount}`)
    }

}


function ExecutePayment(paymentProcessor:PaymentProcessor,amount:number):void{

    paymentProcessor.processPayment(amount)

}


let creditCardProcessor = new CreditCardProcessor()
let debitCardProcessor = new DebitCardProcessor()
let paypalProcessor = new PaypalProcessor()
let bitcoinProcessor = new BitcoinProcessor()


ExecutePayment(creditCardProcessor,200)
ExecutePayment(debitCardProcessor,150)
ExecutePayment(paypalProcessor,280)
ExecutePayment(bitcoinProcessor,180)









// ! INTERFACE SEGREGATION PRINCIPLE ! \\



interface Printer{
    print(document:Document):void
}

interface Scanner{
    scan(document:Document):void
}

interface FaxMachine{
    fax(document:Document):void
}



class SimplePRinter implements Printer{
    print(document:Document):void{
        console.log(`Printer Machine Is Printing ${document}`)
    }
}



class MultiFunctionPrinter implements Printer,Scanner,FaxMachine {

    print(document: Document): void {
        console.log(`Machine Is Printing ${document}`)
    }

    scan(document: Document): void {
        console.log(`Machine Is Scanning ${document}`)
    }

    fax(document: Document): void {
        console.log(`Machine Is Sending Fax ${document}`)
    }

}










// ????????????????????????????????????????????????????????????????????????? \\






// creating posts
// commenting posts
// sharing posts
// admin user -3
// regular user -2




interface Post{
    title:string,
    content:string,
}


interface Comment{
    title:string,
    content:string,
}



interface PostCreator {

    CreatePost(post:Post):void

}


interface CommentCreator {

    CreateComment(comment:Comment):void

}



interface PostSharer {

    SharePost(post:Post):void

}




class Admin implements PostCreator,CommentCreator,PostSharer{

    CreatePost(post: Post): void {
        console.log(`Created Post By Admin , ${post}`)
    }

    CreateComment(comment: Comment): void {
        console.log(`Created Post By Admin , ${comment}`)
    }

    SharePost(post:Post) : void{
        console.log(`Shared Post By Admin , ${post}`)
    }

}




class RegularUser implements CommentCreator,PostSharer{

    CreateComment(comment: Comment): void {
        console.log(`Created Post By RegularUser , ${comment}`)
    }

    SharePost(post:Post) : void{
        console.log(`Shared Post By RegularUser , ${post}`)
    }

}









// ! DEPENDENCY INVERSION PRINCIPLE ! \\


interface IDatabase{
    save(data:string):void
}


class MySqlDatabase implements IDatabase{

    save(data:string):void{
        console.log(`${data} Is Being Kept By MySql`);
    }

}


class MongoDbDatabase implements IDatabase{

    save(data:string):void{
        console.log(`${data} Is Being Kept By Mongo Db`);
    }

}


class HighLeveLModule{

    constructor(private database:IDatabase){}

    execute(data:string){
        this.database.save(data)
    }

}



let mySql : MySqlDatabase = new MySqlDatabase()

let mongoDb : MongoDbDatabase = new MongoDbDatabase()

let user : HighLeveLModule = new HighLeveLModule(mySql)
user.execute("HELLO")


let post : HighLeveLModule = new HighLeveLModule(mongoDb)
post.execute("NEW POST")