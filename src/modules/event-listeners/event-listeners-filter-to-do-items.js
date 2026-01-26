import data from "../config/data.js";
import { ToDoServices } from "../services/to-do-services.js";
import { ToDoItemRenderer } from "../ui/to-do-renderer.js";
import modalHelper from "../ui/modal-helper.js";

class EventListenersFilterToDoItems {
    applyFilterToDoListener() {
        const applyFiltersBtn = document.getElementById("apply-filter-todo-button");
        if (!applyFiltersBtn) {
            console.warn("Apply filter to-do button not found");
            return;
        }
        applyFiltersBtn.addEventListener("click", () => {
            const modal = document.getElementById("filter-todo-modal");
            if (!modal) {
                console.warn("Filter to-do modal not found");
                return;
            }

            try {
                // Get filter criteria from modal inputs
                const prioritySelect = document.getElementById("filter-priority");
                const dateSelect = document.getElementById("filter-due-date");
                const projectSelect = document.getElementById("filter-project");
                const selectedPriorityFilter = prioritySelect.value;
                const selectedDateFilter = dateSelect.value;
                const selectedProjectFilter = projectSelect.value;

                // Store filter criteria in data module
                data.filterCriteria = {
                    priority: selectedPriorityFilter,
                    dueDate: selectedDateFilter,
                    project: selectedProjectFilter
                };

                // Get all todo containers
                const allTodoContainers = document.querySelectorAll("li.todo-item-container");
                const allProjectContainers = document.querySelectorAll("li.project-container");

                // If "all" is selected for everything, show all todos and projects
                if (selectedPriorityFilter === "all" && selectedDateFilter === "all" && selectedProjectFilter === "all") {
                    allTodoContainers.forEach(todo => {
                        todo.style.display = "block";
                    });
                    allProjectContainers.forEach(project => {
                        project.style.display = "block";
                        project.classList.remove("selected");
                    });
                    data.selectedProjectId = null;
                    
                    // Update header
                    const todoHeader = document.getElementById("todo-header");
                    if (todoHeader) {
                        todoHeader.textContent = "To-Do Items - All Projects";
                    }
                } else {
                    // Apply filters using ToDoServices
                    const filteredToDoIds = ToDoServices.filterToDos({
                        priority: selectedPriorityFilter,
                        project: selectedProjectFilter,
                        dueDate: selectedDateFilter
                    });

                    // Hide all todos first
                    allTodoContainers.forEach(todo => {
                        todo.style.display = "none";
                    });

                    // Show only filtered todos
                    for (const toDoId of filteredToDoIds) {
                        const todoElement = document.querySelector(`li.todo-item-container[data-to-do-id="${toDoId}"]`);
                        if (todoElement) {
                            todoElement.style.display = "block";
                        }
                    }
                    
                    // Determine which projects have visible todos
                    const projectsWithVisibleTodos = new Set();
                    filteredToDoIds.forEach(toDoId => {
                        const todoItem = data.getToDoItemById(toDoId);
                        if (todoItem && todoItem.projectId) {
                            projectsWithVisibleTodos.add(todoItem.projectId);
                        }
                    });
                    
                    // Filter projects if a specific project is selected
                    if (selectedProjectFilter !== "all" && selectedProjectFilter !== "") {
                        allProjectContainers.forEach(project => {
                            project.classList.remove("selected");
                            if (project.dataset.projectId === selectedProjectFilter) {
                                project.style.display = "block";
                                project.classList.add("selected");
                            } else {
                                project.style.display = "none";
                            }
                        });
                        data.selectedProjectId = selectedProjectFilter;
                        
                        // Update header with project name
                        const project = data.getProjectById(selectedProjectFilter);
                        const todoHeader = document.getElementById("todo-header");
                        if (todoHeader && project) {
                            todoHeader.textContent = `To-Do Items - ${project.name}`;
                        }
                    } else {
                        // Handle "all" or "none" filter
                        data.selectedProjectId = null;
                        
                        const todoHeader = document.getElementById("todo-header");
                        
                        if (selectedProjectFilter === "") {
                            // "None" selected - hide all projects
                            allProjectContainers.forEach(project => {
                                project.style.display = "none";
                                project.classList.remove("selected");
                            });
                            if (todoHeader) {
                                todoHeader.textContent = "To-Do Items - No Project Assigned";
                            }
                        } else {
                            // "All" selected - show only projects with visible todos
                            allProjectContainers.forEach(project => {
                                project.classList.remove("selected");
                                const projectId = project.dataset.projectId;
                                if (projectsWithVisibleTodos.has(projectId)) {
                                    project.style.display = "block";
                                } else {
                                    project.style.display = "none";
                                }
                            });
                            if (todoHeader) {
                                todoHeader.textContent = "To-Do Items - All Projects";
                            }
                        }
                    }
                }
            
                 // Add "selected" class to active filter buttons (active state is when filters are applied)
                const filterButton = document.getElementById("filter-icon");
                if (selectedPriorityFilter !== "all" || selectedDateFilter !== "all" || selectedProjectFilter !== "all") { 
                    filterButton.classList.add("selected");
                } else {
                    filterButton.classList.remove("selected");  
                }

                // Close modal
                modal.close();    

            }   catch (error) {     
                console.error("Failed to apply filter to-dos:", error);
                alert(error.message);
            }
        });
  }

    populateProjectFilterOptions() {
        // Populate when filter icon is clicked
        const filterIcon = document.getElementById("filter-icon");
        if (filterIcon) {
            filterIcon.addEventListener("click", () => {
                modalHelper.addProjectOptionsToSelectElements("filter-project", true);
                
                // Restore previously selected project filter if it exists
                const projectSelect = document.getElementById("filter-project");
                if (projectSelect && data.filterCriteria && data.filterCriteria.project !== undefined) {
                    projectSelect.value = data.filterCriteria.project;
                }
            });
        }
    }

    clearAllFiltersListener() {
        const clearAllBtn = document.getElementById("clear-all-filters-button");
        if (!clearAllBtn) {
            console.warn("Clear all filters button not found");
            return;
        }
        clearAllBtn.addEventListener("click", () => {
            // Reset all dropdowns to default
            document.getElementById("filter-priority").value = "all";
            document.getElementById("filter-due-date").value = "all";
            document.getElementById("filter-project").value = "all";
            
            // Clear filter criteria in data
            data.filterCriteria = {
                priority: "all",
                dueDate: "all",
                project: "all"
            };
            
            // Show all todos and projects
            const allTodoContainers = document.querySelectorAll("li.todo-item-container");
            const allProjectContainers = document.querySelectorAll("li.project-container");
            
            allTodoContainers.forEach(todo => {
                todo.style.display = "block";
            });
            
            allProjectContainers.forEach(project => {
                project.style.display = "block";
                project.classList.remove("selected");
            });
            
            data.selectedProjectId = null;
            
            // Update header
            const todoHeader = document.getElementById("todo-header");
            if (todoHeader) {
                todoHeader.textContent = "To-Do Items - All Projects";
            }
            
            // Remove selected class from filter button
            const filterButton = document.getElementById("filter-icon");
            if (filterButton) {
                filterButton.classList.remove("selected");
            }
        });
    }

    init() {
        this.applyFilterToDoListener();
        this.populateProjectFilterOptions();
        this.clearAllFiltersListener();
    }
}
export default EventListenersFilterToDoItems;
