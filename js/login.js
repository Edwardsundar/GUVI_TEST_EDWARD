

function loginUser() {
  // Get form data
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Perform AJAX request to login user
  $.ajax({
      type: 'POST',
      url: 'php/login.php', 
      data: {
          username: username,
          password: password
      },
      success: function(response) {
        var result = String(response);
        var ans = result.length;
        console.log(result);
          if ( ans == 8) {
              // login success
              window.location.href = 'profile.html';
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('username', username);
          } else {
              // login failure
              console.log(response);
              alert('Login failed. Please check your credentials.');
          }
      },
      error: function(error) {
          // AJAX error
          alert('AJAX error: ' + error.responseText);
      }
  });
}
