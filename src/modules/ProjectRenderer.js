import { format } from 'date-fns';

// Display, update or remove a project in the DOM
class ProjectRenderer {

  displayProject(project) {

    //Creates project container element, something like: <li class="project-container" data-project-name="****"> </li>
    const projectContainer = document.createElement("li");
    projectContainer.classList.add("project-container");
    projectContainer.dataset.projectId = project.projectId; 

    // create project title element
    const projectName = document.createElement("h2");
    projectName.textContent = project.name;
    projectContainer.appendChild(projectName);

    // create to-do items list element
    const toDoList = document.createElement("ul");
    project.toDoItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item.name;
      toDoList.appendChild(listItem);
    });
    projectContainer.appendChild(toDoList);

    // add delete button element for project
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Project";
    deleteBtn.className = "delete-project-button";
    projectContainer.appendChild(deleteBtn);

    // append project container to main project list in DOM
    const projectList = document.getElementById("project-list");
    if (!projectList) {
      console.warn("Project list not found in DOM");
      return;
    }
    projectList.appendChild(projectContainer);    
  }

  removeProjectById(projectId) {
  const projectContainers = document.querySelectorAll("li.project-container");
  projectContainers.forEach((container) => {
    if (container.dataset.projectId === projectId) {
      container.remove();
    }
  });
}
  
  updateProjectNameById(projectId, newName) {
    const projectContainers = document.querySelectorAll("li.project-container");
    projectContainers.forEach((container) => {
      if (container.dataset.projectId === projectId) {
        const projectNameElement = container.querySelector("h2");
        projectNameElement.textContent = newName;
      }
    });
  }

  addToDoItemToProjectById(toDoItem, projectId) {
    const projectContainers = document.querySelectorAll("li.project-container");
    projectContainers.forEach((container) => {
      if (container.dataset.projectId === projectId) {
        const projectToDoList = container.querySelector("ul");
        const projectListItem = document.createElement("li");
        projectListItem.textContent = toDoItem.name;
        projectToDoList.appendChild(projectListItem);
      }
    });
  }

  removeToDoItemFromProjectById(toDoItem, projectId) {
    const projectContainers = document.querySelectorAll("li.project-container");
    projectContainers.forEach((container) => {
      if (container.dataset.projectId === projectId) {
        const projectToDoList = container.querySelector("ul");
        const listItems = projectToDoList.querySelectorAll("li");
        listItems.forEach((listItem) => {
          if (listItem.textContent === toDoItem.name) {
            listItem.remove();
          }
        });
      }
    });
  }

  selectedProject(project) {
    project.classList.add("selected");
  }

  deselectProject(project) {
    project.classList.remove("selected");
  }

}

export { ProjectRenderer };