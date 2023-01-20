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

 // storing the unorderlist into variable
const mainList = document.querySelector('#navbar__list');
// storing the sections into variable
const sections = document.querySelectorAll('section'); 
// creating the fragment to minimum the reflow and repaint
const fragment = document.createDocumentFragment();


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildTheNav () {
    for (const section of sections) {
        const listItem = document.createElement('li');    //creating the list item  
        listItem.className = 'navbar__menu li';           // adding the class to list item
        const linkItem = document.createElement('a');    //creating the anchor 
        linkItem.classList.add('menu__link', 'menu__link:hover');     // adding classes to the link
        linkItem.textContent = section.dataset.nav;     // adding the value of the link item
        linkItem.href = `#${section.id}`;    //setting the href for the anchor
        listItem.appendChild(linkItem);      //pending the link item into the listitem
        fragment.appendChild(listItem);     //pending the list item into the fragment
    }
    mainList.appendChild(fragment);        //pending the fragment into the ul 
}





// Add class 'active' to section when near top of viewport
function setClassActive () {
    //using the intersectiong observer
    const links = document.querySelectorAll('a.menu__link');      // getting all the links
    const observer = new IntersectionObserver (entries => {       // declaring observer
        entries.forEach(ent => {          //looping over the items being observed
            if(ent.isIntersecting) {      //checking if the item is intersecting
                ent.target.classList.add('your-active-class'); //adding active class if intersecting
                links.forEach(link => {        //looping over the links
                    if (link.textContent === ent.target.dataset.nav) {     //checking which link belongs to the section
                        link.classList.add('active-link')               //adding active class to the link
                    } else {
                        link.classList.remove('active-link')            //removing active class from the link
                    }
                })
            } else {
                ent.target.classList.remove('your-active-class'); //removingn the active class when not intersecting
            }
        })
    }, {threshold: 0.5})   //setting the options for the observer when the whole item in the viewport
    sections.forEach(section => {    //looping over sections
        observer.observe(section);   //setting the items we want to observe
    })
}





// Scroll to anchor ID using scrollTO event
function smoothScroll () {       
    
    const listItems = document.querySelectorAll('li'); //getting all the list items
    //looping over the list items
    listItems.forEach(item => {
        item.addEventListener('click', e => {   //  listen to the click event
            e.preventDefault();             //prevent the default fast scroll
            const section = document.querySelector(e.target.getAttribute('href'));   //identify the section
            section.scrollIntoView({behavior: 'smooth'});    //setting the smooth scroll
        } )
    })
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildTheNav();

// Scroll to section on link clickr
smoothScroll();

// Set sections as active
window.addEventListener('scroll', setClassActive());


