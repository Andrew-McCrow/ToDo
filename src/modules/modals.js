
class Modals {
  
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
        modal.showModal();
    }

    displayEditToDoModal(toDoId) {
        const modal = document.getElementById("edit-todo-modal");
        if (!modal) {
            console.warn("Edit to-do modal not found in DOM");
            return;
        }
        modal.dataset.toDoId = toDoId;
        modal.showModal();
    }

}   

const modals = new Modals();

export default modals;  