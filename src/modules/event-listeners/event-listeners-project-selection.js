import data from "../config/data.js";

class ProjectSelectionEventListeners {

  constructor() {
    this.projectList = document.querySelector("#project-list");
    this.editProjectModal = document.getElementById("edit-project-modal");
  }

selectProject() {
    this.projectList.addEventListener("click", (e) => {
        // Ignore clicks on buttons
        if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
            return;
        }
        
        // Check if clicked element is a project container
        const clickedProject = e.target.closest("li.project-container");
        
        // If click wasn't on a project container, do nothing
        if (!clickedProject) return;
        
        // If clicking the already selected project, deselect it
        if (clickedProject.classList.contains("selected")) {
            clickedProject.classList.remove("selected");
            data.selectedProjectId = null;
            console.log("Deselected project");
            this.showAllProjects();
            this.showAllTodos();
            return;
        }
        
        // Deselect previously selected project
        const previouslySelected = document.querySelector("li.project-container.selected");
        if (previouslySelected) {
            previouslySelected.classList.remove("selected");
        }

        // Select clicked project
        clickedProject.classList.add("selected");
        data.selectedProjectId = clickedProject.dataset.projectId;
        console.log(`Selected project ID: ${data.selectedProjectId}`);
        
        // Filter UI to show only selected project and its todos
        this.filterProjectsById(data.selectedProjectId);
        this.filterTodosByProjectId(data.selectedProjectId);
    });
  }

  filterProjectsById(projectId) {
    const allProjects = document.querySelectorAll("li.project-container");
    allProjects.forEach((project) => {
        if (project.dataset.projectId === projectId) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
  }

  filterTodosByProjectId(projectId) {
    const allTodos = document.querySelectorAll("li.todo-item-container");
    allTodos.forEach((todo) => {
        const todoItem = data.getToDoItemById(todo.dataset.toDoId);
        if (todoItem && todoItem.projectId === projectId) {
            todo.style.display = "block";
        } else {
            todo.style.display = "none";
        }
    });
  }

  showAllProjects() {
    const allProjects = document.querySelectorAll("li.project-container");
    allProjects.forEach((project) => {
        project.style.display = "block";
    });
  }

  showAllTodos() {
    const allTodos = document.querySelectorAll("li.todo-item-container");
    allTodos.forEach((todo) => {
        todo.style.display = "block";
    });
  
    const showAllProjectsBtn = document.getElementById("show-all-projects-button");
    if (!showAllProjectsBtn) {
        console.warn("Show All Projects button not found");
        return;
    }
  }


  init() {
    this.selectProject();
    this.showAllProjects();
  }
} 

export default ProjectSelectionEventListeners;