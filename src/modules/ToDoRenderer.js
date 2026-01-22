import { format } from 'date-fns';
import data from './Data.js';

// Display, update or remove a to-do item in the DOM
class ToDoItemRenderer {
    displayToDoItem(toDoItem) {
      // create to-do item container element
      const itemContainer = document.createElement("li");
      itemContainer.classList.add("todo-item-container");
      itemContainer.dataset.toDoId = toDoItem.toDoId;

      // create to-do item name element
      const itemName = document.createElement("h3");
      itemName.textContent = toDoItem.name;
      itemContainer.appendChild(itemName);

      // create other to-do item details element
      const itemDescription = document.createElement("p");
      itemDescription.textContent = toDoItem.description;
      itemContainer.appendChild(itemDescription);

      // create due date element and set date formatting
      const itemDueDate = document.createElement("p");
      if (toDoItem.dueDate) {
        itemDueDate.textContent = `Due Date: ${format(new Date(toDoItem.dueDate), 'MMM dd, yyyy')}`;
      } else {
        itemDueDate.textContent = `Due Date: Not set`;
      }
      itemContainer.appendChild(itemDueDate);

      // create priority element
      const itemPriority = document.createElement("p");
      itemPriority.textContent = `Priority: ${toDoItem.priority}`;
      itemContainer.appendChild(itemPriority);

      // create notes element
      const notes = document.createElement("p");
      notes.textContent = `Notes: ${toDoItem.notes}`;
      itemContainer.appendChild(notes);  

      // create checklist element
      const checkListTitle = document.createElement("p");
      checkListTitle.textContent = "Checklist:";
      itemContainer.appendChild(checkListTitle);
      const checklist = document.createElement("ul");
      toDoItem.checklist.forEach((checkItem) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${checkItem.item} - ${checkItem.completed ? "Completed" : "Pending"}`;
        checklist.appendChild(listItem);
      });
      itemContainer.appendChild(checklist);
    
      // create project assignment element
      const toDoProject = document.createElement("p");
      toDoProject.textContent = `Project: ${toDoItem.projectId ? data.getProjectById(toDoItem.projectId).name : "None"}`;
      itemContainer.appendChild(toDoProject);

      // add delete button for to-do item
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete To-Do Item";
      deleteBtn.className = "delete-todo-button";
      itemContainer.appendChild(deleteBtn);

      // append to-do item container to main to-do list in DOM
      const itemList = document.querySelector("#todo-list");
      itemList.appendChild(itemContainer);
    }

    removeToDoItemById(toDoId) {
      const toDoContainers = document.querySelectorAll("li.todo-item-container");
      toDoContainers.forEach((container) => {
        if (container.dataset.toDoId === toDoId.toString()) {
          container.remove();
        }
      });
    }
}

export { ToDoItemRenderer };