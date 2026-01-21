import "./styles.css";
import Project from "./modules/project.js";
import ToDoItem from "./modules/toDoItem.js";
import { ProjectRenderer, ToDoItemRenderer, ProjectListRenderer } from "./modules/DOM.js";

// Global project list
const projectList = [];
// Global to-do item list
const toDoItemList = [];

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  
  // Expose classes for testing in console
  window.Project = Project;
  window.ToDoItem = ToDoItem;
  window.projectList = projectList;
  window.toDoItemList = toDoItemList;

  // ******* EXAMPLE DATA ******* //
    // create a new example project and to-do item
    const exampleProject = new Project("My First Project");
    const exampleTask = new ToDoItem(
      "Buy groceries",
      "Milk, Bread, Eggs",
      "2024-07-01",
      "High",
      [],
      [],
      exampleProject.name
    );
    // Add example to-do to example project & add some info to the to-do
    exampleProject.addToDoItem(exampleTask);
    exampleTask.addNote("Remember to check for discounts.");
    exampleTask.addChecklistItem("Buy Milk");
    exampleTask.addChecklistItem("Buy Bread");
    exampleTask.addChecklistItem("Buy Eggs");
    exampleTask.markChecklistItemCompleted(0);

    // Add example project & to-do item to global lists
    projectList.push(exampleProject);
    toDoItemList.push(exampleTask);

    // Render example project and to-do item in the DOM
    const exampleProjectRenderer = new ProjectRenderer();
    const exampleToDoItemRenderer = new ToDoItemRenderer();
    exampleProjectRenderer.displayProject(exampleProject); 
    exampleToDoItemRenderer.displayToDoItem(exampleTask);
    
  // ******* EXAMPLE DATA ******* //

  // ******* LOGIC FOR ADDING & REMOVING PROJECTS ******* //

  // Handle adding a new project
  const dialog = document.querySelector("#new-project-modal");
  const addProjectButton = document.querySelector("#add-project-btn");
  addProjectButton.addEventListener("click", () => {
    dialog.showModal(); // blocks background interaction
  });




});