/**
 * SOLID Principles
 * ====================
 * S: Single Responsibility Principle
 * O: Open/Closed Principle
 * L: Liskov Substitution Principle
 * I: Interface Segregation Principle
 * D: Dependency Inversion Principle
 */

// ===============================
// S: Single Responsibility Principle (SRP)
// ===============================

// WRONG WAY: Function doing two tasks: validating and creating a user
// const validateAndCreateUser = (name, password, email) => {
//     const isFormValid = testForm(name, password, email);
//     if (isFormValid) {
//         User.create(name, password, email);
//     }
// };

// CORRECT WAY: Splitting tasks into different functions

const onlyValidate = (name, password, email) => {
    const isFormValid = testForm(name, password, email);
    if (isFormValid) {
        createUser({ name, password, email });
    }
};

const createUser = (req) => {
    console.log(`User created: ${req.name}, ${req.email}`);
    // User.create(req.name, req.password, req.email); // Mocking the User creation for test purposes
};

// Test SRP
const testForm = (name, password, email) => {
    return name && password && email; // Simple validation check
};
onlyValidate("Praveen", "admin123", "praveen@example.com"); // Output: User created

// ===============================
// O: Open/Closed Principle (OCP)
// ===============================

// WRONG WAY: Modifying the function directly to add a new role
// const roles = ["ADMIN", "USER"];
// const checkRole = (users) => {
//     return roles.includes(users.role);
// };

// CORRECT WAY: We extend the system by adding new roles without modifying the original code
const roles = ["ADMIN", "USER"];

const checkRole = (user) => {
    return roles.includes(user.role);
};

const addRole = (role) => {
    roles.push(role);
};

// Test OCP
addRole("RAM");
console.log(checkRole({ role: "ADMIN" })); // True
console.log(checkRole({ role: "RAM" }));   // True

// ===============================
// L: Liskov Substitution Principle (LSP)
// ===============================

// WRONG WAY: Bird class assumes all birds can fly, which is not true for Penguins
// class Bird {
//     fly() {
//         console.log("Flying...");
//     }
// }

// class Penguin extends Bird {
//     // Penguins cannot fly, but are forced to inherit the fly() method
// }

// CORRECT WAY: Refactor the base class to make sure it only contains shared methods
class Bird {
    layEgg() {
        console.log("Laying an egg...");
    }
}

class FlyingBird extends Bird {
    fly() {
        console.log("Flying...");
    }
}

class SwimmingBird extends Bird {
    swim() {
        console.log("Swimming...");
    }
}

// Test LSP
const eagle = new FlyingBird();
eagle.fly(); // Output: Flying...

const penguin = new SwimmingBird();
penguin.swim(); // Output: Swimming...
penguin.layEgg(); // Output: Laying an egg...

// ===============================
// I: Interface Segregation Principle (ISP)
// ===============================

// WRONG WAY: Doing unnecessary validation for every user, even if it is not required
// class User {
//     constructor(username, password) {
//         this.username = username;
//         this.password = password;
//         this.initiateUser();
//     }
//     initiateUser() {
//         this.validateUser(this.username, this.password);
//     }
//     validateUser(username, password) {
//         console.log("Validating user...");
//     }
// }

// CORRECT WAY: Only validate if needed by passing a flag
class User {
    constructor(username, password, validate) {
        this.username = username;
        this.password = password;
        if (validate) {
            this.initiateUser();
        } else {
            console.log("No validation required.");
        }
    }

    initiateUser() {
        this.validateUser();
    }

    validateUser() {
        console.log("Validating user...");
    }
}

// Test ISP
const userWithValidation = new User("Praveen", "admin123", true);  // Output: Validating user...
const userWithoutValidation = new User("John", "doe123", false);  // Output: No validation required.

// ===============================
// D: Dependency Inversion Principle (DIP)
// ===============================

// WRONG WAY: Tightly coupled Car class
// class PetrolCar {
//     start() {
//         return "Car running on petrol!";
//     }
// }
// class DieselCar {
//     start() {
//         return "Car running on diesel!";
//     }
// }
// class Car {
//     constructor() {
//         this.petrolCar = new PetrolCar();
//     }
//     drivePetrolCar() {
//         console.log(this.petrolCar.start());
//     }
// }
// const car = new Car();
// car.drivePetrolCar();
// the Car class is tightly coupled with the specific fuel types, making it difficult to extend and modify.

// CORRECT WAY: Loosely coupled with Dependency Injection
class Petrol {
    getEnergy() {
        return "Car running on petrol!";
    }
}

class Diesel {
    getEnergy() {
        return "Car running on diesel!";
    }
}

class CNG {
    getEnergy() {
        return "Car running on CNG!";
    }
}

class Car {
    constructor(fuel) {
        this.fuel = fuel;
    }

    drive() {
        console.log(this.fuel.getEnergy());
    }
}

// Test DIP
const petrolCar = new Car(new Petrol());
petrolCar.drive(); // Output: Car running on petrol!

const dieselCar = new Car(new Diesel());
dieselCar.drive(); // Output: Car running on diesel!

const cngCar = new Car(new CNG());
cngCar.drive(); // Output: Car running on CNG!


// Key Highlights:
// Single Responsibility Principle (SRP): The onlyValidate and createUser functions are split, ensuring each does only one job.
// Open/Closed Principle (OCP): You can extend the roles by adding them via addRole without changing the logic of checkRole.
// Liskov Substitution Principle (LSP): The Bird class is refactored into FlyingBird and SwimmingBird so that classes extend functionality as needed.
// Interface Segregation Principle (ISP): The User class only validates if necessary by passing a flag.
// Dependency Inversion Principle (DIP): The Car class is decoupled from specific fuel types, making it flexible and open for future fuel types.