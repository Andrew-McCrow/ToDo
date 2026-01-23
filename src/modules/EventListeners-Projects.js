import data from "./data.js";
import { ProjectRenderer } from "./ProjectRenderer.js";

class ProjectEventListeners {

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

  init() {
    this.createProjectEventListener();
  }

}

export default ProjectEventListeners;