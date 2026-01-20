// Display, update or remove a project in the DOM
class ProjectRenderer {
  displayProject(project) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");

    // create project title
    const projectTitle = document.createElement("h2");
    projectTitle.textContent = project.name;
    projectContainer.appendChild(projectTitle);

    // create list of to-do items
    const toDoList = document.createElement("ul");
    project.toDoItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item.title;
      toDoList.appendChild(listItem);
    });
    projectContainer.appendChild(toDoList);

    // add delete button for project
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Project";
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener("click", () => {
      projectContainer.remove();
    });
    projectContainer.appendChild(deleteBtn);

    // append project container to main project list in DOM
    const projectList = document.querySelector("#project-list");
    projectList.appendChild(projectContainer);
  }

  updateProject(project) {
    // Implement update logic here
  }
}

// Display, update or remove a to-do item in the DOM
class ToDoItemRenderer {
    displayToDoItem(toDoItem) {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("todo-item-container");

    // create to-do item details
    const itemTitle = document.createElement("h3");
    itemTitle.textContent = toDoItem.title;
    itemContainer.appendChild(itemTitle);

    const itemDescription = document.createElement("p");
    itemDescription.textContent = toDoItem.description;
    itemContainer.appendChild(itemDescription);

    const itemDueDate = document.createElement("p");
    itemDueDate.textContent = `Due Date: ${toDoItem.dueDate}`;
    itemContainer.appendChild(itemDueDate);

    const itemPriority = document.createElement("p");
    itemPriority.textContent = `Priority: ${toDoItem.priority}`;
    itemContainer.appendChild(itemPriority);

    // add delete button for to-do item
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete To-Do Item";
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener("click", () => {
      itemContainer.remove();
    });
    itemContainer.appendChild(deleteBtn);

    // append to-do item container to main to-do list in DOM
    const itemList = document.querySelector("#todo-list");
    itemList.appendChild(itemContainer);
  }
}

export { ProjectRenderer, ToDoItemRenderer };