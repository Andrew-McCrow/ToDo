import data from "../config/data.js";
import Project from "../models/project.js";
import { ProjectServices } from "../services/project-services.js";
import { ProjectRenderer } from "../ui/project-renderer.js";
import { ToDoItemRenderer } from "../ui/to-do-renderer.js";

class EventListenersProjects {

  constructor() {
    this.projectList = document.querySelector("#project-list");
    this.editProjectModal = document.getElementById("edit-project-modal");
  }

  createProjectEventListener() {
    const createProjectBtn = document.getElementById("add-project-button-modal");
    if (createProjectBtn) {
      createProjectBtn.addEventListener("click", () => {
        console.log("Create Project button clicked");
        const projectNameInput = document.getElementById("project-name");
        if (!projectNameInput) {
          console.warn("Project name input not found");
          return;
        }
        const projectName = projectNameInput.value.trim();
        if (projectName === "") {
          alert("Project name cannot be empty");
          return;
        }
  
        // Create new project and add to data
        const newProject = ProjectServices.createProject(projectName);
        // Render new project in DOM
        const projectRenderer = new ProjectRenderer();
        projectRenderer.displayProject(newProject);

        // Clear input field
        projectNameInput.value = "";
        // Close modal
        const modal = document.getElementById("new-project-modal");
        if (modal) {
          modal.close();
        } else {
          console.warn("New project modal not found");
        } 

      });
    }
  }

  editProjectEventListener() {
    const saveProjectBtn = document.getElementById("save-project-button-modal");
    if (!saveProjectBtn) {
      console.warn("Save project button not found");
      return;
    }
    
    saveProjectBtn.addEventListener("click", () => {
      console.log("Save project button clicked");
      const editProjectNameInput = document.getElementById("edit-project-name");
      if (!editProjectNameInput) {
        console.warn("Edit project name input not found");
        return;
      }
      const updatedName = editProjectNameInput.value.trim();
      if (updatedName === "") {
        alert("Project name cannot be empty");
        return;
      }
      
      // Get projectId from modal dataset
      const modal = document.getElementById("edit-project-modal");
      if (!modal || !modal.dataset.projectId) {
        console.warn("Project ID not found");
        return;
      }
      const projectId = modal.dataset.projectId;
      
      // Update project using service
      try {
        const project = ProjectServices.updateProject(projectId, updatedName);
        
        // Update project in DOM
        const projectRenderer = new ProjectRenderer();
        projectRenderer.updateProjectNameById(projectId, project.name);
        const projectToDoRenderer = new ToDoItemRenderer();
        projectToDoRenderer.updateProjectNameInToDoItemsByProjectId(projectId, project.name);
        
        // Clear input field
        editProjectNameInput.value = "";
        
        // Close modal
        modal.close();
      } catch (error) {
        console.error("Failed to update project:", error);
        alert(error.message);
      }
  });
}

  deleteProjectEventListener() {
    const confirmDeleteProjectBtn = document.getElementById("confirm-delete-project-button");
    if (!confirmDeleteProjectBtn) {
      console.warn("Confirm delete project button not found");
      return;
    }

    confirmDeleteProjectBtn.addEventListener("click", () => {
      console.log("Confirm delete project button clicked");
      const modal = document.getElementById("confirm-delete-project-modal");
      if (!modal || !modal.dataset.projectId) {
        console.warn("Project ID not found for deletion");
        return;
      }
      const projectId = modal.dataset.projectId;

      // Delete project using service
      const affectedToDoItems = ProjectServices.deleteProject(projectId);

      // Remove project from DOM
      const projectRenderer = new ProjectRenderer();
      projectRenderer.removeProjectById(projectId);
      
      // Update affected to-do items in the UI to show "Project: None"
      const toDoRenderer = new ToDoItemRenderer();
      affectedToDoItems.forEach(toDoItem => {
        toDoRenderer.updateToDoItemById(toDoItem.toDoId, toDoItem);
      });

      // Close modal
      modal.close();
    });
  }

  init() {
    this.createProjectEventListener();
    this.editProjectEventListener();
    this.deleteProjectEventListener();
}

}
export default EventListenersProjects;