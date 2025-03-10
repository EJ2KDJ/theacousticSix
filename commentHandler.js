let allComments = [];
let commentsPerPage = 5;
let commentIndex = 0; // Separate from navigation

async function loadComments() {
    try {
        const response = await fetch('https://theacoustic-six.vercel.app/api/comments');
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        allComments = await response.json();
        console.log("Fetched Comments:", allComments); // Debugging

        const commentsContainer = document.getElementById('comments');
        commentsContainer.innerHTML = '';
        commentIndex = 0;

        if (allComments.length === 0) {
            commentsContainer.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
            return;
        }

        displayNextComments();
        document.getElementById('load-more').style.display = allComments.length > commentsPerPage ? 'block' : 'none';
    } catch (error) {
        console.error('Error loading comments:', error);
        document.getElementById('comments').innerHTML = '<p>Error loading comments.</p>';
    }
}

function displayNextComments() {
    const commentsContainer = document.getElementById('comments');

    for (let i = commentIndex; i < commentIndex + commentsPerPage && i < allComments.length; i++) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `<p><strong>Anonymous:</strong> ${allComments[i].text}</p>`;
        commentsContainer.appendChild(commentElement);
    }

    commentIndex += commentsPerPage;

    if (commentIndex >= allComments.length) {
        document.getElementById('load-more').style.display = 'none';
    }
}

async function submitComment(event) {
    event.preventDefault();

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
            body: JSON.stringify({ text: commentText })
        });

        const responseData = await response.json();
        console.log("Submit Response:", responseData); // Debugging

        if (!response.ok) {
            throw new Error(`Failed to submit comment: ${responseData.error}`);
        }

        commentInput.value = "";
        loadComments();
    } catch (error) {
        console.error("Error submitting comment:", error);
        alert("Failed to submit comment. Check console for details.");
    }
}

// Attach event listeners when the page loads
document.addEventListener("DOMContentLoaded", () => {
    loadComments();

    const commentForm = document.getElementById("comment-form");
    if (commentForm) {
        commentForm.addEventListener("submit", submitComment);
    }

    const loadMoreBtn = document.getElementById("load-more");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", displayNextComments);
    }
});