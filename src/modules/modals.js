import data from "./data.js";


class Modals {

    // Helper method to pre-fill edit modal form inputs
    prefillModalInput(inputId, value) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) {
        console.warn(`Input element with ID ${inputId} not found`);
        return;
    }
    // Check if it's a select element
    if (inputElement.tagName.toLowerCase() === "select") {
        // Convert value to string to ensure comparison works
        const valueStr = String(value || "").trim();
        inputElement.value = valueStr;
        console.log(`Set ${inputId} to: ${valueStr}`); // Debug log
        return;
    }
    // For arrays (notes, checklist), convert to string
    if (Array.isArray(value)) {
        inputElement.value = value.join(", ") || "";
        return;
    }
    // For text inputs, textareas, date inputs, etc.
    inputElement.value = value || "";
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
        const projectSelect = document.getElementById("project-assignment");
        if (!projectSelect) {
            console.warn("Project assignment select element not found");
            return;
        }
        // Clear existing options
        projectSelect.innerHTML = '<option value="">None</option>';
        data.getProjects().forEach((project) => {
            const option = document.createElement("option");
            option.value = project.projectId;
            option.textContent = project.name;
            projectSelect.appendChild(option);
        });

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
        this.prefillModalInput("edit-todo-priority", toDoItem.priority?.toLowerCase()); // Select element
        this.prefillModalInput("edit-todo-notes", toDoItem.notes);
        this.prefillModalInput("edit-project-assignment", toDoItem.projectId); // Select element
       
        modal.showModal();
    }

}   

const modals = new Modals();

export default modals;  