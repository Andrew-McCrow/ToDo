import { ToDoServices } from "../services/to-do-services.js";
import { ToDoItemRenderer } from "../ui/to-do-renderer.js";
import { ProjectRenderer } from "../ui/project-renderer.js";

class EventListenersToDoItems {

  constructor() {
    this.toDoList = document.querySelector("#to-do-list");
    this.editToDoModal = document.getElementById("edit-to-do-modal");
  }

  createToDoItemListener() {
    const createToDoBtn = document.getElementById("add-todo-item-button-modal");
    if (createToDoBtn) {
      createToDoBtn.addEventListener("click", () => {
        console.log("Create To-Do Item button clicked");
        const toDoNameInput = document.getElementById("todo-name");
        if (!toDoNameInput) {
          console.warn("To-Do name input not found");
          return;
        }
        const toDoName = toDoNameInput.value.trim();
        if (toDoName === "") {
          alert("To-Do name cannot be empty");
          return;
        }
        const toDoDescriptionInput = document.getElementById("todo-description");
        const toDoDescription = toDoDescriptionInput ? toDoDescriptionInput.value.trim() : ""; 
        const toDoDueDateInput = document.getElementById("todo-due-date");
        const toDoDueDate = toDoDueDateInput ? toDoDueDateInput.value : ""; 
        const toDoPriorityInput = document.getElementById("todo-priority");
        const toDoPriority = toDoPriorityInput ? toDoPriorityInput.value : "Medium"; 
        const toDoNotesInput = document.getElementById("todo-notes");
        const toDoNotes = toDoNotesInput ? toDoNotesInput.value.trim() : ""; 
        const toDoProjectAssignmentInput = document.getElementById("project-assignment");
        const toDoProjectId = toDoProjectAssignmentInput ? toDoProjectAssignmentInput.value : null;
        
        try {
          // Create new to-do item using service
          const newToDoItem = ToDoServices.createToDo({
            name: toDoName,
            description: toDoDescription,
            dueDate: toDoDueDate,
            priority: toDoPriority,
            notes: toDoNotes,
            projectId: toDoProjectId
          });
          
          // Render new to-do item in DOM
          const toDoRenderer = new ToDoItemRenderer();
          toDoRenderer.displayToDoItem(newToDoItem);
          
          // Also update project UI if assigned to a project
          if (toDoProjectId) {
            const projectRenderer = new ProjectRenderer();
            projectRenderer.addToDoItemToProjectById(newToDoItem, toDoProjectId);
          }
          // Clear input fields
          toDoNameInput.value = "";
          if (toDoDescriptionInput) toDoDescriptionInput.value = "";
          if (toDoDueDateInput) toDoDueDateInput.value = "";
          if (toDoPriorityInput) toDoPriorityInput.value = "Medium";
          if (toDoNotesInput) toDoNotesInput.value = "";
          if (toDoProjectAssignmentInput) toDoProjectAssignmentInput.value = "";
          
          // Close modal
          const modal = document.getElementById("new-todo-modal");
          if (modal) {
            modal.close();
          } else {
            console.warn("New to-do modal not found");
          }
        } catch (error) {
          console.error("Failed to create to-do:", error);
          alert(error.message);
        } 

      });
    }
  }

  deleteToDoItemListener() {
    const confirmDeleteToDoBtn = document.getElementById("confirm-delete-todo-button");
    if (!confirmDeleteToDoBtn) {
      console.warn("Confirm delete to-do button not found");
      return;
    }
    confirmDeleteToDoBtn.addEventListener("click", () => {
      const modal = document.getElementById("confirm-delete-todo-modal");
      if (!modal || !modal.dataset.toDoId) {
        console.warn("To-Do ID not found for deletion");
        return;
      }
      const toDoId = modal.dataset.toDoId;
      
      try {
        // Delete to-do using service
        const toDoItem = ToDoServices.deleteToDo(toDoId);
        
        // Remove to-do from DOM
        const toDoRenderer = new ToDoItemRenderer();
        toDoRenderer.removeToDoItemById(toDoId);
        
        // Also remove from project UI if it belongs to a project
        if (toDoItem && toDoItem.projectId) {
          const projectRenderer = new ProjectRenderer();
          projectRenderer.removeToDoItemFromProjectById(toDoItem, toDoItem.projectId);
        }
        
        // Close modal
        modal.close();
      } catch (error) {
        console.error("Failed to delete to-do:", error);
        alert(error.message);
      }
    });
  }

