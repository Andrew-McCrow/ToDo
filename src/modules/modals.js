
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
}   

const modals = new Modals();

export default modals;  