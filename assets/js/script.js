'use strict';

// Function to toggle element class
const toggleClass = function(elem, className) {
    elem.classList.toggle(className);
};

// Function to handle navigation
const navigateToPage = function(pageName) {
    const pages = document.querySelectorAll("[data-page]");
    const navigationLinks = document.querySelectorAll("[data-nav-link]");

    for (let i = 0; i < pages.length; i++) {
        if (pages[i].dataset.page === pageName) {
            toggleClass(pages[i], "active");
            toggleClass(navigationLinks[i], "active");
        } else {
            pages[i].classList.remove("active");
            navigationLinks[i].classList.remove("active");
        }
    }
    // Scroll to top of the page
    window.scrollTo(0, 0);
};

// Event listeners for navigation links
const navigationLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function() {
        const pageName = this.innerHTML.toLowerCase();
        navigateToPage(pageName);
    });
}

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Modal variables
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal toggle function
const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
}

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input fields to enable/disable form submission button
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        // Check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}

// Add event listener for form submission
form.addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Create a new FormData object to collect form data
    const formData = new FormData(this);

    // Extract form data and format it
    let formDataString = "";
    for (const [name, value] of formData) {
        formDataString += `${name}: ${value}\n`;
    }

    // Get the name of the form filler
    const fullName = formData.get("fullname");

    // Set the subject of the email
    const subject = `Enquiry: ${fullName} (from the form filler)`;

    // Construct the mailto link with the email address, subject, and body
    const mailtoLink = `mailto:tejaswi.c@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formDataString)}`;

    // Open the default email client with the mailto link
    window.location.href = mailtoLink;
});

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Event listener for custom select dropdown
select.addEventListener("click", function () { elementToggleFunc(this); });

// Add event listeners to all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// Filter function
const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all" || selectedValue === filterItems[i].dataset.category) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }
}

// Add event listeners to filter button items for large screen
let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
}
