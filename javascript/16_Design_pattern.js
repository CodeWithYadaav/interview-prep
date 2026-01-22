
/*
 ===============================
 1: Singleton Pattern
 ===============================
 The Singleton Pattern ensures that a class has only one instance and provides a global point of access to that instance.
 
 When to use: This pattern is ideal when exactly one instance of a class is needed throughout the lifecycle of the application,
 such as in cases like logging, database connections, configuration settings, or thread pools.

 Key Points to Keep in Mind:
 - **Global Access**: The Singleton instance can be accessed globally, making it convenient for shared resources.
 - **Lazy Initialization**: The instance can be created only when it is needed, which can save resources.
 - **Controlled Access**: By controlling the creation of the instance, you can ensure that the system behaves predictably.

 Cons:
 - **Single Responsibility Principle Violation**: The Singleton may hold too much responsibility, making it hard to test and maintain.
 - **Hidden Dependencies**: Other parts of the code might become tightly coupled to the Singleton, making testing and debugging difficult.
 - **Concurrency Issues**: In a multi-threaded environment, care must be taken to ensure that the singleton instance is thread-safe.
*/


class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance; // Return existing instance if already created
        }
        this.data = [];  // Initialize an empty array to store data
        Singleton.instance = this;  // Store the instance
    }

    addData(item) {
        this.data.push(item);  // Method to add data to the array
    }

    getData() {
        return this.data;  // Method to get the stored data
    }
}

// Usage of Singleton
const singleton1 = new Singleton();
singleton1.addData("Item 1");

const singleton2 = new Singleton();
singleton2.addData("Item 2");

console.log(singleton1.getData());  // Output: ['Item 1', 'Item 2']
console.log(singleton1 === singleton2);  // Output: true (both variables point to the same instance)


/*
 ===============================
 2: Factory Pattern
 ===============================
 The Factory Pattern is a creational design pattern that allows for the creation of objects without specifying their exact class.
 It provides an interface for creating objects, enabling subclasses to decide which class to instantiate.

 When to use: Use this pattern when you want flexibility in object creation, allowing for easy extension.

 Key Points:
 - **Decoupling**: Separates the creation of objects from their usage, promoting maintainability.
 - **Open/Closed Principle**: You can add new object types without modifying existing code.
 - **Centralized Control**: All object creation logic is in one place, simplifying management.

 Cons:
 - **Complexity**: Can make the code more complex, especially for simple cases.
 - **Overhead**: May introduce unnecessary abstraction.
 - **Debugging**: Can complicate debugging since instantiation is hidden.

 Example:
 This example demonstrates a factory for creating different types of vehicles.

*/
class Car {
    constructor(name) {
        this.name = name;  // Car name
    }
}

class CarFactory {
    createCar(type) {
        if (type === "sedan") return new Car("Sedan");
        if (type === "suv") return new Car("SUV");
        if (type === "hatchback") return new Car("Hatchback");
    }
}

// Usage of Factory Pattern
const factory = new CarFactory();
const sedan = factory.createCar("sedan");
console.log(sedan.name);  // Output: Sedan

// ===============================
// ###Another example
// ===============================
class Vehicle {
    constructor(name) {
        this.name = name; // Name of the vehicle
    }
    
    drive() {
        console.log(`${this.name} is driving.`);
    }
}

class Car extends Vehicle {
    constructor(name) {
        super(name); // Call the parent constructor
    }
}

class Truck extends Vehicle {
    constructor(name) {
        super(name); // Call the parent constructor
    }
}

class VehicleFactory {
    // Factory method to create vehicles based on type
    createVehicle(type, name) {
        switch (type) {
            case 'car':
                return new Car(name); // Return a new Car instance
            case 'truck':
                return new Truck(name); // Return a new Truck instance
            default:
                throw new Error('Vehicle type not supported'); // Handle unsupported types
        }
    }
}

// Usage of the Factory Pattern
const factoryy = new VehicleFactory(); // Create a new factory instance

const myCar = factoryy.createVehicle('car', 'Toyota'); // Create a car
const myTruck = factoryy.createVehicle('truck', 'Ford'); // Create a truck

