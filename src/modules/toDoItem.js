// Utility function to get today's date in YYYY-MM-DD format
const getTodayDate = () => new Date().toISOString().split('T')[0];

// ToDoItem class - represents a single to-do item
class ToDoItem {
  static nextId = 1;
  
  constructor(name, description, dueDate = getTodayDate(), priority, notes, projectId = null) {
    this.toDoId = String(ToDoItem.nextId++);
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.projectId = projectId;

    this.isCompleted = false;
  }  

  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
  }

  // Check if this to-do item belongs to a specific project (returns boolean)
  toDoItemByProjectId(projectId) {
    return this.projectId === projectId;
  }

}

export default ToDoItem;