import data from "../config/data.js";
import Project from "../models/project.js";
import ToDoItem from "../models/to-do-item.js";

class LocalStorage {
  static STORAGE_KEY = "todoAppData";

  // Save current data to localStorage
  static saveToLocalStorage() {
    try {
      const dataToSave = {
        projectList: data.getProjects().map(project => ({
          projectId: project.projectId,
          name: project.name,
          toDoItems: project.toDoItems.map(todo => ({
            toDoId: todo.toDoId,
            name: todo.name,
            description: todo.description,
            dueDate: todo.dueDate,
            priority: todo.priority,
            notes: todo.notes,
            projectId: todo.projectId,
            isCompleted: todo.isCompleted
          }))
        })),
        toDoItemList: data.getToDoItems().map(todo => ({
          toDoId: todo.toDoId,
          name: todo.name,
          description: todo.description,
          dueDate: todo.dueDate,
          priority: todo.priority,
          notes: todo.notes,
          projectId: todo.projectId,
          isCompleted: todo.isCompleted
        })),
        nextProjectId: Project.nextId,
        nextToDoId: ToDoItem.nextId
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToSave));
      console.log("Data saved to localStorage");
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }

  // Load data from localStorage
  static loadFromLocalStorage() {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      
      if (!savedData) {
        console.log("No saved data found in localStorage");
        return false;
      }

      const parsedData = JSON.parse(savedData);
      
      // Restore ID counters
      if (parsedData.nextProjectId) {
        Project.nextId = parsedData.nextProjectId;
      }
      if (parsedData.nextToDoId) {
        ToDoItem.nextId = parsedData.nextToDoId;
      }

      // Clear existing data
      data.projectList = [];
      data.toDoItemList = [];

      // Restore todos first (without project relationship)
      if (parsedData.toDoItemList) {
        parsedData.toDoItemList.forEach(todoData => {
          const todo = Object.assign(new ToDoItem(), todoData);
          data.toDoItemList.push(todo);
        });
      }

      // Restore projects with their todos
      if (parsedData.projectList) {
        parsedData.projectList.forEach(projectData => {
          const project = Object.assign(new Project(), {
            projectId: projectData.projectId,
            name: projectData.name,
            toDoItems: []
          });
          
          // Link todos to project
          projectData.toDoItems.forEach(todoData => {
            const todo = data.getToDoItemById(todoData.toDoId);
            if (todo) {
              project.toDoItems.push(todo);
            }
          });
          
          data.projectList.push(project);
        });
      }

      console.log("Data loaded from localStorage");
      return true;
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      return false;
    }
  }

  // Clear localStorage
  static clearLocalStorage() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log("localStorage cleared");
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  }
}

export default LocalStorage;