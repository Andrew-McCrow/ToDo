import Project from './project.js';
import ToDoItem from './toDoItem.js';
import { ProjectRenderer, ToDoItemRenderer, ProjectListRenderer } from './DOM.js';

class AppManager {
  constructor() {
    this.projectList = [];
    this.toDoItemList = [];
    this.selectedProject = null;
    this.projectListRenderer = new ProjectListRenderer();
  }

  // ===== DOM QUERY HELPERS =====
  // These centralize all DOM queries - easier to maintain if selectors change
  getElements() {
    return {
      addProjectBtn: document.querySelector("#add-project-btn"),
      addTodoBtn: document.querySelector("#add-todo-btn"),
      projectModal: document.querySelector("#new-project-modal"),
      projectForm: document.querySelector("#new-project-form"),
      projectNameInput: document.querySelector("#project-name"),
      cancelProjectBtn: document.querySelector("#cancel-project-button"),
      projectList: document.querySelector("#project-list"),
      todoModal: document.querySelector("#new-todo-modal"),
      todoForm: document.querySelector("#new-todo-form"),
      todoNameInput: document.querySelector("#todo-name"),
      todoDescInput: document.querySelector("#todo-description"),
      todoDueDateInput: document.querySelector("#todo-due-date"),
      todoPriorityInput: document.querySelector("#todo-priority"),
      todoNotesInput: document.querySelector("#todo-notes"),
      todoChecklistInput: document.querySelector("#todo-checklist"),
      projectAssignInput: document.querySelector("#project-assignment"),
      cancelTodoBtn: document.querySelector("#cancel-todo-button"),
      todoList: document.querySelector("#todo-list"),
    };
  }

  // ===== HELPER METHODS =====
  // Find project by name instead of searching in HTML
  findProjectByName(name) {
    return this.projectList.find((p) => p.name === name);
  }

  // Find todo by title
  findTodoByTitle(title) {
    return this.toDoItemList.find((item) => item.title === title);
  }

  // ===== PROJECT METHODS =====
  addProject(name) {
    const newProject = new Project(name);
    this.projectList.push(newProject);
    const renderer = new ProjectRenderer();
    renderer.displayProject(newProject);
    this.projectListRenderer.displayProjectList(this.projectList);
    return newProject;
  }

  deleteProject(projectName) {
    const index = this.projectList.findIndex((p) => p.name === projectName);
    if (index !== -1) {
      this.projectList.splice(index, 1);
      this.projectListRenderer.displayProjectList(this.projectList);
    }
  }

  selectProject(projectName) {
    // If clicking same project, deselect it
    if (this.selectedProject?.name === projectName) {
      this.selectedProject = null;
      return null;
    }

    // Otherwise, select the new project
    const project = this.findProjectByName(projectName);
    if (project) {
      this.selectedProject = project;
      return project;
    }
    return null;
  }

  // ===== TODO METHODS =====
  addTodo(todoData) {
    const newTodo = new ToDoItem(
      todoData.title,
      todoData.description,
      todoData.dueDate,
      todoData.priority,
      todoData.notes,
      todoData.checklist,
      todoData.assignedProject
    );

    // Add to project if assigned
    if (todoData.assignedProject) {
      todoData.assignedProject.addToDoItem(newTodo);
    }

    // Add to global list
    this.toDoItemList.push(newTodo);

    // Render in UI
    const renderer = new ToDoItemRenderer();
    renderer.displayToDoItem(newTodo);
    renderer.addToDoItemToProject(newTodo, todoData.assignedProject);

    return newTodo;
  }

  deleteTodo(todoTitle) {
    const todoIndex = this.toDoItemList.findIndex((item) => item.title === todoTitle);
    if (todoIndex !== -1) {
      const todo = this.toDoItemList[todoIndex];
      
      // Remove from project if assigned
      if (todo.project) {
        todo.project.removeToDoItem(todo);
      }

      // Remove from global list
      this.toDoItemList.splice(todoIndex, 1);
    }
  }

  // Get todos to display (either for selected project or all)
  getDisplayTodos() {
    if (this.selectedProject) {
      return this.selectedProject.toDoItems;
    }
    return this.toDoItemList;
  }

  // Clear and re-render all todos based on selection
  renderTodos(elements) {
    elements.todoList.innerHTML = "";
    const todos = this.getDisplayTodos();

    if (todos.length === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.classList.add("empty-state");
      emptyMessage.textContent = this.selectedProject
        ? "No to-do items in this project yet."
        : "No to-do items yet.";
      elements.todoList.appendChild(emptyMessage);
      return;
    }

    const renderer = new ToDoItemRenderer();
    todos.forEach((item) => {
      renderer.displayToDoItem(item);
    });
  }
}

export default AppManager;