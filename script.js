async function loadComments() {
    try {
        const response = await fetch('https://theacoustic-six.vercel.app/api/comments');
        const comments = await response.json();

        const commentsContainer = document.getElementById('comments');
        commentsContainer.innerHTML = ''; 

        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
            return;
        }

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `<p><strong>Reader: </strong>${comment.text}</p>`;
            commentsContainer.appendChild(commentElement);
        });
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}


async function submitComment(event) {
    event.preventDefault();

    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value.trim();

    if (commentText === "") {
        alert("Share us your thoughts!");
        return;
    }

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
});
