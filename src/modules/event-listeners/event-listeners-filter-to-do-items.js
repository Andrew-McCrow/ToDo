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

                // If "all" is selected for everything, show all todos
                if (selectedPriorityFilter === "all" && selectedDateFilter === "all" && selectedProjectFilter === "all") {
                    allTodoContainers.forEach(todo => {
                        todo.style.display = "block";
                    });
                } else {
                    // Apply filters using ToDoServices
                    const filteredToDoIds = ToDoServices.filterToDos({
                        priority: selectedPriorityFilter,
                        project: selectedProjectFilter
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

    init() {
        this.applyFilterToDoListener();
        this.populateProjectFilterOptions();
    }
}
export default EventListenersFilterToDoItems;
