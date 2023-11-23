
<?php
// get server 
$db_server = "localhost";
$db_user = "root";
$db_password = "";
$db_name = "register_db";
$connection = "";
$connection = mysqli_connect($db_server, $db_user
                           , $db_password, $db_name);
// include("login.php");

// Get username and password from POST request
$username = $_POST['username'];
$password = $_POST['password'];


// Query to retrieve user data from the database
$query = "SELECT * FROM users WHERE user = '$username'";
$result = mysqli_query($connection,$query);
$ans = mysqli_num_rows($result);

// Check if the user exists
if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $hashedPassword = $row['pass'];
    // Verify the password

    if (password_verify($password, $hashedPassword)) {
        echo "success";
    } else {
        echo 'failure...';
    }
    
} else {
    // User does not exist
    echo 'failure...';
}

mysqli_close($connection);
?>
