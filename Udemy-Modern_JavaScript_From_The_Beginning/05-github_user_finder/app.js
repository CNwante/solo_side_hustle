// Instantiate GitHub Class
const gitHub = new GitHub;
// Inatantiate UI Class
const ui = new UI;

// Get searchUser Input
const searchUser = document.getElementById('searchUser');

// Add a keyup event to searchUser
searchUser.addEventListener('keyup', (e) => {
    // Validate user input value
    const inputValue = e.target.value;

    if (inputValue) {
        gitHub.getUser(inputValue)
        .then(data => {
            if (data.profile.message === "Not Found") {
                // Show alert: user not found
                ui.showMessage("User not Found", "alert alert-danger");
            }
            else {
                // Show user profile
                ui.showProfile(data.profile);
                // Show user repos
                ui.showRepos(data.repos);
            }
        })
    }
    else {
        // Clear profile call
        ui.clearProfile();
    }
});
