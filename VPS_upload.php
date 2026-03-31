<?php
header("Access-Control-Allow-Origin: *"); // Allow cross-origin requests from your frontend
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight options request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$uploadDir = 'uploads/'; // Directory where CSVs will be stored

// Ensure upload directory exists
if (!file_exists($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        echo json_encode(["success" => false, "error" => "Failed to create uploads directory"]);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['csv_file']) && $_FILES['csv_file']['error'] === UPLOAD_ERR_OK) {
        
        $fileTmpPath = $_FILES['csv_file']['tmp_name'];
        $fileName = $_FILES['csv_file']['name'];
        
        // Ensure it's a CSV
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        if ($fileExtension !== 'csv') {
            echo json_encode(["success" => false, "error" => "Only CSV files are allowed"]);
            exit;
        }

        // Generate a unique file name
        $newFileName = time() . '_' . preg_replace("/[^a-zA-Z0-9.]/", "", $fileName);
        $destPath = $uploadDir . $newFileName;

        // Move the file from temp to final destination
        if (move_uploaded_file($fileTmpPath, $destPath)) {
            // Construct the full URL for access
            $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https" : "http";
            $domain = $_SERVER['HTTP_HOST'];
            $dirPath = dirname($_SERVER['PHP_SELF']);
            $dirPath = $dirPath === '/' ? '' : $dirPath;
            
            $fileUrl = $protocol . "://" . $domain . $dirPath . "/" . $destPath;
            
            echo json_encode(["success" => true, "url" => $fileUrl]);
        } else {
            echo json_encode(["success" => false, "error" => "There was an error saving the file to the server"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "No file was uploaded or an upload error occurred"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method; strictly use POST"]);
}
?>
