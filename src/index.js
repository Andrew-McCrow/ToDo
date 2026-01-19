import "./styles.css";
import homePageContent from "./pages/homepage.js";
import menuContent from "./pages/menu.js";  
import contactContent from "./pages/contact.js";

console.log('Hello, Restaurant Page!');
// Initial load of homepage content
homePageContent();

// Event listener for home button
const homeBtn = document.getElementById('home');
homeBtn.addEventListener('click', () => {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    homePageContent();
});

// Event listener for menu button
const menuBtn = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    menuContent();
});


// Event listener for contact button
const contactBtn = document.getElementById('contact');
contactBtn.addEventListener('click', () => {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    contactContent();
});