  confirmEditToDoItemListener() {
    const saveToDoBtn = document.getElementById("save-todo-item-button-modal");
    if (!saveToDoBtn) {
      console.warn("Save to-do item button not found");
      return;
    }
    
    saveToDoBtn.addEventListener("click", () => {
      console.log("Save to-do item button clicked");
      
      const modal = document.getElementById("edit-todo-modal");
      if (!modal || !modal.dataset.toDoId) {
        console.warn("To-Do ID not found");
        return;
      }
      // Get toDoId from modal dataset
      const toDoId = modal.dataset.toDoId;
      
      // Get input DOM elements
      const editToDoNameInput = document.getElementById("edit-todo-name");
      const editToDoDescriptionInput = document.getElementById("edit-todo-description");
      const editDueDateInput = document.getElementById("edit-todo-due-date");
      const editToDoPriorityInput = document.getElementById("edit-todo-priority");
      const editNotesInput = document.getElementById("edit-todo-notes");
      const editAssignedProjectInput = document.getElementById("edit-project-assignment");

      // Validate inputs & clean up values
      const updatedName = editToDoNameInput.value.trim();
      const updatedDescription = editToDoDescriptionInput?.value || "";
      const updatedDueDate = editDueDateInput?.value || "";
      const updatedPriority = editToDoPriorityInput.value;
      const updatedNotes = editNotesInput?.value || "";
      const updatedProjectId = editAssignedProjectInput.value; 

      if (updatedName === "") {
        alert("To-Do name cannot be empty");
        return;
      }
      
      try {
        // Update todo using service
        const { toDoItem, oldProjectId } = ToDoServices.updateToDo(toDoId, {
          name: updatedName,
          description: updatedDescription,
          dueDate: updatedDueDate,
          priority: updatedPriority,
          notes: updatedNotes,
          projectId: updatedProjectId
        });
        
        // Update DOM
        const toDoRenderer = new ToDoItemRenderer();
        toDoRenderer.updateToDoItemById(toDoId, toDoItem);
        
        const projectRenderer = new ProjectRenderer();
        
        // Remove from old project UI if needed
        if (oldProjectId && oldProjectId !== updatedProjectId) {
          projectRenderer.removeToDoItemFromProjectById(toDoItem, oldProjectId);
        }
        
        // Handle new project UI
        if (toDoItem.projectId) {
          if (oldProjectId === toDoItem.projectId) {
            // Same project - just update the existing item
            projectRenderer.updateToDoItemInProjectById(toDoItem.projectId, toDoId, toDoItem);
          } else {
            // Different project (or was None) - add to new project UI
            projectRenderer.addToDoItemToProjectById(toDoItem, toDoItem.projectId);
          }
        }
      
        // Clear inputs
        editToDoNameInput.value = "";
        if (editToDoDescriptionInput) editToDoDescriptionInput.value = "";
        if (editToDoPriorityInput) editToDoPriorityInput.value = "medium";
        if (editDueDateInput) editDueDateInput.value = "";
        if (editNotesInput) editNotesInput.value = "";
        if (editAssignedProjectInput) editAssignedProjectInput.value = "";
        
        // Close modal
        modal.close();
      } catch (error) {
        console.error("Failed to update to-do:", error);
        alert(error.message);
      }
    });
  }

  init () {
    this.confirmEditToDoItemListener();
    this.deleteToDoItemListener();
    this.createToDoItemListener();
  }

}

export default EventListenersToDoItems;