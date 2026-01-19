import "./styles.css";
import Project from "./modules/project.js";
import ToDoItem from "./modules/toDoItem.js";
import { displayProject, displayToDoItem } from "./modules/DOM.js";

// Example usage:
const myProject = new Project("My First Project");
const task1 = new ToDoItem(
  "Buy groceries",
  "Milk, Bread, Eggs",
  "2024-07-01",
  "High",
  [],
  [],
  myProject
);
myProject.addToDoItem(task1);
task1.addNote("Remember to check for discounts.");
task1.addChecklistItem("Buy Milk");
task1.addChecklistItem("Buy Bread");
task1.markChecklistItemCompleted(0);

displayProject(myProject);
displayToDoItem(task1);

// Add event listener to "Add Project" button
const projectBtn = document.querySelector("#add-project-btn");
projectBtn.addEventListener("click", () => {
  alert("Hello World");
});
