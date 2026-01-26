// to-do-services.js

import ToDoItem from "../models/to-do-item.js";
import data from "../config/data.js";

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
      data.addToDoItemToProjectById(newToDoItem, projectId);
    }
    
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
          data.removeToDoItemFromProjectById(toDoId);
        }
        // Add to new project if not already there
        if (!newProject.toDoItems.find(item => item.toDoId === toDoId)) {
          newProject.toDoItems.push(toDoItem);
        }
      }
    } else {
      // User selected "None" - remove from any project
      if (oldProjectId) {
        data.removeToDoItemFromProjectById(toDoId);
      }
    }
    
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
    data.removeToDoItemFromProjectById(toDoId);
    
    return toDoItem;
  }

  static toggleComplete(toDoId) {
    const toDoItem = data.getToDoItemById(toDoId);
    
    if (!toDoItem) {
      throw new Error(`To-Do item ${toDoId} not found`);
    }
    
    toDoItem.toggleToDoItemCompletion();
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
    const { priority, project } = filters;
    
    // Filter by all criteria
    const filteredToDos = allToDos.filter(item => {
      // Check priority filter
      const matchesPriority = priority === "all" || item.toDoItemByPriority(priority);
      
      // Check project filter
      const matchesProject = project === "all" || item.toDoItemByProjectId(project);
      
      // Must match all filters
      return matchesPriority && matchesProject;
    });
    
    return filteredToDos.map(item => item.toDoId);
  }
  
}

export { ToDoServices };
