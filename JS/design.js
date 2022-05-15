/**
 * Research for various aspects of JavaScript syntax and functionality was performed within the following websites
 * MDN Web Docs - https://developer.mozilla.org/en-US/
 * W3 Schools - https://www.w3schools.com/
 * No part of this project was plaigarized. I resent the accusation of plaigarism against my previous project submssion. I am fully capable of explaining and recreating the HTML, CSS, and JavaScript used to create this and my prior project submission. 
*/
/**
 *@description - Global variables that may be referenced in multiple functions
*/
const categories = document.getElementsByClassName('menu_category');
const menuNav = document.getElementById('menu_nav');

/**
 * @description - uses the numerical values of the getBoundingClientRect method to check if a specified element is currently displayed in the viewport
 * @param - accepts any HTML element
 * @returns - a boolean true or false
 * @author - Method tutorial courtesy of JavaScript Tutorial - https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
*/ 
function isInViewport(element) {
    let rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight) &&
        rect.right <= (window.innerWidth)
    );
}

/**
 * @description - creates a 'li' element with an anchor to a specific section for each section in the document and appends the 'li' elements to the navigation bar
*/
function buildNav() {
    for (let category of categories) {
        let navLabel = document.createElement('li');
        let navAnchor = document.createElement('a');
        let linkText = category.attributes[0].value;
        navLabel.appendChild(navAnchor);
        navAnchor.outerHTML = '<a class="menu_anchor" href=#'+linkText+'>'+linkText+'</a>';
        menuNav.appendChild(navLabel);
    }
}

/**
 * @description - listens for a click event on each menuNav button and replaces the default jump behavior with a smooth scroll to the referenced section
*/
function smoothScroll() {
    let navAnchors = document.querySelectorAll('a.menu_anchor');

    for (let i = 0; i < navAnchors.length; i++) {
        navAnchors[i].addEventListener('click', function(event) {
            event.preventDefault();
            categories[i].scrollIntoView({behavior:'smooth', block:'center'});
        });  
    }
}

/**
 * @description - adds a click event listener to each navigation anchor and adds the active styling to the selected anchor after removing the active styling from any previously active anchors
*/
function highlightNav() {
    let anchors = document.getElementsByClassName('menu_anchor');

    for (let anchor of anchors) {
        anchor.addEventListener('click', function() {
            for (let anchor of anchors) {
                anchor.classList.remove('anchor_active');
                this.classList.add('anchor_active');
            }
        })
    }
}

/**
 * @description - determines if each category element is inside the viewport based on the return value of the isInViewport function and applies or removes the active styles 
*/
function applyActiveClass() {
    document.addEventListener('scroll', function() {
        for (let category of categories) {
            if (isInViewport(category) === true) {
                category.classList.add('category_active');
            }else category.classList.remove('category_active');
        }
    })
}

/**
 * @description - Sequence of Event Listeners. Builds the nav first, then applys the smooth scroll to the nav buttons, then begins checking sections to add and remove the active styles
*/
document.body.onload = buildNav();
menuNav.onload = smoothScroll(); highlightNav();
window.onscroll = applyActiveClass();

