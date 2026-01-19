function contactContent() {

// Select the div#content element
const menuContent = document.getElementById('content');

// Add main heading to the content div
const heading = document.createElement('h1');
heading.textContent = "Contact Us";
menuContent.appendChild(heading);

// Function to create h2 secondary headings
function createSubHeading( content ) {
    const subHeading = document.createElement('h1');
    subHeading.textContent = content;
    const headingClassName = subHeading.className = content.toLowerCase().replace(/\s+/g, '-') + "-heading";
    return { subHeading, headingClassName };
}

// Add primary contact information to the content div
const contactInfoHeading = createSubHeading("Primary Contact Information");
menuContent.appendChild(contactInfoHeading.subHeading);

// Add secondary contact information to the content div 
const secondaryContactInfoHeading = createSubHeading("Secondary Contact Information");
menuContent.appendChild(secondaryContactInfoHeading.subHeading);
}

// export the contactContent Div for use in other modules
export default contactContent;