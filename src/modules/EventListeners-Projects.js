import data from "./data.js";
import { ProjectRenderer } from "./ProjectRenderer.js";

class ProjectEventListeners {

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
        const newProject = new Project(projectName);
        data.addProject(newProject);
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
      
      // Get projectId from modal dataset and convert to number
      const modal = document.getElementById("edit-project-modal");
      if (!modal || !modal.dataset.projectId) {
        console.warn("Project ID not found");
        return;
      }
      const projectId = modal.dataset.projectId;
      
      // Update project in data
      const project = data.getProjectById(projectId);
      if (!project) {
        console.warn("Project not found in data");
        return;
      }
      project.name = updatedName;
      
      // Update project in DOM
      const projectRenderer = new ProjectRenderer();
      projectRenderer.updateProjectNameById(projectId, updatedName);
      
      // Clear input field
      editProjectNameInput.value = "";
      
      // Close modal
      modal.close();
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

      // Remove project from data
      data.removeProjectById(projectId);

      // Remove project from DOM
      const projectRenderer = new ProjectRenderer();
      projectRenderer.removeProjectById(projectId);

      // Close modal
      modal.close();
    });
  }


  cancelCreateProjectListener() {
    const cancelCreateProjectBtn = document.getElementById("cancel-project-button-modal");
    if (!cancelCreateProjectBtn) {
      console.warn("Cancel create project button not found");
      return;
    }

    cancelCreateProjectBtn.addEventListener("click", () => {
      console.log("Cancel create project button clicked");
      const modal = document.getElementById("new-project-modal");
      if (modal) {
        modal.close();
      } else {
        console.warn("New project modal not found");
      } 
    });
  }

  cancelEditProjectListener() {
    const cancelEditProjectBtn = document.getElementById("cancel-edit-project-button-modal");
    if (!cancelEditProjectBtn) {
      console.warn("Cancel edit project button not found");
      return;
    }

    cancelEditProjectBtn.addEventListener("click", () => {
      console.log("Cancel edit project button clicked");
      const modal = document.getElementById("edit-project-modal");
      if (modal) {
        modal.close();
      } else {
        console.warn("Edit project modal not found");
      } 
    });
  }

  cancelDeleteProjectListener() {
    const cancelDeleteProjectBtn = document.getElementById("cancel-delete-project-button");
    if (!cancelDeleteProjectBtn) {
      console.warn("Cancel delete project button not found");
      return;
    }

    cancelDeleteProjectBtn.addEventListener("click", () => {
      console.log("Cancel delete project button clicked");
      const modal = document.getElementById("confirm-delete-project-modal");
      if (modal) {
        modal.close();
      } else {
        console.warn("Confirm delete project modal not found");
      } 
    });
  }

  init() {
    this.createProjectEventListener();
    this.editProjectEventListener();
    this.deleteProjectEventListener();
    this.cancelCreateProjectListener();
    this.cancelEditProjectListener();
    this.cancelDeleteProjectListener();
}

}
export default ProjectEventListeners;