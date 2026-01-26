import "./styles.css";
import Project from "./modules/models/project.js";
import ToDoItem from "./modules/models/to-do-item.js";
import data from "./modules/config/data.js";
import exampleData from "./modules/config/example-data.js";
import LocalStorage from "./modules/local-storage/local-storage.js";
import { ProjectRenderer } from "./modules/ui/project-renderer.js";
import { ToDoItemRenderer } from "./modules/ui/to-do-renderer.js";
import modals from "./modules/ui/modals.js";
import EventListenersShowModals from "./modules/event-listeners/event-listeners-modals-display.js";
import EventListenersCancelModals from "./modules/event-listeners/event-listeners-modals-cancel.js";
import EventListenersProjects from "./modules/event-listeners/event-listeners-projects.js";
import EventListenersToDoItems from "./modules/event-listeners/event-listeners-to-do-items.js";
import EventListenersFilterToDoItems from "./modules/event-listeners/event-listeners-filter-to-do-items.js";
import EventListenersFilterProjects from "./modules/event-listeners/event-listeners-filter-projects.js";

// Instantiate EventListeners
const modalEventListeners = new EventListenersShowModals(modals);
const cancelModalEventListeners = new EventListenersCancelModals(modals);
const projectEventListeners = new EventListenersProjects();
const toDoEventListeners = new EventListenersToDoItems();
const filterToDoEventListeners = new EventListenersFilterToDoItems();
const filterProjectsEventListeners = new EventListenersFilterProjects();

// Initialize application
document.addEventListener("DOMContentLoaded", () => {

  // Try to load data from localStorage
  const dataLoaded = LocalStorage.loadFromLocalStorage();
  
  // If no saved data, load example data
  if (!dataLoaded) {
    exampleData();
  } else {
    // Render loaded data to the UI
    const projectRenderer = new ProjectRenderer();
    const toDoRenderer = new ToDoItemRenderer();
    
    // Render all projects
    data.getProjects().forEach(project => {
      projectRenderer.displayProject(project);
    });
    
    // Render all todos
    data.getToDoItems().forEach(todo => {
      toDoRenderer.displayToDoItem(todo);
    });
  }
  
  // Expose classes & objects for testing in console
  window.data = data; // expose global data object (contains all projects & to-dos)
  window.Project = Project; // expose Project class to create new projects in console
  window.ToDoItem = ToDoItem; // expose ToDoItem class to create new to-dos in console
  window.LocalStorage = LocalStorage; // expose LocalStorage for manual save/load/clear

  // Initialize event listeners for modals.
  modalEventListeners.init();
  cancelModalEventListeners.init();

  // ******* LOGIC FOR ADDING, EDITING & REMOVING PROJECTS ******* //

  projectEventListeners.init();
  
  // ******* LOGIC FOR ADDING, EDITING & REMOVING TO-DO ITEMS ******* //

  toDoEventListeners.init();

  // Initialize event listeners for selecting projects

  filterProjectsEventListeners.init();

  // Initialize event listeners for filtering to-do items

  filterToDoEventListeners.init();
  
});