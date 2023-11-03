// Filename: ComplexProgram.js

// This program is a complex task scheduler that handles various tasks and their dependencies

// Task class represents a single task with its dependencies and execution time
class Task {
  constructor(id, dependencies, executionTime) {
    this.id = id;
    this.dependencies = dependencies;
    this.executionTime = executionTime;
    this.completed = false;
  }
}

// Scheduler class manages the execution of the tasks
class Scheduler {
  constructor() {
    this.tasks = new Map();
    this.executionQueue = [];
  }

  // Add a task to the scheduler
  addTask(task) {
    this.tasks.set(task.id, task);
  }

  // Calculate the execution order for tasks
  calculateExecutionOrder() {
    const visited = new Map();
    for (const task of this.tasks.values()) {
      this.visit(task, visited);
    }

    return visited;
  }

  // Helper function for calculating execution order recursively
  visit(task, visited) {
    visited.set(task.id, true);
    for (const dependency of task.dependencies) {
      if (!visited.get(dependency)) {
        const dependentTask = this.tasks.get(dependency);
        this.visit(dependentTask, visited);
      }
    }

    if (!task.completed) {
      this.executionQueue.push(task);
      task.completed = true;
    }
  }

  // Execute the tasks in the correct order
  execute() {
    let totalTime = 0;

    for (const task of this.executionQueue) {
      console.log(`Executing task ${task.id}`);
      totalTime += task.executionTime;
    }

    console.log(`Total execution time: ${totalTime}ms`);
  }
}

// Create an instance of the Scheduler
const scheduler = new Scheduler();

// Task 1: Download a file (no dependencies, execution time: 50ms)
scheduler.addTask(new Task(1, [], 50));

// Task 2: Process the downloaded file (depends on Task 1, execution time: 100ms)
scheduler.addTask(new Task(2, [1], 100));

// Task 3: Send processed file to a remote server (depends on Task 1, execution time: 150ms)
scheduler.addTask(new Task(3, [1], 150));

// Task 4: Create a backup of the processed file (depends on Task 2 and Task 3, execution time: 200ms)
scheduler.addTask(new Task(4, [2, 3], 200));

// Task 5: Notify the user about the completion (depends on Task 4, execution time: 50ms)
scheduler.addTask(new Task(5, [4], 50));

// Calculate and execute the tasks in the correct order
const executionOrder = scheduler.calculateExecutionOrder();
console.log("Execution Order:", executionOrder);
scheduler.execute();
