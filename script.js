let allComments = [];
let commentsPerPage = 5;
let currentIndex = 0;

async function loadComments() {
    try {
        const response = await fetch('https://theacoustic-six.vercel.app/api/comments');
        const comments = await response.json();

        const commentsContainer = document.getElementById('comments');
        commentsContainer.innerHTML = ''; 
        currentIndex = 0;

        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
            return;
        }

        displayNextComments();
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
            commentElement.innerHTML = `<p><strong>Anonymous:  </strong>${comment.text}</p>`;
            commentsContainer.appendChild(commentElement);
    }

    currentIndex += commentsPerPage;

    if(currentIndex >= allComments.length) {
        document.getElementById('load-more').style.display = 'none';
    }
}


async function submitComment(event) {
    event.preventDefault();

    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value.trim();

    try {
        const response = await fetch('https://theacoustic-six.vercel.app/api/comments', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: commentText })
        });

        if (!response.ok) {
            throw new Error("Failed to submit comment");
        }

        commentInput.value = "";
        loadComments();
    } catch (error) {
        console.error("Error submitting comment:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadComments();
    document.getElementById("comment-form").addEventListener("submit", submitComment);
    document.getElementById('load-more').addEventListener("click", displayNextComments);
});
