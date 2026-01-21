// Utility function to get today's date in YYYY-MM-DD format
const getTodayDate = () => new Date().toISOString().split('T')[0];

// ToDoItem class - represents a single to-do item
class ToDoItem {
  constructor(title, description, dueDate = getTodayDate(), priority, notes = [], checklist = [], project = null) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.project = project;

    this.isCompleted = false;
  }  

  toggleCompletion() {
    this.isCompleted = !this.isCompleted;
  }

  addNote(note) {
    this.notes.push(note);
  }

  addChecklistItem(item) {
    this.checklist.push({ item: item, completed: false });
  }

  markChecklistItemCompleted(index) {
    if (this.checklist[index]) {
      this.checklist[index].completed = true;
    }
  }

  // Check if this to-do item belongs to a specific project (returns boolean)
  toDoItemByProject(project) {
    return this.project === project;
  }

}

export default ToDoItem;