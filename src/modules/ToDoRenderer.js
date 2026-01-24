import { format } from 'date-fns';
import data from './data.js';

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

      // create to-do item description element
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
    
      // create project assignment element
      const toDoProject = document.createElement("p");
      toDoProject.textContent = `Project: ${toDoItem.projectId ? data.getProjectById(toDoItem.projectId).name : "None"}`;
      itemContainer.appendChild(toDoProject);

      // add edit button for to-do item
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit To-Do Item";
      editBtn.className = "edit-todo-button";
      editBtn.dataset.toDoId = toDoItem.toDoId;
      itemContainer.appendChild(editBtn);

      // add delete button for to-do item
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete To-Do Item";
      deleteBtn.className = "delete-todo-button";
      deleteBtn.dataset.toDoId = toDoItem.toDoId;
      itemContainer.appendChild(deleteBtn);

      // append to-do item container to main to-do list in DOM
      const itemList = document.querySelector("#todo-list");
      itemList.appendChild(itemContainer);
    }

    updateToDoItemById(toDoId, updatedToDoItem) {
      const toDoContainers = document.querySelectorAll("li.todo-item-container");
      toDoContainers.forEach((container) => {
        if (container.dataset.toDoId === toDoId) {
          // Update name
          const itemNameElement = container.querySelector("h3");
          itemNameElement.textContent = updatedToDoItem.name;
          // Update description
          const itemDescriptionElement = container.querySelector("p:nth-of-type(1)");
          itemDescriptionElement.textContent = updatedToDoItem.description;
          // Update due date
          const itemDueDateElement = container.querySelector("p:nth-of-type(2)");
          if (updatedToDoItem.dueDate) {
            itemDueDateElement.textContent = `Due Date: ${format(new Date(updatedToDoItem.dueDate), 'MMM dd, yyyy')}`;
          } else {
            itemDueDateElement.textContent = `Due Date: Not set`;
          }
          // Update priority
          const itemPriorityElement = container.querySelector("p:nth-of-type(3)");
          itemPriorityElement.textContent = `Priority: ${updatedToDoItem.priority}`;
          // Update notes
          const notesElement = container.querySelector("p:nth-of-type(4)");
          notesElement.textContent = `Notes: ${updatedToDoItem.notes}`;
          // Update project assignment with null check
          const toDoProjectElement = container.querySelector("p:nth-of-type(5)");
          const projectName = updatedToDoItem.projectId 
            ? data.getProjectById(updatedToDoItem.projectId)?.name || "None" 
            : "None";
          toDoProjectElement.textContent = `Project: ${projectName}`;
        }
      });
    }

    updateProjectNameInToDoItemsByProjectId(projectId, newProjectName) {
      const toDoContainers = document.querySelectorAll("li.todo-item-container");
      toDoContainers.forEach((container) => {
        const toDoId = container.dataset.toDoId;
        const toDoItem = data.getToDoItemById(toDoId);
        if (toDoItem && toDoItem.projectId === projectId) {
          const toDoProjectElement = container.querySelector("p:nth-of-type(5)");
          toDoProjectElement.textContent = `Project: ${newProjectName}`;
        }
      });
    } 

    removeToDoItemById(toDoId) {
      const toDoContainers = document.querySelectorAll("li.todo-item-container");
      toDoContainers.forEach((container) => {
        if (container.dataset.toDoId === toDoId) {
          container.remove();
        }
      });
    }
}

export { ToDoItemRenderer };