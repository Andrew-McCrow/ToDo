class Project {
  constructor(name) {
    this.name = name;
    this.toDoItems = [];
  }

  addToDoItem(toDoItem) {
    this.toDoItems.push(toDoItem);
    toDoItem.project = this;
  }
}

export default Project;