
// ===============================
// 1: Singleton Pattern
// ===============================
// Ensures a class has only one instance and provides a global point of access to that instance.
// When to use: When exactly one instance of a class is needed throughout the lifecycle of the application (e.g., logging, database connections).

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


// ===============================
// 2. Factory Pattern
// ===============================
// A pattern used to create objects without specifying the exact class of object that will be created.
// A creational pattern that provides an interface for creating objects in a super class but allows subclasses to alter the type of objects that will be created.
// When to use: When you need to create objects without specifying the exact class of object that will be created.

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
// 3. Observer Pattern
// ===============================

// This pattern defines a one-to-many relationship where a change in one object triggers updates to its observers.
// When to use: When changes in one object need to be propagated to other dependent objects (e.g., event handling systems).

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


// ===============================
// 4. Strategy Pattern
// ===============================
// Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
// When to use: When you have multiple algorithms for a specific task and want to switch between them dynamically.

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

// ===============================
// 5. Decorator Pattern
// ===============================
// Allows behavior to be added to individual objects, dynamically, without affecting other objects from the same class.
// When to use: When you want to add responsibilities to objects dynamically and transparently.

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

// ===============================
// 6. Adapter Pattern
// ===============================

// Allows objects with incompatible interfaces to collaborate.
// When to use: When you want to use an existing class, but its interface is incompatible with the rest of your code.

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


// ===============================
// 7. Command Pattern
// ===============================
// Encapsulates a request as an object, thereby allowing for parameterizing clients with different requests.
// When to use: When you need to parameterize methods with different requests, delay or queue requests, and support undoable operations.

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