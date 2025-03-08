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

    async function fetchComments() {
        try {
            const response = await fetch('http://localhost:4000/comments');

            const comments = await response.json();
            comments.forEach(comment)
        } catch (err) {
            console.error('Error fetching comments:', err);
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