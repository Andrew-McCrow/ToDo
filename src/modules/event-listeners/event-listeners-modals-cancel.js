
class EventListenersCancelModals {

  constructor() {
    this.projectList = document.querySelector("#project-list");
    this.editProjectModal = document.getElementById("edit-project-modal");
  }

  cancelCreateProjectListener() {
    const cancelCreateProjectBtn = document.getElementById("cancel-project-button-modal");
    if (!cancelCreateProjectBtn) {
      console.warn("Cancel create project button not found");
      return;
    }

    cancelCreateProjectBtn.addEventListener("click", () => {
      console.log("Cancel create project button clicked");
      const modal = document.getElementById("new-project-modal");
      if (modal) {
        modal.close();
      } else {
        console.warn("New project modal not found");
      } 
    });
  }

  cancelEditProjectListener() {
    const cancelEditProjectBtn = document.getElementById("cancel-edit-project-button-modal");
    if (!cancelEditProjectBtn) {
      console.warn("Cancel edit project button not found");
      return;
    }

    cancelEditProjectBtn.addEventListener("click", () => {
      console.log("Cancel edit project button clicked");
      const modal = document.getElementById("edit-project-modal");
      if (modal) {
        modal.close();
      } else {
        console.warn("Edit project modal not found");
      } 
    });
  }

  cancelDeleteProjectListener() {
    const cancelDeleteProjectBtn = document.getElementById("cancel-delete-project-button");
    if (!cancelDeleteProjectBtn) {
      console.warn("Cancel delete project button not found");
      return;
    }

    cancelDeleteProjectBtn.addEventListener("click", () => {
      console.log("Cancel delete project button clicked");
      const modal = document.getElementById("confirm-delete-project-modal");
      if (modal) {
        modal.close();
      } else {
        console.warn("Confirm delete project modal not found");
      } 
    });
  }

  cancelCreateToDoListener() {
    const cancelCreateToDoBtn = document.getElementById("cancel-todo-button-modal");
    if (!cancelCreateToDoBtn) {
      console.warn("Cancel create to-do button not found");
      return;
    }
    cancelCreateToDoBtn.addEventListener("click", () => {
      const modal = document.getElementById("new-todo-modal");
      if (modal) {
        modal.close();
      } else {
        console.warn("New to-do modal not found");
      } 
    });
  }

  cancelEditToDoListener() {
    const cancelEditToDoBtn = document.getElementById("cancel-edit-todo-button-modal");
    if (!cancelEditToDoBtn) {
      console.warn("Cancel edit to-do button not found");
      return;
    }
    cancelEditToDoBtn.addEventListener("click", () => {
      const modal = document.getElementById("edit-todo-modal");
      if (modal)  {
        modal.close();
      } else {
        console.warn("Edit to-do modal not found");
      } 
    });
  }

  cancelDeleteToDoListener() {
    const cancelDeleteToDoBtn = document.getElementById("cancel-delete-todo-button");
    if (!cancelDeleteToDoBtn) {
      console.warn("Cancel delete to-do button not found");
      return;
    }
    cancelDeleteToDoBtn.addEventListener("click", () => {
      const modal = document.getElementById("confirm-delete-todo-modal");
      if (modal) {
        modal.close();
      } else {
        console.warn("Confirm delete to-do modal not found");
      } 
    });
  }

  cancelFilterToDoListener() {
    const cancelFilterToDoBtn = document.getElementById("cancel-filter-todo-button");
    if (!cancelFilterToDoBtn) {
      console.warn("Cancel filter to-do button not found");
      return;
    }
    cancelFilterToDoBtn.addEventListener("click", () => {
      const modal = document.getElementById("filter-todo-modal");
      if (modal) {
        modal.close();
      } else {
        console.warn("Filter to-do modal not found");
      } 
    });
  }

  init() {
    this.cancelCreateProjectListener();
    this.cancelEditProjectListener();
    this.cancelDeleteProjectListener();
    this.cancelCreateToDoListener();
    this.cancelEditToDoListener();
    this.cancelDeleteToDoListener();
    this.cancelFilterToDoListener();
}

}
export default EventListenersCancelModals;