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

}

export default Project;