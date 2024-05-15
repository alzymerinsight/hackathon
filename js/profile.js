// Logout and Save changes functionality
document.addEventListener('DOMContentLoaded', () => {
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        // Redirect to the login page
        window.location.href = 'login.html';
    });

    // Save changes functionality
    document.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.target);

        // Convert form data to JSON object
        const profileData = {};
        formData.forEach((value, key) => {
            profileData[key] = value;
        });

        try {
            // Send profile data to backend for storage
            const response = await fetch('/save-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileData)
            });

            if (response.ok) {
                // Profile data saved successfully
                alert('Profile data saved successfully!');
            } else {
                // Error saving profile data
                alert('Failed to save profile data.');
            }
        } catch (error) {
            console.error('Error saving profile data:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    // Upload new image functionality
    document.getElementById('uploadImageBtn').addEventListener('change', async (e) => {
        const file = e.target.files[0];

        try {
            // Create FormData object to send file to backend
            const formData = new FormData();
            formData.append('profileImage', file);

            // Send image file to backend for upload
            const response = await fetch('/upload-image', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Image uploaded successfully
                alert('Image uploaded successfully!');
            } else {
                // Error uploading image
                alert('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
