// Display a project in the DOM
function displayProject(project) {
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");

  const projectTitle = document.createElement("h2");
  projectTitle.textContent = project.name;
  projectContainer.appendChild(projectTitle);

  const toDoList = document.createElement("ul");
  project.toDoItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item.title;
    toDoList.appendChild(listItem);
  });

  projectContainer.appendChild(toDoList);
  const projectList = document.querySelector("#project-list");
  projectList.appendChild(projectContainer);
}

// Display a to-do item in the DOM
function displayToDoItem(toDoItem) {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("todo-item-container");

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

  const itemList = document.querySelector("#todo-list");
  itemList.appendChild(itemContainer);
}

export { displayProject, displayToDoItem };