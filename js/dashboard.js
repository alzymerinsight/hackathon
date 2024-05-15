document.addEventListener("DOMContentLoaded", function() {
    const profileButton = document.getElementById('profile-button');

    // Add event listener to the profile button
    profileButton.addEventListener('click', function(event) {
        event.preventDefault();
        // Redirect to profile.html
        window.location.href = "profile.html";
    });

    // Check if the user is authenticated
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirect to login page if token is not found
        window.location.href = "login.html";
    } else {
        // You can add additional logic here to verify the token validity
        // For example, sending the token to the server for verification
    }
});