myCar.drive(); // Output: Toyota is driving.
myTruck.drive(); // Output: Ford is driving.


 
/*
 ===============================
 3: Observer Pattern
 ===============================
 The Observer Pattern defines a one-to-many relationship between objects, where a change in one object (the subject) 
 triggers updates to all its observers.

 When to use: Use this pattern when you want changes in one object to automatically notify and update dependent objects, 
 such as in event handling systems.

 Key Points:
 - **Decoupling**: Subjects and observers are loosely coupled, allowing them to change independently.
 - **Dynamic Relationships**: Observers can be added or removed at runtime, providing flexibility.
 - **Broadcast Communication**: The pattern facilitates a publish-subscribe model for event-driven architectures.

 Cons:
 - **Memory Leaks**: If observers are not properly removed, it may lead to memory leaks.
 - **Complexity**: Managing many observers can increase complexity and make the system harder to understand.
 - **Performance**: Notifying a large number of observers can lead to performance issues.

 Example:
 This example illustrates the Observer Pattern with a simple subject and observer setup.

*/

class Subject {
    constructor() {
        this.observers = [];  // Array to store observers
    }

    subscribe(observer) {
        this.observers.push(observer);  // Add observer to the list
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);  // Remove observer from the list
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));  // Notify all observers
    }
}

class Observer {
    constructor(name) {
        this.name = name;  // Observer's name
    }

    update(data) {
        console.log(`${this.name} received data: ${data}`);
    }
}

// Usage of Observer Pattern
const subject = new Subject();
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify("Hello Observers!");  // Both observers will receive the data


/*
 ===============================
 4: Strategy Pattern
 ===============================
 The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable, allowing 
 the client to choose the appropriate algorithm at runtime.

 When to use: Use this pattern when you have multiple algorithms for a specific task and want to switch between them dynamically 
 based on client needs or conditions.

 Key Points:
 - **Encapsulation**: Each algorithm is encapsulated in its own class, promoting separation of concerns.
 - **Flexibility**: Easily switch algorithms at runtime without altering the context that uses them.
 - **Open/Closed Principle**: New strategies can be added without changing existing code, adhering to the open/closed principle.

 Cons:
 - **Increased Complexity**: Introducing multiple strategy classes can complicate the code structure.
 - **Communication Overhead**: Strategies may need to communicate with the context, adding complexity.

 Example:
 The following example demonstrates the Strategy Pattern with different sorting strategies.

*/

class StrategyContext {
    setStrategy(strategy) {
        this.strategy = strategy;  // Set the current strategy
    }

    executeStrategy(a, b) {
        return this.strategy.execute(a, b);  // Execute the current strategy
    }
}

class AddStrategy {
    execute(a, b) {
        return a + b;  // Adding two numbers
    }
}

class MultiplyStrategy {
    execute(a, b) {
        return a * b;  // Multiplying two numbers
    }
}

// Usage of Strategy Pattern
const context = new StrategyContext();

context.setStrategy(new AddStrategy());
console.log(context.executeStrategy(5, 3));  // Output: 8

context.setStrategy(new MultiplyStrategy());
console.log(context.executeStrategy(5, 3));  // Output: 15

/*
 ===============================
 5: Decorator Pattern
 ===============================
 The Decorator Pattern allows behavior to be added to individual objects dynamically, without affecting other objects 
 from the same class. This pattern provides a flexible alternative to subclassing for extending functionality.

 When to use: Use this pattern when you want to add responsibilities to objects dynamically and transparently, 
 without modifying their structure.

 Key Points:
 - **Flexibility**: You can add or remove decorations (responsibilities) at runtime.
 - **Single Responsibility Principle**: Each decorator focuses on a specific responsibility, promoting cleaner code.
 - **Composability**: Multiple decorators can be combined to enhance an object's behavior.

 Cons:
 - **Complexity**: The number of classes may increase, leading to a more complex design.
 - **Debugging Difficulty**: It can be harder to trace through the layers of decorators to understand the final behavior.

 Example:
 The following example demonstrates the Decorator Pattern with a simple coffee ordering system.

*/

class SimpleCoffee {
    cost() {
        return 5;  // Base cost of coffee
    }
}

class MilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;  // Coffee object being decorated
    }

    cost() {
        return this.coffee.cost() + 2;  // Add cost of milk to the coffee
    }
}

class SugarDecorator {
    constructor(coffee) {
        this.coffee = coffee;  // Coffee object being decorated
    }

    cost() {
        return this.coffee.cost() + 1;  // Add cost of sugar to the coffee
    }
}

// Usage of Decorator Pattern
let coffee = new SimpleCoffee();
console.log(coffee.cost());  // Output: 5

coffee = new MilkDecorator(coffee);
console.log(coffee.cost());  // Output: 7 (coffee + milk)

coffee = new SugarDecorator(coffee);
console.log(coffee.cost());  // Output: 8 (coffee + milk + sugar)

/*
 ===============================
 6: Adapter Pattern
 ===============================
 The Adapter Pattern allows objects with incompatible interfaces to work together. It acts as a bridge between two incompatible interfaces.

 When to use: Use this pattern when you need to integrate a class that is incompatible with the rest of your code but cannot modify its source code.

 Key Points:
 - **Compatibility**: It enables the integration of different systems that would otherwise be incompatible.
 - **Flexibility**: You can adapt classes to work together without modifying their source code.
 - **Code Reusability**: Existing classes can be reused in different contexts.

 Cons:
 - **Complexity**: Introducing an adapter can add complexity to the system.
 - **Performance Overhead**: The additional layer can lead to slight performance hits in certain cases.
 - **Debugging Difficulty**: It might complicate debugging, as the flow is altered by the adapter.

 Example:
 The following example demonstrates the Adapter Pattern in a simple media player scenario.

*/

class OldSystem {
    getData() {
        return "Old Data";  // Old system's method
    }
}

class NewSystem {
    fetchData() {
        return "New Data";  // New system's method
    }
}

class Adapter {
    constructor() {
        this.newSystem = new NewSystem();  // Create an instance of NewSystem
    }

    getData() {
        return this.newSystem.fetchData();  // Adapter converts method names
    }
}

// Usage of Adapter Pattern
const adapter = new Adapter();
console.log(adapter.getData());  // Output: New Data


/*
 ===============================
 7: Command Pattern
 ===============================
 The Command Pattern encapsulates a request as an object, allowing you to parameterize clients with different requests. This pattern also enables queuing and undoable operations.

 When to use: Use this pattern when you need to:
 - Parameterize methods with different requests.
 - Delay or queue requests for later execution.
 - Support undoable operations.

 Key Points:
 - **Decoupling**: The sender of a request is decoupled from the receiver, promoting loose coupling.
 - **Flexibility**: You can easily add new commands without changing existing code.
 - **History Management**: It allows for operations like undo, redo, or logging of operations.

 Cons:
 - **Complexity**: Introducing commands can increase system complexity, especially if overused.
 - **Number of Classes**: It may lead to a proliferation of command classes for different requests.
 - **Maintenance Overhead**: Managing many command objects can become cumbersome.

 Example:
 The following example demonstrates the Command Pattern with a simple remote control scenario.

*/

class Command {
    execute() {}
}

class Light {
    turnOn() {
        console.log("Light is ON");  // Turn on the light
    }

    turnOff() {
        console.log("Light is OFF");  // Turn off the light
    }
}

class LightOnCommand extends Command {
    constructor(light) {
        super();
        this.light = light;  // Store reference to the Light
    }

    execute() {
        this.light.turnOn();  // Turn the light on
    }
}

class LightOffCommand extends Command {
    constructor(light) {
        super();
        this.light = light;  // Store reference to the Light
    }

    execute() {
        this.light.turnOff();  // Turn the light off
    }
}

// Usage of Command Pattern
const light = new Light();
const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);

lightOnCommand.execute();  // Output: Light is ON
lightOffCommand.execute();  // Output: Light is OFF


// Summary

// Singleton – Ensures a class has only one instance.
// Factory – Creates objects without specifying the exact class.
// Observer – Notifies multiple objects when a state changes.
// Strategy – Allows selecting an algorithm at runtime.
// Decorator – Adds functionality to objects dynamically.
// Adapter – Makes incompatible interfaces work together.
// Command – Encapsulates requests as objects.