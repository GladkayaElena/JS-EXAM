async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();

        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function displayUsers(users) {
    const userList = document.getElementById('list');

    users.forEach(user => {
        const userBlock = document.createElement('div');
        userBlock.classList.add('block');

        const userName = document.createElement('h3');
        userName.textContent = `ID: ${user.id}, Name: ${user.name}`;
        userBlock.appendChild(userName);

        const userLink = document.createElement('a');
        userLink.href = `user-details.html?id=${user.id}`;
        userLink.textContent = 'View Details';
        userBlock.appendChild(userLink);

        userList.appendChild(userBlock);
    });
}

fetchUsers();