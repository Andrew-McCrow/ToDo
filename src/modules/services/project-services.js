// project-service.js

import  Project  from "../models/project.js";
import  data  from "../config/data.js";
import LocalStorage from "../local-storage/local-storage.js";

class ProjectServices {
  static createProject(projectName) {
    if (!projectName || projectName.trim() === "") {
      throw new Error("Project name cannot be empty");
    }
    // Create new project and add to data
    const newProject = new Project(projectName.trim());
    data.addProject(newProject);
    
    // Save to localStorage
    LocalStorage.saveToLocalStorage();

    return newProject;
  }

  static updateProject(projectId, updatedName) {
    if (!updatedName || updatedName.trim() === "") {
      throw new Error("Project name cannot be empty");
    }

    const project = data.getProjectById(projectId);
    if (!project) {
      throw new Error(`Project ${projectId} not found`);
    }

    // Update project name
    project.name = updatedName.trim();
    
    // Save to localStorage
    LocalStorage.saveToLocalStorage();

    return project;
  }

  static deleteProject(projectId) {
    // Find all affected to-do items BEFORE deleting project
    const affectedToDoItems = data.getToDoItems().filter(item => item.projectId === projectId);
    
    // Update data: clear projectId from all affected to-do items
    data.getToDoItems().forEach(item => {
      if (item.projectId === projectId) {
        item.projectId = null;
      }
    });

    // Remove project from data
    data.removeProjectById(projectId);
    
    // Save to localStorage
    LocalStorage.saveToLocalStorage();

    // Return affected todos so controller can update their UI
    return affectedToDoItems;
  }
}

export { ProjectServices };