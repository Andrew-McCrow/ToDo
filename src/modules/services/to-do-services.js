// to-do-services.js

import ToDoItem from "../models/to-do-item.js";
import data from "../config/data.js";
import { isToday, isThisWeek, isBefore, startOfDay } from 'date-fns';
import LocalStorage from "../local-storage/local-storage.js";

class ToDoServices {
  
  static createToDo(todoData) {
    const { name, description, dueDate, priority, notes, projectId } = todoData;
    
    if (!name || name.trim() === "") {
      throw new Error("To-Do name cannot be empty");
    }
    
    // Create new to-do item
    const newToDoItem = new ToDoItem(
      name.trim(),
      description,
      dueDate,
      priority,
      notes,
      projectId || null
    );
    
    // Add to data store
    data.addToDoItem(newToDoItem);
    
    // If assigned to a project, add to that project's to-do list
    if (projectId) {
      const project = data.getProjectById(projectId);
      if (project) {
        project.toDoItems.push(newToDoItem);
      } else {
        console.warn(`Cannot add To-Do Item to non-existent Project ${projectId}`);
      }
    }
    
    // Save to localStorage
    LocalStorage.saveToLocalStorage();
    
    return newToDoItem;
  }

  static updateToDo(toDoId, updates) {
    const { name, description, dueDate, priority, notes, projectId } = updates;
    
    if (!name || name.trim() === "") {
      throw new Error("To-Do name cannot be empty");
    }
    
    const toDoItem = data.getToDoItemById(toDoId);
    if (!toDoItem) {
      throw new Error(`To-Do item ${toDoId} not found`);
    }
    
    // Store old project ID before updating
    const oldProjectId = toDoItem.projectId;
    
    // Update properties
    toDoItem.name = name.trim();
    toDoItem.description = description;
    toDoItem.dueDate = dueDate;
    toDoItem.priority = priority;
    toDoItem.notes = notes;
    toDoItem.projectId = projectId || null;
    
    // Handle project reassignment
    if (projectId) {
      const newProject = data.getProjectById(projectId);
      if (newProject) {
        // Remove from old project if it was in a different one
        if (oldProjectId && oldProjectId !== projectId) {
          data.getProjects().forEach(project => {
            project.toDoItems = project.toDoItems.filter(item => item.toDoId !== toDoId);
          });
        }
        // Add to new project if not already there
        if (!newProject.toDoItems.find(item => item.toDoId === toDoId)) {
          newProject.toDoItems.push(toDoItem);
        }
      }
    } else {
      // User selected "None" - remove from any project
      if (oldProjectId) {
        data.getProjects().forEach(project => {
          project.toDoItems = project.toDoItems.filter(item => item.toDoId !== toDoId);
        });
      }
    }
    
    // Save to localStorage
    LocalStorage.saveToLocalStorage();
    
    // Return both the updated item and old project ID
    return {
      toDoItem,
      oldProjectId
    };
  }

  static deleteToDo(toDoId) {
    // Get to-do BEFORE deleting it (we need the projectId)
    const toDoItem = data.getToDoItemById(toDoId);
    
    if (!toDoItem) {
      throw new Error(`To-Do item ${toDoId} not found`);
    }
    
    // Remove from data
    data.removeToDoItemById(toDoId);
    
    // Remove from any project's to-do list
    data.getProjects().forEach(project => {
      project.toDoItems = project.toDoItems.filter(item => item.toDoId !== toDoId);
    });
    
    // Save to localStorage
    LocalStorage.saveToLocalStorage();
    
    return toDoItem;
  }

  static toggleComplete(toDoId) {
    const toDoItem = data.getToDoItemById(toDoId);
    
    if (!toDoItem) {
      throw new Error(`To-Do item ${toDoId} not found`);
    }
    
    toDoItem.toggleToDoItemCompletion();
    
    // Save to localStorage
    LocalStorage.saveToLocalStorage();
    
    return toDoItem;
  }

  static filterToDosByPriority(criteria) {
    const allToDos = data.getToDoItems();
    
    // If "all" is selected, return all todo IDs
    if (criteria === "all") {
      return allToDos.map(item => item.toDoId);
    }
    
    // Otherwise filter by the criteria
    const filteredToDos = allToDos.filter(item => item.toDoItemByPriority(criteria));
    // extract just the IDs to return
    const filteredToDoIds = filteredToDos.map(item => item.toDoId);
    return filteredToDoIds;
  }

  static filterToDos(filters) {
    const allToDos = data.getToDoItems();
    const { priority, project, dueDate } = filters;
    
    // Filter by all criteria
    const filteredToDos = allToDos.filter(item => {
      // Check priority filter
      const matchesPriority = priority === "all" || item.toDoItemByPriority(priority);
      
      // Check project filter
      let matchesProject;
      if (project === "all") {
        matchesProject = true;
      } else if (project === "") {
        // "None" selected - only show todos with no project assigned
        matchesProject = item.projectId === null || item.projectId === "";
      } else {
        // Specific project selected
        matchesProject = item.toDoItemByProjectId(project);
      }
      
      // Check due date filter
      let matchesDueDate = true;
      if (dueDate && dueDate !== "all" && item.dueDate) {
        const itemDate = new Date(item.dueDate);
        const today = startOfDay(new Date());
        
        switch (dueDate) {
          case "overdue":
            matchesDueDate = isBefore(itemDate, today);
            break;
          case "due-today":
            matchesDueDate = isToday(itemDate);
            break;
          case "due-this-week":
            matchesDueDate = isThisWeek(itemDate, { weekStartsOn: 0 });
            break;
          default:
            matchesDueDate = true;
        }
      }
      
      // Must match all filters
      return matchesPriority && matchesProject && matchesDueDate;
    });
    
    return filteredToDos.map(item => item.toDoId);
  }
  
}

export { ToDoServices };
