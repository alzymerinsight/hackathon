document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Get the email and password entered by the user
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    // Validate the email (You can add more complex validation if needed)
    if (validateEmail(email)) {
        // Send a POST request to the server to authenticate the user
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => {
            if (response.ok) {
                // If authentication is successful, parse the response to get the token
                return response.json();
            } else {
                throw new Error('Authentication failed.');
            }
        })
        .then(data => {
            // Store the token in local storage
            localStorage.setItem('token', data.token);
            
            // Redirect to the dashboard page
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            // Display an error message if authentication fails
            alert("Authentication failed. Please check your email and password.");
        });
    } else {
        // Display an error message if the email is not valid
        alert("Please enter a valid email address.");
    }
});

// Function to validate email
function validateEmail(email) {
    // Simple email validation using a regular expression
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
