document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navContainer = document.querySelector(".nav-container");

    hamburger.addEventListener("click", function () {
        navContainer.classList.toggle("show");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Ensure the button exists before adding the event listener
    let backToTopButton = document.getElementById("backToTop");
    
    if (backToTopButton) {
        backToTopButton.addEventListener("click", function() {
            document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
        });
    }
});
