import data from "../config/data.js";

class EventListenersFilterProjects {

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
            this.updateTodoHeader("All Projects");
            this.showAllProjects();
            this.showAllTodos();
            
            // Update filter criteria to "all"
            if (data.filterCriteria) {
                data.filterCriteria.project = "all";
            }
            
            // Remove selected class from filter icon
            const filterIcon = document.getElementById("filter-icon");
            if (filterIcon) {
                filterIcon.classList.remove("selected");
            }
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
        
        // Update header with project name
        const project = data.getProjectById(data.selectedProjectId);
        this.updateTodoHeader(project ? project.name : "All Projects");
        
        // Filter UI to show only selected project and its todos
        this.filterProjectsById(data.selectedProjectId);
        this.filterTodosByProjectId(data.selectedProjectId);
        
        // Update filter criteria with selected project
        if (!data.filterCriteria) {
            data.filterCriteria = { priority: "all", dueDate: "all", project: data.selectedProjectId };
        } else {
            data.filterCriteria.project = data.selectedProjectId;
        }
        
        // Add selected class to filter icon
        const filterIcon = document.getElementById("filter-icon");
        if (filterIcon) {
            filterIcon.classList.add("selected");
        }
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
  }

  updateTodoHeader(projectName) {
    const todoHeader = document.getElementById("todo-header");
    if (todoHeader) {
        todoHeader.textContent = `To-Do Items - ${projectName}`;
    }
  }


  init() {
    this.selectProject();
    this.showAllProjects();
  }
} 

export default EventListenersFilterProjects;