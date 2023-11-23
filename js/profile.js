$(document).ready(function() {
  // Check authentication status on page load
  if (localStorage.getItem('isLoggedIn') !== 'true') {
      // Redirect to login page if not logged in
      window.location.href = 'login.html';
  } else {
      // Fetch user data from MongoDB and populate the form
      fetchUserData();

      // Logout button click event
      $('#logoutBtn').on('click', function() {
          // Clear localStorage and redirect to login page
          localStorage.clear();
          window.location.href = 'login.html';
      });

      // Edit button click event
      $('#editBtn').on('click', function() {
          // Enable editing of input fields
          $('input').prop('readonly', false);
          // Show Save button, hide Edit button
          $('#saveBtn').show();
          $('#editBtn').hide();
      });

      // Save button click event
      $('#saveBtn').on('click', function() {
          // Save data to MongoDB
          saveUserData();
      });
  }
});

function fetchUserData() {
  // Fetch user data from MongoDB 
  $.ajax({
      type: 'GET',
      url: 'php/profile.php', 
      success: function(response) {
          
          var userData = JSON.parse(response);
          $('#username').val(userData.username);
          $('#age').val(userData.age);
          $('#dob').val(userData.dob);
          $('#contact').val(userData.contact);
      },
      error: function(error) {
          alert('Error fetching user data: ' + error.responseText);
      }
  });
}

function saveUserData() {
  // Prepare data to be saved 
  var formData = {
      username: $('#username').val(),
      age: $('#age').val(),
      dob: $('#dob').val(),
      contact: $('#contact').val()
  };

  // Save data to MongoDB
  $.ajax({
      type: 'POST',
      url: 'php/profile.php', 
      data: formData,
      success: function(response) {
          // Show Edit button, hide Save button
          $('#editBtn').show();
          $('#saveBtn').hide();
          // Disable editing of input fields
          $('input').prop('readonly', true);
          alert('Profile saved successfully!');
      },
      error: function(error) {
          alert('Error saving user data: ' + error.responseText);
      }
  });
}
