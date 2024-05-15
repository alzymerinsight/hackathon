document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('#registrationForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    // AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/form/register');
    xhr.onload = function () {
      if (xhr.status === 200) {
        // If registration is successful, redirect to dashboard.html
        console.log(xhr.response)
        window.location.href = "dashboard.html";
      } else {
        // If registration fails, display an error message or handle it as needed
        alert('Registration failed. Please try again.');
      }
    };
    xhr.onerror = function () {
      // If there's an error with the request, display an error message or handle it as needed
      alert('There was an error processing your request. Please try again later.');
    };
    xhr.send(formData); // Send form data
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.querySelector('form');

//   form.addEventListener('submit', function (event) {
//     event.preventDefault();

//     const fullName = form.elements['fullName'].value.trim();
//     const username = form.elements['username'].value.trim();
//     const email = form.elements['email'].value.trim();
//     const phoneNumber = form.elements['phoneNumber'].value.trim();
//     const password = form.elements['password'].value.trim();
//     const confirmPassword = form.elements['confirmPassword'].value.trim();
//     const image = form.elements['image'].value.trim();
//     const gender = form.querySelector('input[name="gender"]:checked');
//     // Validation for required fields
//     if (!fullName || !username || !email || !phoneNumber || !password || !confirmPassword || !image || !gender) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     // Validation for email format
//     if (!isValidEmail(email)) {
//       alert('Please enter a valid email address.');
//       return;
//     }

//     // Validation for password match
//     if (password !== confirmPassword) {
//       alert('Passwords do not match. Please re-enter your password.');
//       return;
//     }

//     // You can add code here to submit the form data to your server (e.g., using AJAX)
//     // For now, let's simulate form submission and redirect to dashboard.html if user credentials match
//     // Replace this with actual AJAX call to your server for user registration and authentication
//     simulateFormSubmission(fullName, username, email, phoneNumber, password, image, gender);
//   });
// });

// // Function to simulate form submission and redirect to dashboard.html
// function simulateFormSubmission(fullName, username, email, phoneNumber, password, image, gender) {
//   const form = document.getElementById('registrationForm');
//   const formData = new FormData();
//   formData.append('fullName', fullName);
//   formData.append('username', username);
//   formData.append('email', email);
//   formData.append('phoneNumber', phoneNumber);
//   formData.append('password', password);
//   formData.append('image', image);
//   formData.append('gender', gender);

//   // AJAX request
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', '/form/register');
//   xhr.send(formData);
//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       // If registration is successful, redirect to dashboard.html
//       window.location.href = "dashboard.html";
//     } else {
//       // If registration fails, display an error message or handle it as needed
//       alert('Registration failed. Please try again.');
//     }
//   };
//   xhr.onerror = function () {
//     // If there's an error with the request, display an error message or handle it as needed
//     alert('There was an error processing your request. Please try again later.');
//   };
// }

// // Function to validate email format
// function isValidEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }
