import Project from "./Project.js";
import ToDoItem from "./ToDoItem.js";
import data from "./data.js";
import { ProjectRenderer } from "./ProjectRenderer.js";
import { ToDoItemRenderer } from "./ToDoRenderer.js";

function ExampleProjectAndToDo() {
    // create a new example project and to-do item
    const exampleProject = new Project("My First Project");
    const exampleToDoItem = new ToDoItem(
      "Buy groceries",
      "Milk, Bread, Eggs",
      "2024-07-01",
      "High",
      "Remember to check for discounts.",
      exampleProject.projectId
    );
    // Add example to-do to example project
    exampleProject.addToDoItem(exampleToDoItem);

    // Add example project & to-do item to global lists
    data.addProject(exampleProject);
    data.addToDoItem(exampleToDoItem);

    // Render example project and to-do item in the DOM
    const exampleProjectRenderer = new ProjectRenderer();
    const exampleToDoItemRenderer = new ToDoItemRenderer();
    exampleProjectRenderer.displayProject(exampleProject); 
    exampleToDoItemRenderer.displayToDoItem(exampleToDoItem); 

}

export default ExampleProjectAndToDo;