import './modals.html';
import "./styles.css";
import Project from "./modules/Project.js";
import ToDoItem from "./modules/ToDoItem.js";
import data from "./modules/data.js";
import { ProjectRenderer } from "./modules/ProjectRenderer.js";
import { ToDoItemRenderer } from "./modules/ToDoRenderer.js";
import ExampleProjectAndToDo from "./modules/example-project-and-to-do.js";
import modals from "./modules/modals.js";
import EventListeners from "./modules/EventListeners.js";

// Instantiate EventListeners with modals dependency
const eventListeners = new EventListeners(modals);

// Initialize application
document.addEventListener("DOMContentLoaded", () => {

  // Load example project and to-do item (Project: My First Project, To-Do: Buy groceries)
  ExampleProjectAndToDo();
  
  // Expose classes & objects for testing in console
  window.data = data; // expose global data object (contains all projects & to-dos)
  window.Project = Project; // expose Project class to create new projects in console
  window.ToDoItem = ToDoItem; // expose ToDoItem class to create new to-dos in console

  // Initialize event listeners for "Add Project", "Add To-Do Item", "Delete Project", and "Delete To-Do Item" buttons (opens modals).
  eventListeners.init();
 
  // ******* LOGIC FOR ADDING & REMOVING PROJECTS ******* //

  
  
  // ******* LOGIC FOR ADDING & REMOVING TO-DO ITEMS ******* //


   
  
});