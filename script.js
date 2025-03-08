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
            commentElement.innerHTML = `<p>${comment.text}</p>`;
            commentsContainer.appendChild(commentElement);
        });
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

// Load comments when the page loads
document.addEventListener('DOMContentLoaded', loadComments);