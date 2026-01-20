// Display, update or remove a project in the DOM
class ProjectRenderer {
  displayProject(project) {
    const projectContainer = document.createElement("li");
    projectContainer.classList.add("project-container");
    projectContainer.dataset.projectName = project.name; 

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
    deleteBtn.className = "delete-project-button";
    projectContainer.appendChild(deleteBtn);

    // append project container to main project list in DOM
    const projectList = document.querySelector("#project-list");
    projectList.appendChild(projectContainer);
  }

  removeProject(project) {
    project.remove();
  }

  
  selectedProject(project) {
    project.classList.add("selected");
  }

  updateProject(project) {
    // Implement update logic here
  }
}

// Display, update or remove a to-do item in the DOM
class ToDoItemRenderer {
    displayToDoItem(toDoItem) {
    const itemContainer = document.createElement("li");
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

    const notes = document.createElement("p");
    notes.textContent = `Notes: ${toDoItem.notes}`;
    itemContainer.appendChild(notes);  

    const checklist = document.createElement("ul");
    toDoItem.checklist.forEach((checkItem) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${checkItem.item} - ${checkItem.completed ? "Completed" : "Pending"}`;
      checklist.appendChild(listItem);
    });
    itemContainer.appendChild(checklist);
   
    const toDoProject = document.createElement("p");
    toDoProject.textContent = `Project: ${toDoItem.project ? toDoItem.project.name : "None"}`;
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
}

class ProjectListRenderer {
  displayProjectList(projects) {
    const projectListContainer = document.querySelector("#project-assignment");
    projectListContainer.innerHTML = '<option value="">Unassigned</option>'; // Start with unassigned

    projects.forEach((project) => {
      const projectItem = document.createElement("option");
      projectItem.textContent = project.name;
      projectItem.value = project.name;
      projectListContainer.appendChild(projectItem);
    });
  }
}

export { ProjectRenderer, ToDoItemRenderer, ProjectListRenderer };