



<?php
// Include your MongoDB connection file
include 'mongo_connection.php';
$mongoConnection = new MongoDB\Driver\Manager(
  'mongodb+srv://Edward:Edward@cluster0.t9r8hqi.mongodb.net/?retryWrites=true&w=majority'
);
$collection = 'users';



// Function to fetch user profile from MongoDB
function fetchUserProfile($username) {
    global $collection;

    $filter = ['username' => $username];
    $options = [];
    $result = $collection->findOne($filter, $options);

    if ($result) {
        return [
            'username' => $result['username'],
            'age' => $result['age'],
            'dob' => $result['dob'],
            'contact' => $result['contact']
        ];
    } else {
        return [];
    }
}

// Function to save user profile to MongoDB
function saveUserProfile($username, $age, $dob, $contact) {
    global $collection;

    $filter = ['username' => $username];
    $update = [
        '$set' => [
            'age' => $age,
            'dob' => $dob,
            'contact' => $contact
        ]
    ];

    $result = $collection->updateOne($filter, $update);

    return $result->getModifiedCount();
}


if (isset($_POST['action'])) {
    $action = $_POST['action'];

    switch ($action) {
        case 'fetch':
            // Fetch user data from MongoDB
            echo json_encode(fetchUserProfile('ABC')); // Replace 'testuser' with your actual identifier
            break;
        case 'save':
            // Save user data to MongoDB
            $formData = $_POST['formData'];
            $success = saveUserProfile('testuser', $formData['age'], $formData['dob'], $formData['contact']);
            echo json_encode(['success' => $success]);
            break;
        default:
            echo json_encode(['error' => 'Invalid action']);
            break;
        }
}
?>