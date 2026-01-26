class EventListenersShowModals {
  constructor(modals) {
    this.modals = modals;
    this.addProjectBtn = document.querySelector("#add-project-button");
    this.addToDoBtn = document.querySelector("#add-todo-button");
    this.projectList = document.querySelector("#project-list");
    this.todoList = document.querySelector("#todo-list");
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

  deleteProjectListener() {
    if (!this.projectList) return;
    // Listen on parent container for any delete button clicks
    this.projectList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-project-button")) {
        const projectId = e.target.dataset.projectId;
        console.log("Delete project:", projectId);
        this.modals.displayConfirmDeleteProjectModal(projectId);
      }
    });
  }

  deleteToDoItemListener() {
    if (!this.todoList) return;
    // Listen on parent container for any delete button clicks
    this.todoList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-todo-button")) {
        const toDoId = e.target.dataset.toDoId;
        console.log("Delete todo:", toDoId);
        this.modals.displayConfirmDeleteToDoModal(toDoId);
      }
    });
  }

  editProjectListener() {
    if (!this.projectList) return;
    // Listen on parent container for any edit button clicks
    this.projectList.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit-project-button")) {
        const projectId = e.target.dataset.projectId;
        console.log("Edit project:", projectId);
        this.modals.displayEditProjectModal(projectId);
      }
    });
  }

  editToDoItemListener() {
    if (!this.todoList) return;
    // Listen on parent container for any edit button clicks
    this.todoList.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit-todo-button")) {
        const toDoId = e.target.dataset.toDoId;
        console.log("Edit todo:", toDoId);
        this.modals.displayEditToDoModal(toDoId);
      }
    });
  }

  filterToDoListener() {
    const filterButton = document.querySelector("#filter-icon");
    if (!filterButton) return;
    filterButton.addEventListener("click", () => {
      this.modals.displayFilterToDoModal();
    });
  }

  init() {
    this.addProjectButtonListener();
    this.addToDoButtonListener();
    this.deleteProjectListener();
    this.deleteToDoItemListener();
    this.editProjectListener();
    this.editToDoItemListener();
    this.filterToDoListener();
  }

}

export default EventListenersShowModals;