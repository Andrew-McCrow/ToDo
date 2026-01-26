class Data {
    constructor() {
        this.projectList = [];
        this.toDoItemList = [];
        this.selectedProjectId = null;
        this.filterCriteria = null;
    }

    // Project methods
    getProjects() {
        return this.projectList;
    }

    addProject(project) {
        this.projectList.push(project);
    }

    removeProjectById(projectId) {
        this.projectList = this.projectList.filter(p => p.projectId !== projectId);
    }

    getProjectById(projectId) {
        const project = this.projectList.find(p => p.projectId === projectId);
        if (!project) console.warn(`Project ${projectId} not found`);
        return project;
    }

    removeToDoItemFromProjectById(toDoId) {
        this.projectList.forEach(project => {
            project.toDoItems = project.toDoItems.filter(item => item.toDoId !== toDoId);
        });
    }

    addToDoItemToProjectById(toDoItem, projectId) {
        const project = this.getProjectById(projectId);
        if (project) {
            project.toDoItems.push(toDoItem);
        } else {
            console.warn(`Cannot add To-Do Item to non-existent Project ${projectId}`);
        }
    }
    // Clear projectId from all to-do items belonging to a project
    clearProjectFromToDoItems(projectId) {
        this.toDoItemList.forEach(item => {
            if (item.projectId === projectId) {
                item.projectId = null;
            }
        });
    }

    // To-Do methods
    getToDoItems() {
        return this.toDoItemList;
    }

    addToDoItem(toDoItem) {
        this.toDoItemList.push(toDoItem);
    }

    removeToDoItemById(toDoId) {
        this.toDoItemList = this.toDoItemList.filter(item => item.toDoId !== toDoId);
    }

    getToDoItemById(toDoId) {
        const toDoItem = this.toDoItemList.find(item => item.toDoId === toDoId);
        if (!toDoItem) console.warn(`To-Do Item ${toDoId} not found`);
        return toDoItem;
    }

    // To-Do Filter methods (using getter/setters)

    get getFilterCriteria() {
        return this.filterCriteria;
    }

    set setFilterCriteria(criteria) {
        this.filterCriteria = criteria;
    }

}

// instantiate global data object
const data = new Data();

export default data;