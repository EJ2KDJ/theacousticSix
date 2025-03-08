async function loadComments() {
    try {
        const response = await fetch('https://theacoustic-six.vercel.app/api/comments');
        const comments = await response.json();

        const commentsContainer = document.getElementById('comments');
        commentsContainer.innerHTML = ''; // Clear previous comments

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `<p><strong>${comment.username}:</strong> ${comment.message}</p>`;
            commentsContainer.appendChild(commentElement);
        });
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

// Load comments when the page loads
document.addEventListener('DOMContentLoaded', loadComments);
