let allComments = []; // Store all comments here
let commentsPerPage = 5; // Number of comments to show at a time
let currentIndex = 0; // Track how many comments are displayed

async function loadComments() {
    try {
        const response = await fetch('https://theacoustic-six.vercel.app/api/comments');
        allComments = await response.json();

        const commentsContainer = document.getElementById('comments');
        commentsContainer.innerHTML = ''; // Clear previous comments
        currentIndex = 0; // Reset index

        if (allComments.length === 0) {
            commentsContainer.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
            return;
        }

        displayNextComments(); // Show initial batch
        document.getElementById('load-more').style.display = allComments.length > commentsPerPage ? 'block' : 'none';
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

function displayNextComments() {
    const commentsContainer = document.getElementById('comments');

    for (let i = currentIndex; i < currentIndex + commentsPerPage && i < allComments.length; i++) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `<p><strong>Anonymous:</strong> ${allComments[i].text}</p>`;
        commentsContainer.appendChild(commentElement);
    }

    currentIndex += commentsPerPage;

    // Hide "See More" button if all comments are loaded
    if (currentIndex >= allComments.length) {
        document.getElementById('load-more').style.display = 'none';
    }
}

// Function to handle comment submission
async function submitComment(event) {
    event.preventDefault(); // Prevent form from refreshing page

    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value.trim();

    if (commentText === "") {
        alert("Please enter a comment.");
        return;
    }

    try {
        const response = await fetch('https://theacoustic-six.vercel.app/api/comments', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: commentText }) // Send comment text
        });

        if (!response.ok) {
            throw new Error("Failed to submit comment");
        }

        commentInput.value = ""; // Clear input
        loadComments(); // Refresh the comments after submitting
    } catch (error) {
        console.error("Error submitting comment:", error);
    }
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
    loadComments(); // Load comments when page loads
    document.getElementById("comment-form").addEventListener("submit", submitComment);
    document.getElementById("load-more").addEventListener("click", displayNextComments);
});