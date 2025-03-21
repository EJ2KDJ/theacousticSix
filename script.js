document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navContainer = document.querySelector(".nav-container");

    hamburger.addEventListener("click", function () {
        navContainer.classList.toggle("show");
    });
});
