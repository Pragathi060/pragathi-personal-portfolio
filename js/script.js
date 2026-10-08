// =========================================================
// PRAGATHI PORTFOLIO - JAVASCRIPT ES6+
// Demonstrates variables, functions, arrow functions,
// arrays/objects, conditions/loops, events and DOM.
// =========================================================

"use strict";

// -----------------------------
// 1. Current year using variable
// -----------------------------
const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;


// -----------------------------
// 2. Theme switching
// Interactive Feature #1
// -----------------------------
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.className = "bi bi-sun-fill";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");

    themeIcon.className = isDark
        ? "bi bi-sun-fill"
        : "bi bi-moon-stars-fill";
});


// -----------------------------
// 3. Project filtering
// Interactive Feature #2
// -----------------------------

// Array of project objects
const projects = [
    { name: "Movie Info Finder", category: "web" },
    { name: "Memory Game", category: "web" },
    { name: "To-Do List", category: "web" },
    { name: "Vehicle Counting System", category: "ai" }
];

const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

const filterProjects = (filter) => {
    projectItems.forEach((item) => {
        const categories = item.dataset.category.split(" ");

        if (filter === "all" || categories.includes(filter)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
};

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        filterProjects(button.dataset.filter);
    });
});


// -----------------------------
// 4. Contact form validation
// -----------------------------
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Browser validation + custom validation
    if (!contactForm.checkValidity()) {
        event.stopPropagation();
        contactForm.classList.add("was-validated");

        showFormMessage(
            "Please correct the highlighted fields and try again.",
            "danger"
        );
        return;
    }

    const formData = new FormData(contactForm);

    // Object created from form data
    const userMessage = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
    };

    // Simple condition
    if (userMessage.message.trim().length < 10) {
        showFormMessage(
            "Message should contain at least 10 characters.",
            "danger"
        );
        return;
    }

    // In a real application this object can be sent to a backend.
    console.log("Submitted contact data:", userMessage);

    showFormMessage(
        `Thank you, ${userMessage.name}! Your message has been submitted successfully.`,
        "success"
    );

    contactForm.reset();
    contactForm.classList.remove("was-validated");
});

const showFormMessage = (message, type) => {
    formMessage.className = `alert alert-${type}`;
    formMessage.textContent = message;
    formMessage.classList.remove("d-none");

    // Hide after a few seconds
    setTimeout(() => {
        formMessage.classList.add("d-none");
    }, 5000);
};


// -----------------------------
// 5. Back-to-top button
// -----------------------------
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 450) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// -----------------------------
// 6. Close mobile navbar after click
// -----------------------------
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbarCollapse = document.getElementById("mainNav");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
            const collapseInstance =
                bootstrap.Collapse.getInstance(navbarCollapse);

            if (collapseInstance) {
                collapseInstance.hide();
            }
        }
    });
});
