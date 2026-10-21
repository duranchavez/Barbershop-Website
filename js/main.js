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
const heading = document.getElementById("heading");
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
// -----Event Listeners --
//1)  set year on page load
setCurrentYear();
//2) Hamburger menu toggle
if (menuBtn) {
    menuBtn.addEventListener("click, () => {
        toggleMobileMenu();
    });
    }