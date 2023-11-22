




function registerUser() {
  // Get form data
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirmPassword').value;

  // Validate password match
  if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
  }

  // Perform AJAX request to register user
  $.ajax({
    type: 'POST',
    url: 'php/register.php', // Change the path to your registration PHP script
    data: {
        username: username,
        password: password,
        confirmPassword: confirmPassword
    },
    success: function(response) {
        // Handle registration success
        alert('Registration successful!');
        // Redirect to login page or perform other actions
    },
    error: function(error) {
        // Handle registration error
        alert('Registration failed: ' + error.responseText);
    }
});

}
