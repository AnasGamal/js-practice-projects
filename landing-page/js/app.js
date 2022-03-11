/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section'); // get sections
const navBar = document.getElementById('navbar__list'); // get navbar list
const hamburger = document.querySelector(".hamburger"); // get hamburger

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navBar.classList.toggle("active");
})

document.querySelectorAll("navbar__list").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navBar.classList.remove("active");
}))
// check if element is in viewport
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

 for (const section of sections) { // iterating through sections
    const li = document.createElement('li'); // creating the <li> element that will be added
    const id = section.id; // get the current section id
    li.id = `menu__${id}`; // add unique id to current li
    li.className = `menu__list`; // add same class name to all li
    li.innerHTML = `<a class ="menu__link" onclick="${id}.scrollIntoView({ block: 'end',  behavior: 'smooth' });">${section.getAttribute('data-nav')}</a>`; // adding <a> tag directly inside the <li> element we created with a dynamic link and title
    navBar.appendChild(li); // adding the final <li> element to our navbar.
 }


// Add class 'active' to section when near top of viewport



for (const section of sections) { // iterating through sections
    function makeActive (entries) {
        const [entry] = entries;
        const id = section.id; // get the current section id
        const activeNav = document.getElementById(`menu__${id}`); // get navbar list
        if (entry.isIntersecting) { // in case section is in viewport
          section.classList.add("your-active-class"); // add active class to in viewport section
          activeNav.classList.add("activeNav"); // add active class to in viewport section's url
        } else { // in case section is not in viewport
          section.classList.remove("your-active-class"); // remove active class from out of viewport section
          activeNav.classList.remove("activeNav"); // remove active class from out of viewport section's url
        }
      }
      const options = {
        root: null,
        threshold: 0.52,
        rootMargin: "-52px",
      }
  
const observer = new IntersectionObserver(makeActive, options);
observer.observe(section);
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


