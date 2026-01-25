import "./styles.css";
import Project from "./modules/models/project.js";
import ToDoItem from "./modules/models/to-do-item.js";
import data from "./modules/config/data.js";
import { ProjectRenderer } from "./modules/ui/project-renderer.js";
import { ToDoItemRenderer } from "./modules/ui/to-do-renderer.js";
import exampleData from "./modules/config/example-data.js";
import modals from "./modules/ui/modals.js";
import EventListenersShowModals from "./modules/event-listeners/event-listeners-show-modals.js";
import EventListenersCancelModals from "./modules/event-listeners/event-listeners-cancel-modals.js";
import ProjectEventListeners from "./modules/event-listeners/event-listeners-projects.js";
import ToDoEventListeners from "./modules/event-listeners/event-listeners-to-do-items.js";

// Instantiate EventListeners
const modalEventListeners = new EventListenersShowModals(modals);
const cancelModalEventListeners = new EventListenersCancelModals(modals);
const projectEventListeners = new ProjectEventListeners();
const toDoEventListeners = new ToDoEventListeners();

// Initialize application
document.addEventListener("DOMContentLoaded", () => {

  // Load example project and to-do item (Project: My First Project, To-Do: Buy groceries)
  exampleData();
  
  // Expose classes & objects for testing in console
  window.data = data; // expose global data object (contains all projects & to-dos)
  window.Project = Project; // expose Project class to create new projects in console
  window.ToDoItem = ToDoItem; // expose ToDoItem class to create new to-dos in console

  // Initialize event listeners to open all modals.
  modalEventListeners.init();

  // Initialize event listeners for "Cancel" buttons in all modals
  cancelModalEventListeners.init();
 
  // ******* LOGIC FOR ADDING, EDITING & REMOVING PROJECTS ******* //

  projectEventListeners.init();
  
  // ******* LOGIC FOR ADDING, EDITING & REMOVING TO-DO ITEMS ******* //

  toDoEventListeners.init();

   
  
});