// Project class - represents a project containing multiple to-do items
class Project {
  constructor(name) {
    this.name = name;
    this.toDoItems = [];
  }

  addToDoItem(toDoItem) {
    this.toDoItems.push(toDoItem);
    toDoItem.project = this;
  }

  removeToDoItem(toDoItem) {
    this.toDoItems = this.toDoItems.filter(item => item !== toDoItem);
    toDoItem.project = null;
  }

  getToDoItems() {
    return this.toDoItems;
  }

}

export default Project;