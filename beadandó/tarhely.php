header("Access-Control-Allow-Origin: *"); // Engedélyezi minden domain számára
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Engedélyezi a POST és GET kéréseket
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Engedélyezi a Content-Type fejlécet

// Az OPTIONS kérés kezelése, mivel a CORS kérések először OPTIONS kéréseket küldenek
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; // Ha OPTIONS kérés, kilépés
}
<?php
// Adatbázis kapcsolat beállítása (a saját adatbázisod adataival)
$host = 'localhost';
$dbname = 'users'; // Cseréld le a saját adatbázis nevére
$username = 'webbeaadmin1'; // Cseréld le a saját felhasználó nevedre
$password = 'webbeaadmin1'; // Cseréld le a saját jelszavadra

// Kapcsolódás az adatbázishoz
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// A POST paraméterek beolvasása
$code = isset($_POST['code']) ? $_POST['code'] : '';
$op = isset($_POST['op']) ? $_POST['op'] : '';

if ($code == "AAAAAAabc123") {  // Kód ellenőrzése

    switch ($op) {
        case 'read':
            // Adatok olvasása
            $stmt = $pdo->prepare("SELECT * FROM users ORDER BY id DESC LIMIT 10");
            $stmt->execute();
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $rowCount = count($rows);
            $maxNum = $rowCount > 0 ? $rows[0]['id'] : 0;
            echo json_encode([
                'list' => $rows,
                'rowCount' => $rowCount,
                'maxNum' => $maxNum
            ]);
            break;

        case 'create':
            // Adatok beszúrása
            $name = isset($_POST['name']) ? $_POST['name'] : '';
            $age = isset($_POST['age']) ? $_POST['age'] : '';
            $gender = isset($_POST['gender']) ? $_POST['gender'] : '';
            
            if ($name && $age && $gender) {
                $stmt = $pdo->prepare("INSERT INTO users (name, age, gender) VALUES (?, ?, ?)");
                $stmt->execute([$name, $age, $gender]);
                echo "1"; // Success
            } else {
                echo "0"; // Validation error
            }
            break;

        case 'update':
            // Adat frissítése
            $id = isset($_POST['id']) ? $_POST['id'] : '';
            $name = isset($_POST['name']) ? $_POST['name'] : '';
            $age = isset($_POST['age']) ? $_POST['age'] : '';
            $gender = isset($_POST['gender']) ? $_POST['gender'] : '';
            
            if ($id && $name && $age && $gender) {
                $stmt = $pdo->prepare("UPDATE users SET name = ?, age = ?, gender = ? WHERE id = ?");
                $stmt->execute([$name, $age, $gender, $id]);
                echo "1"; // Success
            } else {
                echo "0"; // Validation error
            }
            break;

        case 'delete':
            // Adat törlése
            $id = isset($_POST['id']) ? $_POST['id'] : '';
            
            if ($id) {
                $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
                $stmt->execute([$id]);
                echo "1"; // Success
            } else {
                echo "0"; // Validation error
            }
            break;

        default:
            echo "Invalid operation!";
            break;
    }

} else {
    echo "Invalid code!";
}
?>
