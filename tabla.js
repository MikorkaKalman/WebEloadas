// Irányítószám validálása (statikus lista alapján)
function validatePostalCode(postalCode) {
    // Példa irányítószámok (ezeket cseréld valós irányítószámokra)
    const validPostalCodes = ["1011", "1024", "1033", "1045", "1051"];

    // Ellenőrizzük, hogy az irányítószám benne van-e a listában
    return validPostalCodes.includes(postalCode);
}

function addRow() {
    let col1 = document.getElementById("col1").value;
    let col2 = document.getElementById("col2").value;
    let col3 = document.getElementById("col3").value;
    let col4 = document.getElementById("col4").value;
    let ticketType = document.getElementById("ticketType").value;
    let postalCode = document.getElementById("postalCode").value;  // Az irányítószám mezője
    let expiryDate = new Date();
    let tickets = [];

    // Irányítószám validálása
    if (!validatePostalCode(postalCode)) {
        alert("Érvénytelen irányítószám! Kérjük, ellenőrizze és próbálja újra.");
        return;
    }

    // Külön bérlettípusok kezelése
    if (ticketType == "1") {  // 1 napos jegy
        expiryDate.setDate(expiryDate.getDate() + 1);  // +1 nap
        tickets.push({type: "1 napos jegy", expiry: expiryDate});
    } else if (ticketType == "10") {  // 10 alkalmas jegy
        expiryDate.setDate(expiryDate.getDate() + 1);  // +1 nap
        tickets.push({type: "10 alkalmas jegy", expiry: expiryDate});
    } else if (ticketType == "30") {  // 1 hónapos bérlet
        expiryDate.setMonth(expiryDate.getMonth() + 1);  // +1 hónap
        tickets.push({type: "1 hónapos bérlet", expiry: expiryDate});
    } else if (ticketType == "365") {  // 1 éves bérlet
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);  // +1 év
        tickets.push({type: "1 éves bérlet", expiry: expiryDate});
    }

    // Ellenőrzés
    if (!col1 || !col2 || !col3 || !col4 || col3 < 18 || col3 > 100) {
        alert("Minden mező kitöltése kötelező, és az életkor 18 és 100 között kell legyen!");
        return;
    }

    let table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    let ticketHtml = tickets.map(ticket => 
        `<p>${ticket.type}: ${formatCountdown(ticket.expiry)}</p>`
    ).join("");
    newRow.innerHTML = `<td>${col1}</td><td>${col2}</td><td>${col3}</td><td>${col4}</td>
        <td>${ticketHtml}</td>
        <td><button onclick="deleteRow(this)">Törlés</button></td>`;
}

function deleteRow(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function formatCountdown(expiryDate) {
    let now = new Date();
    let timeDiff = new Date(expiryDate) - now;
    let daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));  // Hátralévő napok számítása
    return daysLeft > 0 ? `${daysLeft} nap` : "Lejárt";
}

function updateCountdowns() {
    let rows = document.querySelectorAll("#dataTable tbody tr");
    rows.forEach(row => {
        let cells = row.cells[4].getElementsByTagName('p');
        Array.from(cells).forEach(cell => {
            let expiryDate = new Date(cell.innerText.split(": ")[1]);
            cell.innerText = `${cell.innerText.split(": ")[0]}: ${formatCountdown(expiryDate)}`;
        });
    });
}

setInterval(updateCountdowns, 1000 * 60 * 60);  // Óránként frissíti a visszaszámlálást

function searchTable() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#dataTable tbody tr");
    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}
