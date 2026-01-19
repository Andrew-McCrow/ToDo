class ToDoItem {
  constructor(title, description, dueDate, priority, notes, checklist, project) {
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

}

export default ToDoItem;