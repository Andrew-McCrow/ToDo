import "./styles.css";
import Project from "./modules/project.js";
import ToDoItem from "./modules/toDoItem.js";
import { ProjectRenderer, ToDoItemRenderer, ProjectListRenderer } from "./modules/DOM.js";

// Global project list
const projectList = [];
// Track selected project
let selectedProject = null; 

// Initialize application
document.addEventListener("DOMContentLoaded", () => {

  // Example usage:
    // create a new project and to-do item
    const exampleProject = new Project("My First Project");

    const exampleTask = new ToDoItem(
      "Buy groceries",
      "Milk, Bread, Eggs",
      "2024-07-01",
      "High",
      [],
      [],
      exampleProject
    );

    // add project to global project list & render project list
    const projectListRenderer = new ProjectListRenderer();
    projectList.push(exampleProject);
    projectListRenderer.displayProjectList(projectList);

    // link to-do item to project
    exampleProject.addToDoItem(exampleTask);
    exampleTask.addNote("Remember to check for discounts.");
    exampleTask.addChecklistItem("Buy Milk");
    exampleTask.addChecklistItem("Buy Bread");
    exampleTask.addChecklistItem("Buy Eggs");
    exampleTask.markChecklistItemCompleted(0);

    // Render project and to-do item in the DOM
    const exampleProjectRenderer = new ProjectRenderer();
    const exampleToDoItemRenderer = new ToDoItemRenderer();
    exampleProjectRenderer.displayProject(exampleProject);    
    exampleToDoItemRenderer.displayToDoItem(exampleTask);



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
    const title = document.querySelector("#todo-name").value;
    const description = document.querySelector("#todo-description").value;
    const dueDate = document.querySelector("#todo-due-date").value;
    const priority = document.querySelector("#todo-priority").value;
    const notes = document.querySelector("#todo-notes").value;
    const checklist = document.querySelector("#todo-checklist").value.split(",").map(item => item.trim());  
    const projectName = document.querySelector("#project-assignment").value;
    const assignedProject = projectName ? projectList.find((p) => p.name === projectName) : null;
    const newToDoItem = new ToDoItem(title, description, dueDate, priority, notes, checklist, assignedProject);
    const newToDoItemRenderer = new ToDoItemRenderer();
    newToDoItemRenderer.displayToDoItem(newToDoItem);
    toDoModal.close();
    toDoForm.reset();
  });

  // Add event listener to "Add To Do Item" button
  const toDoBtn = document.querySelector("#add-todo-btn");
  toDoBtn.addEventListener("click", () => {
    toDoModal.showModal();
  }); 

});

// Add event listener for project deletion
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



// Event listener for project selection by clicking on project name
document.querySelector("#project-list").addEventListener("click", (e) => {
  if (e.target && e.target.matches("li.project-container")) {
    const projectName = e.target.dataset.projectName;
    // You can now use projectName to filter/display to-do items related to this project
    console.log(`Selected project: ${projectName}`);
    // Add logic to highlight selected project and display its to-do items
    const projectContainers = document.querySelectorAll("li.project-container");
    projectContainers.forEach((container) => {
      container.classList.remove("selected");
    });
    e.target.classList.add("selected"); 
  }
});

