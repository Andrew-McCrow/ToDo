import { format } from 'date-fns';

// Display, update or remove a project in the DOM
class ProjectRenderer {
  displayProject(project) {

    //Creates project container, something like: <li class="project-container" data-project-name="****"> </li>
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
  const projectContainers = document.querySelectorAll("li.project-container");
  projectContainers.forEach((container) => {
    if (container.dataset.projectName === project.name) {
      container.remove();
    }
  });
}
  
  updateProject(project) {
    // Implement update logic here
  }

  selectedProject(project) {
    project.classList.add("selected");
  }

  deselectProject(project) {
    project.classList.remove("selected");
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
      if (toDoItem.dueDate) {
        itemDueDate.textContent = `Due Date: ${format(new Date(toDoItem.dueDate), 'MMM dd, yyyy')}`;
      } else {
        itemDueDate.textContent = `Due Date: Not set`;
      }
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

    // add to-do item to project's to-do list in the DOM if assigned to a project
    addToDoItemToProject(toDoItem, project) {
      // Only proceed if both the toDoItem and project are assigned
      if (toDoItem.project && project && toDoItem.project === project) {
        const projectContainers = document.querySelectorAll("li.project-container");
        projectContainers.forEach((container) => {
          if (container.dataset.projectName === toDoItem.project.name) {
            const projectToDoList = container.querySelector("ul");
            const projectListItem = document.createElement("li");
            projectListItem.textContent = toDoItem.title;
            projectToDoList.appendChild(projectListItem);
          }
        });
      }
    }

    // remove to-do item from project's to-do list in the DOM
    removeToDoItemFromProject(toDoItem, project) {
      if (toDoItem.project === project) {
        const projectContainers = document.querySelectorAll("li.project-container");
        projectContainers.forEach((container) => {
          if (container.dataset.projectName === toDoItem.project.name) {
            const projectToDoList = container.querySelector("ul");
            const listItems = projectToDoList.querySelectorAll("li");
            listItems.forEach((listItem) => {
              if (listItem.textContent === toDoItem.title) {
                listItem.remove();
              }
            });
          }
        });
      }
    }

    // remove to-do item from DOM & from its project if assigned
    removeToDoItem(toDoItem) {
      // First remove from project if it has one
      if (toDoItem.project) {
        this.removeToDoItemFromProject(toDoItem, toDoItem.project);
      }
      const itemContainers = document.querySelectorAll("li.todo-item-container");
      itemContainers.forEach((container) => {
        const itemTitle = container.querySelector("h3").textContent;
        if (itemTitle === toDoItem.title) {
          container.remove();
        }
      }); 
    }

    updateToDoItem(toDoItem) {
      // Implement update logic here  
    }

}

// Display the list of projects in a dropdown or selection element
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