const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

async function fetchPost() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const post = await response.json();
        displayPostInfo(post);
    } catch (error) {
        console.error('Error fetching post:', error);
    }
}

function displayPostInfo(post) {
    const postInfo = document.getElementById('post');

    postInfo.innerHTML = `
                <h2>${post.title}</h2>
                <p><strong>Post ID:</strong> ${post.id}</p>
                <p><strong>User ID:</strong> ${post.userId}</p>
                <p>${post.body}</p>
            `;
}

async function fetchPostComments() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const comments = await response.json();
        displayPostComments(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

function displayPostComments(comments) {
    const commentsList = document.getElementById('comments-list');

    comments.forEach(comment => {
        const commentBlock = document.createElement('div');
        commentBlock.classList.add('comment-block');

        const commentTitle = document.createElement('h3');
        commentTitle.textContent = comment.name;
        commentBlock.appendChild(commentTitle);

        const commentEmail = document.createElement('p');
        commentEmail.innerHTML = `<strong>Email:</strong> ${comment.email}`;
        commentBlock.appendChild(commentEmail);

        const commentBody = document.createElement('p');
        commentBody.textContent = comment.body;
        commentBlock.appendChild(commentBody);

        commentsList.appendChild(commentBlock);
    });
}

fetchPost();
fetchPostComments();