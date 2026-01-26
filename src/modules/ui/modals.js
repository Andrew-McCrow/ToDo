import data from "../config/data.js";
import modalHelper from "./modal-helper.js";

class Modals {
    constructor() {
        // Inherit helper methods
        this.addProjectOptionsToSelectElements = modalHelper.addProjectOptionsToSelectElements.bind(modalHelper);
        this.prefillModalInput = modalHelper.prefillModalInput.bind(modalHelper);
    }
  
    displayProjectModal() {
        const modal = document.getElementById("new-project-modal");
        if (!modal) {
            console.warn("Project modal not found in DOM");
            return;
        }
        modal.showModal();
    }

    displayToDoItemModal() {
        const modal = document.getElementById("new-todo-modal");
        if (!modal) {
            console.warn("To-Do modal not found in DOM");
            return;
        }
        // Add project options to the project assignment select element
        this.addProjectOptionsToSelectElements("project-assignment");

        modal.showModal();
    }

    displayConfirmDeleteProjectModal(projectId) {
        const modal = document.getElementById("confirm-delete-project-modal");
        if (!modal) {
            console.warn("Delete project confirmation modal not found");
            return;
        }
        // Store projectId somewhere so form submission can use it
        modal.dataset.projectId = projectId;
        modal.showModal();
}

    displayConfirmDeleteToDoModal(toDoId) {
        const modal = document.getElementById("confirm-delete-todo-modal");
        if (!modal) {
            console.warn("Confirm delete to-do modal not found in DOM");
            return;
        }
        // Store toDoId somewhere so form submission can use it
        modal.dataset.toDoId = toDoId;
        modal.showModal();
    }     
    
    displayEditProjectModal(projectId) {
        const modal = document.getElementById("edit-project-modal");
        if (!modal) {
            console.warn("Edit project modal not found in DOM");
            return;
        }
        modal.dataset.projectId = projectId;
        this.prefillModalInput("edit-project-name", data.getProjectById(projectId)?.name); // Pre-fill current project name in input field
        modal.showModal();
    }

    displayEditToDoModal(toDoId) {
        const modal = document.getElementById("edit-todo-modal");
        if (!modal) {
            console.warn("Edit to-do modal not found in DOM");
            return;
        }

        const toDoItem = data.getToDoItemById(toDoId);
        if (!toDoItem) {
            console.warn(`To-Do item ${toDoId} not found`);
            return;
        }

        // Prefill modal inputs with current to-do item data
        modal.dataset.toDoId = toDoId;
        this.prefillModalInput("edit-todo-name", toDoItem.name);
        this.prefillModalInput("edit-todo-description", toDoItem.description);
        this.prefillModalInput("edit-todo-due-date", toDoItem.dueDate);
        this.prefillModalInput("edit-todo-priority", toDoItem.priority); // Select element
        this.prefillModalInput("edit-todo-notes", toDoItem.notes);
        // add project options to select element and prefill
        this.addProjectOptionsToSelectElements("edit-project-assignment");
        this.prefillModalInput("edit-project-assignment", toDoItem.projectId);
        modal.showModal();
    }

    displayFilterToDoModal() {
        const modal = document.getElementById("filter-todo-modal");
        if (!modal) {
            console.warn("Filter to-do modal not found in DOM");
            return;
        }
        modal.showModal();
    }

}   

const modals = new Modals();

export default modals;  