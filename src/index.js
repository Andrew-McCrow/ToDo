import "./styles.css";
import Project from "./modules/models/project.js";
import ToDoItem from "./modules/models/to-do-item.js";
import data from "./modules/config/data.js";
import exampleData from "./modules/config/example-data.js";
import modals from "./modules/ui/modals.js";
import EventListenersShowModals from "./modules/event-listeners/event-listeners-show-modals.js";
import EventListenersCancelModals from "./modules/event-listeners/event-listeners-cancel-modals.js";
import EventListenersProjects from "./modules/event-listeners/event-listeners-projects.js";
import EventListenersToDoItems from "./modules/event-listeners/event-listeners-to-do-items.js";
import EventListenersFilterToDoItems from "./modules/event-listeners/event-listeners-filter-to-do-items.js";
import ProjectSelectionEventListeners from "./modules/event-listeners/event-listeners-project-selection.js";

// Instantiate EventListeners
const modalEventListeners = new EventListenersShowModals(modals);
const cancelModalEventListeners = new EventListenersCancelModals(modals);
const projectEventListeners = new EventListenersProjects();
const toDoEventListeners = new EventListenersToDoItems();
const filterToDoEventListeners = new EventListenersFilterToDoItems();
const projectSelectionEventListeners = new ProjectSelectionEventListeners();

// Initialize application
document.addEventListener("DOMContentLoaded", () => {

  // Load example project and to-do item (Project: My First Project, To-Do: Buy groceries)
  exampleData();
  
  // Expose classes & objects for testing in console
  window.data = data; // expose global data object (contains all projects & to-dos)
  window.Project = Project; // expose Project class to create new projects in console
  window.ToDoItem = ToDoItem; // expose ToDoItem class to create new to-dos in console

  // Initialize event listeners for modals.
  modalEventListeners.init();
  cancelModalEventListeners.init();
 
  // ******* LOGIC FOR ADDING, EDITING & REMOVING PROJECTS ******* //

  projectEventListeners.init();
  
  // ******* LOGIC FOR ADDING, EDITING & REMOVING TO-DO ITEMS ******* //

  toDoEventListeners.init();

  // Initialize event listeners for selecting projects

  projectSelectionEventListeners.init();

  // Initialize event listeners for filtering to-do items

  filterToDoEventListeners.init();
  
});