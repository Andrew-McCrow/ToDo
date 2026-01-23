import "./styles.css";
import Project from "./modules/Project.js";
import ToDoItem from "./modules/ToDoItem.js";
import data from "./modules/data.js";
import { ProjectRenderer } from "./modules/ProjectRenderer.js";
import { ToDoItemRenderer } from "./modules/ToDoRenderer.js";
import ExampleProjectAndToDo from "./modules/example-project-and-to-do.js";
import modals from "./modules/modals.js";
import eventListeners from "./modules/EventListeners.js";

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  
  // Load example project and to-do item (Project: My First Project, To-Do: Buy groceries)
  ExampleProjectAndToDo();
  
  // Expose classes & objects for testing in console
  window.data = data; // expose global data object (contains all projects & to-dos)
  window.Project = Project; // expose Project class to create new projects in console
  window.ToDoItem = ToDoItem; // expose ToDoItem class to create new to-dos in console

  // ******* LOGIC FOR ADDING & REMOVING PROJECTS ******* //
  // Event listener to "Add Project" button - opens project creation modal
  // eventListeners.addProjectButtonListener(modals);
  
  
  // ******* LOGIC FOR ADDING & REMOVING TO-DO ITEMS ******* //
  // Event listener to "Add To-Do Item" button - opens to-do item creation modal
  // eventListeners.addToDoButtonListener(modals);

  eventListeners.init();  // Single call instead of two
  
});