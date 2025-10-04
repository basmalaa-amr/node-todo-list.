const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let todos = [];

function main() {
  rl.question("What do you want to do? (add / delete / completed / show): ", (answer) => {
    let answerr = answer.toLowerCase();
    switch (answerr) {
      case "add":
        rl.question("Enter your task: ", (task) => {
          addTodo(task);
          askAgain();
        });
        break;
      case "show":
        showTodos();
        askAgain();
        break;
      case "delete":
        rl.question("Enter the id you want to delete: ", (idd) => {
          deleteTodo(idd);
          askAgain();
        });
        break;
      case "completed":
        rl.question("Enter the id you want to mark as complete: ", (idd) => {
          markCompleted(idd);
          askAgain();
        });
        break;
      default:
        console.log("Invalid option");
        askAgain();
    }
  });
}

function askAgain() {
  rl.question("Do you want to continue? (yes/no): ", (ans) => {
    if (ans.toLowerCase() === "yes") {
      main();
    } else {
      console.log("Goodbye!");
      rl.close();
    }
  });
}

function addTodo(task) {
  let newTodo = {
    id: todos.length + 1,
    text: task,
    completed: false,
  };
  todos.push(newTodo);
  console.log(`Added: "${task}"`);
}

function showTodos() {
  if (todos.length === 0) {
    console.log("No tasks yet.");
    return;
  }
  todos.forEach((task) => {
    let status = task.completed ? "done" : "not yet";
    console.log(`Task no. ${task.id}: ${task.text} ${status}`);
  });
}

function deleteTodo(idd) {
  const id = Number(idd);
  let index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    console.log(`Task no. ${todos[index].id} deleted`);
    todos.splice(index, 1);
    updateIds();
  } else {
    console.log("Task not found");
  }
}

function markCompleted(idd) {
  const id = Number(idd);
  let todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = true;
    console.log(`Task no. ${id} marked as completed ✅`);
  } else {
    console.log("Task not found");
  }
}

function updateIds() {
  todos.forEach((todo, idx) => {
    todo.id = idx + 1;
  });
}

// Start the app
main();
