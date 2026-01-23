import modals from "./modals.js";

class EventListeners {
  constructor(modals) {
    this.modals = modals;
    this.addProjectBtn = document.querySelector("#add-project-button");
    this.addToDoBtn = document.querySelector("#add-todo-button");
  }

  init() {
    this.addProjectButtonListener();
    this.addToDoButtonListener();
  }

  addProjectButtonListener() {
    if (!this.addProjectBtn) return;
    this.addProjectBtn.addEventListener("click", () => {
      this.modals.displayProjectModal();
    });
  }
  
  addToDoButtonListener() {
    if (!this.addToDoBtn) return;
    this.addToDoBtn.addEventListener("click", () => {
      this.modals.displayToDoItemModal();
    });
  }
}

const eventListeners = new EventListeners(modals);
export default eventListeners;