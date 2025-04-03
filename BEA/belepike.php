<?php
session_start();

// Előre megadott belépési adatok
$helyes_felhasznalonev = "admin";
$helyes_jelszo = "admin";

// Beírt adatok ellenőrzése
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $felhasznalonev = $_POST["username"] ?? '';
    $jelszo = $_POST["password"] ?? '';
    
    if ($felhasznalonev === $helyes_felhasznalonev && $jelszo === $helyes_jelszo) {
        // Sikeres belépés -> munkamenet indítása
        $_SESSION["loggedin"] = true;
        $_SESSION["username"] = $felhasznalonev;
        
        // Átirányítás az index.html-re
        header("Location: index.html");
        exit();
    } else {
        // Sikertelen belépés -> vissza a bejelentkező oldalra
        echo "<script>alert('Hibás felhasználónév vagy jelszó!'); window.location.href='Belepes.html';</script>";
    }
} else {
    // Ha valaki közvetlenül próbálja elérni az oldalt
    header("Location: Belepes.html");
    exit();
}
