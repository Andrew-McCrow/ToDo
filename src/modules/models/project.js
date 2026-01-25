// Project class - represents a project containing multiple to-do items
class Project {
static nextId = 1;

  constructor(name) {
    this.projectId = String(Project.nextId++);
    this.name = name;
    this.toDoItems = [];
  }

  getProjectId() {
    return this.projectId;
  }

  getToDoItems() {
      return this.toDoItems;
    }

  getToDoItemById(toDoId) {
      return this.toDoItems.find(item => item.toDoId === toDoId);
    }

  addToDoItem(toDoItem) {
    this.toDoItems.push(toDoItem);
  }

  removeToDoItemById(toDoId) {
    this.toDoItems = this.toDoItems.filter(item => item.toDoId !== toDoId);
  }

}

export default Project;