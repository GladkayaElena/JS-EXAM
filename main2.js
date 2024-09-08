const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

async function fetchUser() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const user = await response.json();
        displayUserInfo(user);
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

function displayUserInfo(user) {
    const userInfo = document.getElementById('info');

    userInfo.innerHTML = `
                <h2>${user.name} (ID: ${user.id})</h2>
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> ${user.website}</p>
                <p><strong>Company:</strong> ${user.company.name}, ${user.company.catchPhrase}</p>
            `;
}

async function fetchUserPosts() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();
        displayUserPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function displayUserPosts(posts) {
    const postsList = document.getElementById('posts');

    postsList.innerHTML = '';

    posts.forEach(post => {
        const postBlock = document.createElement('div');
        postBlock.classList.add('post');

        const postTitle = document.createElement('h3');
        postTitle.textContent = post.title;
        postBlock.appendChild(postTitle);

        const postLink = document.createElement('a');
        postLink.href = `post-details.html?id=${post.id}`;
        postLink.textContent = 'View Post';
        postBlock.appendChild(postLink);

        postsList.appendChild(postBlock);
    });
}

document.getElementById('button').addEventListener('click', (event) => {
    event.preventDefault();
    fetchUserPosts();
});

fetchUser();