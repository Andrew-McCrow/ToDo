function menuContent() {

// Select the div#content element
const menuContent = document.getElementById('content');

// Add main heading to the content div
const heading = document.createElement('h1');
heading.textContent = "Menu";
menuContent.appendChild(heading);

// Function to create h2 secondary headings
function createSubHeading( content ) {
    const subHeading = document.createElement('h1');
    subHeading.textContent = content;
    const headingClassName = subHeading.className = content.toLowerCase().replace(/\s+/g, '-') + "-heading";
    return { subHeading, headingClassName };
}

// Add appetizers heading to the content div
const appetizersHeading = createSubHeading("Appetizers");
menuContent.appendChild(appetizersHeading.subHeading);

// Add main courses heading to the content div
const mainCoursesHeading = createSubHeading("Main Courses");
menuContent.appendChild(mainCoursesHeading.subHeading);

// Add desserts heading to the content div
const dessertsHeading = createSubHeading("Desserts");
menuContent.appendChild(dessertsHeading.subHeading);

// Add beverages heading to the content div
const beveragesHeading = createSubHeading("Beverages");
menuContent.appendChild(beveragesHeading.subHeading);

// Function to create menu item divs
function createMenuItem(name, description, price) {
    const menuItem = document.createElement('div');
    menuItem.className = "menu-item";

    const itemName = document.createElement('h3');
    itemName.textContent = name;
    menuItem.appendChild(itemName);

    const itemDescription = document.createElement('p');
    itemDescription.textContent = description;
    menuItem.appendChild(itemDescription);

    const itemPrice = document.createElement('p');
    itemPrice.textContent = `$${price.toFixed(2)}`;
    menuItem.appendChild(itemPrice);

    return menuItem;
}

// Add a sample menu item to the appetizers section
const appetizerItem = createMenuItem("Garlic Bread", "Freshly baked with garlic and herbs", 5.99);
appetizersHeading.subHeading.appendChild(appetizerItem);


// Add a sample menu item to the main courses section
const mainCourseItem = createMenuItem("Grilled Salmon", "Fresh salmon with lemon butter sauce", 18.99);
mainCoursesHeading.subHeading.appendChild(mainCourseItem);

// Add a sample menu item to the desserts section
const dessertItem = createMenuItem("Chocolate Cake", "Rich chocolate cake with vanilla ice cream", 7.99);
dessertsHeading.subHeading.appendChild(dessertItem);


// Add a sample menu item to the beverages section
const beverageItem = createMenuItem("Sparkling Wine", "Champagne or sparkling wine from our selection", 12.99);
beveragesHeading.subHeading.appendChild(beverageItem);
}

// export the menuContent Div for use in other modules
export default menuContent;