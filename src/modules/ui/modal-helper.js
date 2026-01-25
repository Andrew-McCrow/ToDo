import data from "../config/data.js";

class ModalHelper {

    // Helper method to add project options to project assignment select elements
    addProjectOptionsToSelectElements(selectElementId) {
        const projectSelect = document.getElementById(selectElementId);
        if (!projectSelect) {
            console.warn("Project assignment select element not found");
            return;
        }
        // Clear existing options
        projectSelect.innerHTML = '<option value="">None</option>';
        data.getProjects().forEach((project) => {
            const option = document.createElement("option");
            option.value = project.projectId;
            option.textContent = project.name;
            projectSelect.appendChild(option);
        });
    }

    // Helper method to pre-fill edit modal form inputs
    prefillModalInput(inputId, value) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) {
        console.warn(`Input element with ID ${inputId} not found`);
        return;
    }
    // Check if it's a select element
    if (inputElement.tagName.toLowerCase() === "select") {
        // Convert value to string to ensure comparison works
        const valueStr = String(value || "").trim();
        inputElement.value = valueStr;
        console.log(`Set ${inputId} to: ${valueStr}`); // Debug log
        return;
    }
    // For text inputs, textareas, date inputs, etc.
    inputElement.value = value || "";
    }

}   

const modalHelper = new ModalHelper();

export default modalHelper;  