document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.querySelector('.comment-list');
    const loadMoreButton = document.getElementById('load-more');

    let comments = []; 
    let visibleComments = 5; 
    let currentIndex = 0; 


    function addComment(text) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<p><strong>Anonymous:</strong> ${text}</p>`;
        commentsList.appendChild(commentDiv);
    }

    const backendUrl = 'https://comment-backend-9z73.onrender.com';

    async function fetchComments() {
        try {
            const response = await fetch('${backendUrl}/comments');

            const comments = await response.json();
            comments.forEach(comment => addComment(comment.text));
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    }

    async function postComment(text) {
        try {
            const response = await fetch('${backendUrl}/comments');
        } catch (err) {
            console.error('Error posting comment:', error);
        }
    }

    function loadMoreComments() {
        const nextComments = comments.slice(currentIndex, currentIndex + visibleComments);
        nextComments.forEach(comment => addComment(comment));
        currentIndex += visibleComments;


        if (currentIndex >= comments.length) {
            loadMoreButton.style.display = 'none';
        }
    }

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const commentText = commentInput.value.trim();
        if (commentText) {
            comments.push(commentText); 
            addComment(commentText); 
            commentInput.value = ''; 

            if (loadMoreButton.style.display === 'none') {
                loadMoreButton.style.display = 'block';
            }
        }
    });

    loadMoreButton.addEventListener('click', loadMoreComments);

    loadMoreComments();
});