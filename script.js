const categoryButtons = document.querySelectorAll('.category-button');
const userList = document.querySelector('.user-list');
let usersData = []; // Store the fetched user data

// Make HTTP request to FillText API
fetch('http://filltext.com/?rows=6&fname={firstName}&lname={lastName}&category=["Category 1", "Category 2","Category 3"]')
  .then(response => response.json())
  .then(data => {
    usersData = data; // Store the fetched user data
    filterUsersByCategory('all'); // Show all users initially
  })
  .catch(error => console.error(error));

// Add click event listeners to the category buttons
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.category;
    filterUsersByCategory(selectedCategory);
  });
});

// Function to filter users by category
// Function to filter users by category
function filterUsersByCategory(category) {
    // Clear the user list with animation
    userList.style.opacity = 0;
    setTimeout(() => {
      userList.innerHTML = '';
  
      // Filter users based on the selected category
      const filteredUsers = category === 'all'
        ? usersData
        : usersData.filter(user => user.category === category);
  
      // Iterate over the filtered users and create user cards
      filteredUsers.forEach(user => {
        const userCard = createUserCard(user);
        userList.appendChild(userCard);
      });
  
      // Apply fade-in animation after updating the user list
      setTimeout(() => {
        userList.style.opacity = 1;
      }, 50);
    }, 300);
  }
  

// Function to create a user card
function createUserCard(user) {
  // ... The rest of the code remains the same as before
}

// Function to create a user card
function createUserCard(user) {
  const userCard = document.createElement('div');
  userCard.classList.add('user-card');

  const userCircle = document.createElement('div');
  userCircle.classList.add('user-circle');
  userCircle.textContent = getInitials(user.fname, user.lname);
  userCard.appendChild(userCircle);

  const userDetails = document.createElement('div');
  userDetails.classList.add('user-details');

  const userName = document.createElement('h2');
  userName.classList.add('user-name');
  userName.textContent = `${user.fname} ${user.lname}`;
  userDetails.appendChild(userName);

  const userCategory = document.createElement('p');
  userCategory.classList.add('user-category');
  userCategory.textContent = user.category;
  userDetails.appendChild(userCategory);

  userCard.appendChild(userDetails);

  return userCard;
}

// Function to get initials from first name and last name
function getInitials(firstName, lastName) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
}
