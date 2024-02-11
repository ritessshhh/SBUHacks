document.addEventListener('DOMContentLoaded', function () {
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission
  
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        feedback: document.getElementById('feedback').value,
      };
  
      // Show loading overlay
      document.getElementById('loadingOverlay').style.display = 'block';
  
      // Submit the form data to your server endpoint
      fetch('/submit-feedback', { // Make sure this endpoint matches your server setup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Hide loading overlay
        document.getElementById('loadingOverlay').style.display = 'none';
        // Handle success (e.g., show a success message, redirect, etc.)
      })
      .catch((error) => {
        console.error('Error:', error);
        document.getElementById('loadingOverlay').style.display = 'none';
        // Handle error (e.g., show an error message)
      });
    });
  });
  