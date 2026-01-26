import data from "../config/data.js";
import { ToDoItemRenderer } from "../ui/to-do-renderer.js";

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
                const selectedPriorityFilter = prioritySelect.value;
                const selectedDateFilter = dateSelect.value;

                // Store filter criteria in data module
                data.filterCriteria = {
                    priority: selectedPriorityFilter,
                    dueDate: selectedDateFilter
                };

                // Add "selected" class to active filter buttons (active state is when filters are applied)
                const filterButton = document.getElementById("filter-icon");
                if (selectedPriorityFilter !== "all" || selectedDateFilter !== "all") { 
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

    init() {
        this.applyFilterToDoListener();
    }
}
export default EventListenersFilterToDoItems;
