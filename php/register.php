<?php
// get server 
$db_server = "localhost";
$db_user = "root";
$db_password = "";
$db_name = "register_db";
$connection = "";

// Get form data
$username = $_POST['username'];
$password = $_POST['password'];
echo $username;
// Hash the password 
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

echo "edward";

$connection = mysqli_connect($db_server, $db_user, $db_password, $db_name);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO users (user, pass) VALUES ('$username', '$hashedPassword')";

if (mysqli_query($connection, $sql)) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
}

mysqli_close($connection);
?>
