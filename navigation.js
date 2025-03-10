document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".reading-section");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    const sectionTitles = ["Elementary", "High School Life", "College Life", "Adulthood"];
    let currentIndex = 0;

    function updateButtons() {
        prevBtn.style.display = currentIndex > 0 ? "inline-block" : "none";
        nextBtn.style.display = currentIndex < sectionTitles.length - 1 ? "inline-block" : "none";

        if (currentIndex > 0) {
            prevBtn.textContent = sectionTitles[currentIndex - 1];
        }
        if (currentIndex < sectionTitles.length - 1) {
            nextBtn.textContent = sectionTitles[currentIndex + 1];
        }
    }

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle("active", i === index);
        });
        updateButtons();
    }

    function scrollToReadSection() {
        const readSection = document.querySelector(".reading-container");
        if (readSection) {
            readSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < sections.length - 1) {
            currentIndex++;
            showSection(currentIndex);
            scrollToReadSection();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            showSection(currentIndex);
            scrollToReadSection();
        }
    });

    showSection(currentIndex);
});