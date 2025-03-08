document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.querySelector('.comment-list');
    const loadMoreButton = document.getElementById('load-more');

    let currentIndex = 0;

    const backendUrl = 'https://comment-backend-9z73.onrender.com';

    function addComment(text) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<p><strong>Anonymous:</strong> ${text}</p>`;
        commentsList.prepend(commentDiv);
        currentIndex++;
    }

    async function fetchComments() {
        try {
            const response = await fetch(`${backendUrl}/comments`);
            const comments = await response.json();
            comments.forEach(comment => addComment(comment.text));
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    }

    async function postComment(text) {
        try {
            const response = await fetch(`${backendUrl}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            const comment = await response.json();
            addComment(comment.text);
        } catch (err) {
            console.error('Error posting comment:', err);
        }
    }

    function loadMoreComments() {
        fetchComments().then(() => {
            if (currentIndex >= commentsList.children.length) {
                loadMoreButton.style.display = 'none';
            }
        });
    }

    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const commentText = commentInput.value.trim();
        if (commentText) {
            await postComment(commentText);
            commentInput.value = '';
            if (loadMoreButton.style.display === 'none') {
                loadMoreButton.style.display = 'block';
            }
        }
    });

    loadMoreButton.addEventListener('click', loadMoreComments);

    fetchComments();
});