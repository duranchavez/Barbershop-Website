// =============
// File: js/main.js
// Vintage Barbershop Project
/// ========================
//------DOM Elements
const yearEL =document.getElementById("year");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileBtn");
const ctaBtn = document.getElementById("ctaBtn");
const callBtn = document.getElementById("callBtn");
const phoneLink =document.getElementById("phoneLink");
const heading = document.getElementById("heroheading");
const featureGrid = document.getElementById("featureGrid");
const nav = document.getElementById("nav");
const siteHeader = document.querySelector(".site-header");
// ------- service Data (Array of objects)
const services = [
    {
    title:"Classic Haircut",
    text:"Timeless cuts with modern precesion tailored to your needs",
    image: "assets/images/Feature-1.jpg"
    },
    {
        title: "Beard trim",
        text:  "Shape and line-up your beard for a clean, sharp finish.",
        image: "assets/images/feature-2.jpg"
    },
    {
        title: "Straight Razor Shave",
        text: "Hot towel treatment with a smooth traditional shave.",
        image: "assets/images/feature-3.jpg"
    }
];
//--------Navigation Data (Array of Object)------
const navLinks = [
    {label:"Home", href:"#hero"},
    {label:"Services", href:"#features"},
    {label:"Book", href:"#cta"},
    {label:"Contact", href:"#footer"}
];
//---- Helpers / Functions---
//Update footer year automactically
const setCurrentYear = () => {
    const now =new Date(); // stores in the variable now the year/month/day/hours/second/milisecond from when the function was called
    yearEL.textContent=now.getFullYear();
};
//Toggle mobile menu open/close
let isMenuOpen = false;
const toggleMobileMenu = () => {
    if (!mobileMenu) return; // stop clause; if mobileMenu doesnt exist
    if (isMenuOpen === false) {
        mobileMenu.classList.add("is-open");
        isMenuOpen = true;
    } else {
        mobileMenu.classList.remove("is-open");
        isMenuOpen = false;
    }
};
// Close mobile menu (used when a link is clicked)
const closeMobileMenu = () => {
    if(!mobileMenu) return; // if the mobileMenu doesnt exist, return nothing;
    mobileMenu.classList.remove("is-open");
    isMenuOpen = false;
};
// Reusable function with parameters ( practice pattern)
const updateHeadingText = (newText) => {
    if (!heading) return;
    heading.textContent = newText;
};
// adds the is-scroled class to the site-header DOM elemant
const handleHeaderOnScroll = () => {
    if(!siteHeader) return;
    if(window.scrollY > 10) {
        siteHeader.classList.add("is-scrolled");
    } else {
        siteHeader.classList.remove("is-scrolled");
    }
};
// -----Event Listeners --
//1)  set year on page load
setCurrentYear();
//2) Hamburger menu toggle
if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        toggleMobileMenu();
    });
}
// 3) Close mobile menu when a mobile link is clicked (event delegation)
if (mobileMenu) {
    mobileMenu.addEventListener("click", (Event) => {
// if they clicked an <a> inside the menu, close it
if (Event.target.tagName === "A") {
    closeMobileMenu();
}
 });
}
// $) CTA Button: "Book now" (placeholder behavior)
if (ctaBtn) {
    ctaBtn.addEventListener("click", () => {
        updateHeadingText("Booking coming next--great choice!");
    });
}
// 5) call Button: "Book now (placeholder)
if (callBtn) {
    callBtn.addEventListener("click", () => {
        // if you later set phoneLink href to tel:. this will work pertficly
        // for now this is a beginner friendly placeholder
        if (phoneLink) {
            updateHeadingText("Call us at "+ phoneLink.textContent);
        } else {
            updateHeadingText("Call feature comming next!");
        }
    });
}
// 6) rounds navbar and makes it sticky
window.addEventListener("scroll", handleHeaderOnScroll);
// Runs once on page load in case user refreshers mid-scrol
handleHeaderOnScroll();
// Teaching Breakdown
// array.forEach( item => {
//// create element
// insert data
// add to page
// });
// this is REAL frontend logic
// Now our fraeture cards are:
// Generated with JS
// Data-driven
// easy to update
// Change ONE object --> UI updates automactically
// 
//  ------ Render Featurea using forEach--------
// const renderFeatures = () => {
//     if (!featureGrid) return;
//     services.forEach(service => {
//         const card = document.createElement("article");
//         card.classList.add("feature-card"); // innerHTML  allows us to read or change  anything inside of an element it has accses to
//         card.innerHTML = ` 
//         <img src="${service.image}" alt="${service.title}" class="feature-img"
//         />
//         <h3 class="feature-title">${service.title}</h3>
//         <p = class="feature-text">${service.text}</p>
//         `; // tempeteliterals uses the `${}` and allows us to structure how we want our data returned
//         featureGrid.appendChild(card);
//     });
// };

// = assigns the value of

// -------- Function Calls -----
const renderFeaturesMap = () => {
    const cardsHTML = services.map( service => {
        return `
        <article class="feature-card">
        <img src="${service.image}" alt="${service.title}" class="feature-img" />
        <h3 class="feature-title">${service.title}</h3>
        <p class="feature-text">${service.text}</p>
        </article>
        `;
    }).join("");
    featureGrid.innerHTML = cardsHTML;// cardsHTML = ['<article></article>','<article></article>','<article></article>']
};

//------ Render Navigation using map()------
const renderNavigation = () => {
    // Desktop nav
    if (nav) {
        const navHTML = navLinks.map(link => {
            return `
            <a href="${link.href}" class="nav-link">${link.label}</a>
            `;}).join("");
            nav.innerHTML = navHTML;
        };
        //Mobile nav
        if (mobileMenu) {
            const mobileHTML = navLinks.map(link => {
                return `
                <a href="${link.href}" class="mobile-link">${link.label}</a>
                `;}).join("");
                mobileMenu.innerHTML = mobileHTML;
            };
        };
// array.map
// -> returns HTML
// -> join("")
// -> insert into DOM
// Our Navigation now:
// comes from data
// updates instantly if the array changes
//works in desktop + mobile
//uses modern JS patterns

// This: navLinks.map(link => ...)
// is basically:
// {navLinks.map(link...)} in react

// Skill                Concept
// Objects arrays       Data structure
// map()                transform data
// Templete lierals     Dynamic HTML
// DOM rendering        UI generation

// ----Function calls----
//renderfeatures();
renderFeaturesMap();
renderNavigation();
// Key Teaching Difference
// Method           what happens
// forEach()         builds elements manually
// map()            Returns HTML strings

// we are doing now
// Data.map()
// which equals:
// export default function cards = {data.map()} in react
