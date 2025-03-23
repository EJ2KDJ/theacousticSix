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

        void prevBtn.offsetHeight;
    }


    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;
    
        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Ensures it stops at exactly the target
            const ease = progress < 0.5 ? 2 * progress ** 2 : 1 - Math.pow(-2 * progress + 2, 2) / 2; // Ease-in-out effect
    
            window.scrollTo(0, startPosition + distance * ease);
    
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
    
        requestAnimationFrame(animation);
    }

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle("active", i === index);
        });
    
        const targetSection = sections[index];
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - 97;
    
        smoothScrollTo(targetPosition, 500);
    
        updateButtons();
    }


    nextBtn.addEventListener("click", () => {
        if (currentIndex < sections.length - 1) {
            currentIndex++;
            showSection(currentIndex);
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            showSection(currentIndex);
        }
    });

    showSection(currentIndex);
});
