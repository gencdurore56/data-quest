/* 
  Filename: ComplexCode.js
  Content: Complex Code Example
*/

// Define a class called Person
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Define a method to greet the person
  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Define a class called Employee that extends Person
class Employee extends Person {
  constructor(name, age, company) {
    super(name, age);
    this.company = company;
  }

  // Define a method to display employee information
  displayInfo() {
    console.log(`Name: ${this.name}`);
    console.log(`Age: ${this.age}`);
    console.log(`Company: ${this.company}`);
  }
}

// Create instances of the Person class
const person1 = new Person("John Doe", 25);
const person2 = new Person("Jane Smith", 30);

// Create instances of the Employee class
const employee1 = new Employee("Mike Johnson", 35, "ABC Corp");
const employee2 = new Employee("Emily Davis", 28, "XYZ Inc");

// Call the greet method on the Person instances
person1.greet();
person2.greet();

// Call the displayInfo method on the Employee instances
employee1.displayInfo();
employee2.displayInfo();

// Define a function that returns the sum of two numbers
function sum(a, b) {
  return a + b;
}

// Call the sum function
const result = sum(5, 3);
console.log(`The sum is: ${result}`);

// Define an async function that fetches data from an API
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data);
}

// Call the fetchData function
fetchData().catch((error) => console.error(error));

// Define a class to represent a Circle
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  // Define a method to calculate the area of the circle
  calculateArea() {
    return Math.PI * this.radius ** 2;
  }
}

// Create an instance of the Circle class
const circle = new Circle(5);

// Call the calculateArea method on the Circle instance
const area = circle.calculateArea();
console.log(`Area of the circle with radius ${circle.radius} is: ${area}`);

// ... Continue with more complex code logic, functions, classes, etc.

// End of the code