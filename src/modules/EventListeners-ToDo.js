import data from "./data.js";
import { ToDoRenderer } from "./ToDoRenderer.js";

class ToDoEventListeners {

  constructor() {
    this.toDoList = document.querySelector("#to-do-list");
    this.editToDoModal = document.getElementById("edit-to-do-modal");
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

  init () {
    this.cancelCreateToDoListener();
    this.cancelEditToDoListener();
    this.cancelDeleteToDoListener();
  }

}

export default ToDoEventListeners;