import "./styles.css";
import Project from "./modules/project.js";
import ToDoItem from "./modules/toDoItem.js";
import { ProjectRenderer, ToDoItemRenderer } from "./modules/DOM.js";

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

const projectRenderer = new ProjectRenderer();
const toDoItemRenderer = new ToDoItemRenderer();
projectRenderer.displayProject(myProject);    
toDoItemRenderer.displayToDoItem(task1);

// modal and form for adding new projects
const projectModal = document.querySelector("#new-project-modal");  
const closeBtn = document.querySelector("#cancel-project-button"); 
closeBtn.addEventListener("click", () => {
  projectModal.close();
});
const projectForm = document.querySelector("#new-project-form"); 
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectName = document.querySelector("#project-name").value;
  const newProject = new Project(projectName);
  projectRenderer.displayProject(newProject);
  projectModal.close();
  projectForm.reset();
});

// Add event listener to "Add Project" button
const projectBtn = document.querySelector("#add-project-btn");
projectBtn.addEventListener("click", () => {
  projectModal.showModal();
});

// modal and form for adding new to-do items
const toDoModal = document.querySelector("#new-todo-modal");  
const toDoCloseBtn = document.querySelector("#cancel-todo-button"); 
toDoCloseBtn.addEventListener("click", () => {
  toDoModal.close();
});

const toDoForm = document.querySelector("#new-todo-form"); 
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#todo-title").value;
  const description = document.querySelector("#todo-description").value;
  const dueDate = document.querySelector("#todo-due-date").value;
  const priority = document.querySelector("#todo-priority").value;
  const newToDoItem = new ToDoItem(title, description, dueDate, priority);
  toDoItemRenderer.displayToDoItem(newToDoItem);
  toDoModal.close();
  toDoForm.reset();
});

// Add event listener to "Add To Do Item" button
const toDoBtn = document.querySelector("#add-todo-btn");
toDoBtn.addEventListener("click", () => {
  toDoModal.showModal();
}); 


