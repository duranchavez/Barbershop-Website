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
// ----- Modal Elements -----
const serviceModal = document.getElementById("serviceModal");
const serviceModalOverlay = document.getElementById("serviceModalOverlay");
const serviceModalClose = document.getElementById("serviceModalClose");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalPrice = document.getElementById("serviceModalPrice");
const serviceModalList = document.getElementById("serviceModalList");
// ------- service Data (Array of objects)
const services = [
    {
        id:1,
        title: "Classic Haircuts",
        image: "assets/images/feature-1.jpg",
        alt: "Classic Haircuts",
        description: "Timeless cuts with modern precision-tailored to your style.",
        price: 25,
        popular: true,
        deatails: [
            "Consulation with your barber before the cut begins.",
            "Hair sectioning and shape-up based on your preferred style.",
            "Professional clippers, trimers, and shears used for precision.",
            "Neckline cleanup and finishing touches included.",
            "Light styling product applied for a clean final look."
        ]
    },
    {
        id: 2,
        title: "Beard Trim",
        image: "assets/images/feature-2.jpg",
        alt: "Beard Trim",
        description: "Shape, line-up, and refine your beard for a clean finish.",
        price: 15,
        popular: false,
        details: [
            "Beard assessment and shaping based on face structure.",
            "Line-up around cheeks, jawline, and neckline.",
            "Trimmers and detail tools used for crisp edges.",
            "Conditioning beard product may be applied for softness.",
            "Final symmetry check for a polished finish"
        ]
    },
    {
        id: 3,
        title: "Straight Razor Shave",
        image: "assets/images/feature-3.jpg",
        alt: "Straight Razor Shave",
        description: "Hot towel, smooth shave, and classic barbershop experience.",
        price: 30,
        popular: true,
        details: [
            "Hot towel prep to soften facial hair and open pores.",
            "Premium shaaving cream or lather applied to protect the skin.",
            "Straight razor shave performed with careful detailing.",
            "Second hot towel may be used for comfort and cleanup.",
            "Aftershave or soothing skin product applied after service"
        ]
    },
    {
        id: 4,
        title: "Fade & Style",
        image: "assets/images/feature-4.jpg",
        alt: "Fade haircut",
        description: "A clean fade with finishing detail for a sharp, modern look.",
        price: 35,
        popular: false,
        details: [
            "Style consulation before clipper work begins.",
            "Fade blended to your preferred level and finish.",
            "Detailing around temples, neckline, and beard area if needed.",
            "Sicissors and clipper-over-comb may be used for texture.",
            "Styling product added to complete the final look."
        ]
    },
    {
        id: 5,
        title: "Kids Cut",
        image: "assets/images/feature-5.jpg",
        alt: "Kids haircut",
        description: "Clean comfortable haircut service for younger clients.",
        price: 20, 
        popular: false, 
        details: [
            "Simple consulation with child and parent if needed.",
            "Age-approiate haircut with comfort in mind.",
            "Careful clipper and scissors work for a clean finish.",
            "Light cleanup around the neckline and ears.",
            "Styled neatly before leaving the chair."
        ]
    },
    {
        id: 6,
        title: "Head Shave",
        image: "assets/images/feature-6.jpg",
        alt: "Head shave",
        description: "Smooth head shave with classic barbershop treatment.",
        price: 28, 
        popular: true,
        details: [
            "Scalp prep with warm towel treatment.",
            "Protective shave product applied before razor work.",
            "Close shave performed for a smooth finish.",
            "Scalp cleaned and checked for even consistency.",
            "Moisturizing scalp product applied after the shave."
        ] 
    },
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
// ---- Modal Logic ----
const openServiceModal = (serviceId) => {
    if (!serviceModal || !serviceModalTitle || !serviceModalPrice || !serviceModalList) return;
    const selectedService = services.find((service) => service.id === Number(serviceId));
    if (!selectedService) return;
    serviceModalTitle.textContent = selectedService.title;
    serviceModalPrice.textContent = `$${selectedService.price}`;
    serviceModalList.innerHTML = selectedService.details.map((detail) =>  `<li>${detail}</li>`)
    .join("");
    serviceModal.classList.add("is-open");
    serviceModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
};
const closeServiceModal = () => {
    if(!serviceModal) return;
    serviceModal.classList.remove("is-open");
    serviceModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
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
// 7) Open/Close Service Modals
if (featureGrid) {
    featureGrid.addEventListener("click", (event) => {
        const clickedButton = event.target.closest(".service-details-btn");
        if (!clickedButton) return;
        const serviceId = clickedButton.dataset.serviceId;
        openServiceModal(serviceId);
    });
}
if (serviceModalClose) {
    serviceModalClose.addEventListener("click", closeServiceModal);
}
if (serviceModalOverlay) {
    serviceModalOverlay.addEventListener("click", closeServiceModal);
}
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeServiceModal();
    }
});
// -- Render Functions ---
const renderNavigation = () => {
    if (nav) {
        const navHTML = navLinks.map((link) => `<a href="${link.href}" class="nav-link">${link.label}</a>`)
        .join("");
        nav.innerHTML = navHTML;
    }
    if (mobileMenu) {
        const mobileHTML = navLinks.map((link) => `<a href="${link.href}" class="mobile-link">${link.label}</a>`)
        .join("");
mobileMenu.innerHTML = mobileHTML;
    }
};
const renderServices = () => {
    if (!featureGrid) return;
    const servicesHTML = services.map((service) => {
        let badgeHTML = "";
if (service.popular) {
    badgeHTML = `<p class="service-badge">Popular Choice</p>`;
} else {
    badgeHTML = `<p class="service-badge alt-badge">Barber Favorite</p>`;
}
return `
<article class="feature-card">
<img
src="${service.image}"
alt="${service.alt}"
class="feature-img"
/>
<h3 class="feature-title">${service.title}</h3>
<p class="feature-text">${service.description}</p>
${badgeHTML}
<p class="service-price">$${service.price}</p>
<div class="service-actions">
<button
class="service-details-btn"
type="button"
data-service-id="${service.id}"
    >
    View Details
    </button>
    </div>
    </article>
    `;
})
.join("");
featureGrid.innerHTML = servicesHTML;
};
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
// const renderFeaturesMap = () => {
//     const cardsHTML = services.map( service => {
//         return `
//         <article class="feature-card">
//         <img src="${service.image}" alt="${service.title}" class="feature-img" />
//         <h3 class="feature-title">${service.title}</h3>
//         <p class="feature-text">${service.text}</p>
//         </article>
//         `;
//     }).join("");
//     featureGrid.innerHTML = cardsHTML;// cardsHTML = ['<article></article>','<article></article>','<article></article>']
// };

//------ Render Navigation using map()------
// const renderNavigation = () => {
    // // Desktop nav
    // if (nav) {
    //     const navHTML = navLinks.map(link => {
    //         return `
    //         <a href="${link.href}" class="nav-link">${link.label}</a>
    //         `;}).join("");
    //         nav.innerHTML = navHTML;
    //     };
    //     //Mobile nav
    //     if (mobileMenu) {
    //         const mobileHTML = navLinks.map(link => {
    //             return `
    //             <a href="${link.href}" class="mobile-link">${link.label}</a>
    //             `;}).join("");
    //             mobileMenu.innerHTML = mobileHTML;
    //         };
    //     };
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
renderServices();
renderNavigation();
// renderFeaturesMap();
// Key Teaching Difference
// Method           what happens
// forEach()         builds elements manually
// map()            Returns HTML strings

// we are doing now
// Data.map()
// which equals:
// export default function cards = {data.map()} in react
