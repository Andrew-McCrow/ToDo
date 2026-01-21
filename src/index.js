import "./styles.css";
import Project from "./modules/project.js";
import ToDoItem from "./modules/toDoItem.js";
import { ProjectRenderer, ToDoItemRenderer, ProjectListRenderer } from "./modules/DOM.js";

// Global project list
const projectList = [];
// Global to-do item list
const toDoItemList = [];
// Track selected project
let selectedProject = null; 

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
    exampleProjectRenderer.selectedProject(document.querySelector(`li.project-container[data-project-name="${exampleProject.name}"]`)); 
    exampleToDoItemRenderer.displayToDoItem(exampleTask);
    
  // ******* EXAMPLE DATA ******* //

// Prepare the list of projects in a dropdown (to be used in the project assignment of ToDo item modal)
const projectListRenderer = new ProjectListRenderer();
projectListRenderer.displayProjectList(projectList);

  // ******* LOGIC FOR ADDING & REMOVING PROJECTS ******* //
    // Add event listener to "Add Project" button
    const projectBtn = document.querySelector("#add-project-btn");
    projectBtn.addEventListener("click", () => {
      projectModal.showModal();
    });

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
      const newProjectRenderer = new ProjectRenderer();
      newProjectRenderer.displayProject(newProject);
      projectModal.close();
      projectForm.reset();
      projectList.push(newProject); // add new project to global list
      projectListRenderer.displayProjectList(projectList); // update project list in the DOM
    });

    // Event listener for project deletion
    const projectListContainer = document.querySelector("#project-list");
    projectListContainer.addEventListener("click", (e) => {
      if (e.target && e.target.matches("button.delete-project-button")) {
        const projectContainer = e.target.closest("li.project-container");
        projectContainer.remove();
        // Remove project from global project list
        const projectName = projectContainer.dataset.projectName;
        const projectIndex = projectList.findIndex((p) => p.name === projectName);
        if (projectIndex !== -1) {
          projectList.splice(projectIndex, 1);
          // Update project list in the DOM
          const projectListRenderer = new ProjectListRenderer();
          projectListRenderer.displayProjectList(projectList);
        }
      }
    });
  // ******* LOGIC FOR ADDING & REMOVING PROJECTS ******* //

  // ******* LOGIC FOR ADDING & REMOVING TO-DO ITEMS ******* //
    // Event listener to "Add To-do Item" button
      const toDoBtn = document.querySelector("#add-todo-btn");
      toDoBtn.addEventListener("click", () => {
        toDoModal.showModal();
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
      const title = document.querySelector("#todo-name").value;
      const description = document.querySelector("#todo-description").value;
      const dueDate = document.querySelector("#todo-due-date").value;
      const priority = document.querySelector("#todo-priority").value;
      const notes = document.querySelector("#todo-notes").value;
      const checklist = document.querySelector("#todo-checklist").value.split(",").map(item => item.trim());  
      const projectName = document.querySelector("#project-assignment").value;
      const assignedProject = projectName ? projectList.find((p) => p.name === projectName) : null;
      const newToDoItem = new ToDoItem(title, description, dueDate, priority, notes, checklist, assignedProject);
      
      if (assignedProject) {
        assignedProject.addToDoItem(newToDoItem);
      }
      
      const newToDoItemRenderer = new ToDoItemRenderer();
      newToDoItemRenderer.displayToDoItem(newToDoItem);
      newToDoItemRenderer.addToDoItemToProject(newToDoItem, assignedProject);
      toDoItemList.push(newToDoItem); // add new to-do item to global list
      toDoModal.close();
      toDoForm.reset();
    });

    // Event listener for to-do item deletion
    const toDoListContainer = document.querySelector("#todo-list");
    toDoListContainer.addEventListener("click", (e) => {
      if (e.target && e.target.matches("button.delete-todo-button")) {
        const itemContainer = e.target.closest("li.todo-item-container");
        const itemTitle = itemContainer.querySelector("h3").textContent;
        itemContainer.remove();

        // Remove from global toDoItemList
        const todoIndex = toDoItemList.findIndex((item) => item.title === itemTitle);
        if (todoIndex !== -1) {
          toDoItemList.splice(todoIndex, 1);
        }
        
        // Also remove from its project if assigned
        projectList.forEach((project) => {
          const toDoItem = project.toDoItems.find((item) => item.title === itemTitle);
          if (toDoItem) {
            project.removeToDoItem(toDoItem);
          }
          
        }); 
      }
    });
  // ******* LOGIC FOR ADDING & REMOVING TO-DO ITEMS ******* //



  // Event listener for project selection by clicking on project name
  document.querySelector("#project-list").addEventListener("click", (e) => {
  if (e.target && e.target.matches("li.project-container")) {
    const projectName = e.target.dataset.projectName;
    const newSelectedProject = projectList.find((p) => p.name === projectName);
    
    // Check if project exists in list
    if (!newSelectedProject) {
      console.warn(`Project "${projectName}" not found in project list`);
      return;
    }
    
    // Check if same project is already selected - if so, deselect it
    if (selectedProject && selectedProject.name === projectName) {
      console.log(`Deselecting project: ${projectName}`);
      e.target.classList.remove("selected");
      selectedProject = null;
      
    // Clear the to-do list
      const toDoList = document.querySelector("#todo-list");
      toDoList.innerHTML = "";
      return;
    }
    
    console.log(`Selected project: ${projectName}`);
    
    // Highlight selected project
    const projectContainers = document.querySelectorAll("li.project-container");
    projectContainers.forEach((container) => {
      container.classList.remove("selected");
    });
    e.target.classList.add("selected"); 
    
    selectedProject = newSelectedProject;
    
    // Filter and display to-do items for the selected project
    const toDoList = document.querySelector("#todo-list");
    toDoList.innerHTML = ""; // Clear existing to-do items
    
    // Check if project has todos
    if (selectedProject.toDoItems.length === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.classList.add("empty-state");
      emptyMessage.textContent = "No to-do items in this project yet.";
      toDoList.appendChild(emptyMessage);
      return;
    }
    
    // Render todos for selected project
    const toDoItemRenderer = new ToDoItemRenderer();
    selectedProject.toDoItems.forEach((item) => {
      toDoItemRenderer.displayToDoItem(item);
    });
  }
  });

});


