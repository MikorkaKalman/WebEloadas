var selectedIndex = null;
var array = [
    {"fullName": "Kiss Péter", "age": 25, "gender": "Férfi", "city": "Budapest"},
    {"fullName": "Nagy Anna", "age": 30, "gender": "Nő", "city": "Debrecen"},
    {"fullName": "Szabó Gábor", "age": 22, "gender": "Férfi", "city": "Szeged"},
    {"fullName": "Tóth Júlia", "age": 28, "gender": "Nő", "city": "Pécs"}
];
window.onload = function () {
    printArray();
    var headers = document.querySelectorAll('th.sortable');
    headers.forEach(function(header) {
        header.addEventListener('click', function() {
            var column = header.getAttribute('data-column');
            sortTable(column);
        });
    });
};

// Rendezési irányok tárolása
var sortAscending = {
    fullName: true,
    age: true,
    gender: true,
    city: true
};

// Form submission és validálás
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedIndex == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

// Adatok beolvasása
function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["age"] = parseInt(document.getElementById("age").value) || 0;
    formData["gender"] = document.getElementById("gender").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

// Új rekord hozzáadása
function insertNewRecord(data) {
    array.push({"fullName": data.fullName, "age": data.age, "gender": data.gender, "city": data.city});
    printArray();
}

// A táblázat frissítése
function printArray(filteredArray = array) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    var newRow;
    for (let i = 0; i < filteredArray.length; i++) {
        newRow = table.insertRow(table.length);
        newRow.insertCell(0).innerHTML = filteredArray[i].fullName;
        newRow.insertCell(1).innerHTML = filteredArray[i].age;
        newRow.insertCell(2).innerHTML = filteredArray[i].gender;
        newRow.insertCell(3).innerHTML = filteredArray[i].city;
        newRow.insertCell(4).innerHTML = '<a onClick="onEdit('+i+')">Edit</a> ' + '<a onClick="onDelete('+i+')"> Delete</a>';
    }
}

// Form nullázása
function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("city").value = "";
    selectedIndex = null;
}

// Rekord szerkesztése
function onEdit(index) {
    document.getElementById("fullName").value = array[index].fullName;
    document.getElementById("age").value = array[index].age;
    document.getElementById("gender").value = array[index].gender;
    document.getElementById("city").value = array[index].city;
    selectedIndex = index;
}

// Rekord frissítése
function updateRecord(formData) {
    array[selectedIndex].fullName = formData.fullName;
    array[selectedIndex].age = formData.age;
    array[selectedIndex].gender = formData.gender;
    array[selectedIndex].city = formData.city;
    printArray();
}

// Rekord törlése
function onDelete(index) {
    if (confirm('Are you sure to delete this record?')) {
        array.splice(index, 1);
        resetForm();
        printArray();
    }
}

// Validáció
function validate() {
    var isValid = true;

    // Név validálása
    var fullName = document.getElementById("fullName");
    if (fullName.value.trim() === "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        if (fullName.value.length < 3 || fullName.value.length > 50) {
            isValid = false;
            document.getElementById("fullNameValidationError").classList.remove("hide");
        } else {
            document.getElementById("fullNameValidationError").classList.add("hide");
        }
    }

    // Kor validálása
    var age = document.getElementById("age");
    if (age.value < 18 || age.value > 100 || age.value === "") {
        isValid = false;
    }

    // Nem validálása
    var gender = document.getElementById("gender");
    if (gender.value.trim() === "" || gender.value.length < 3 || gender.value.length > 10) {
        isValid = false;
    }

    // Város validálása
    var city = document.getElementById("city");
    if (city.value.trim() === "" || city.value.length < 3 || city.value.length > 50) {
        isValid = false;
    }

    return isValid;
}

// Rendezési függvény
function sortTable(property) {
    array.sort(function(a, b) {
        if (typeof a[property] === 'string') {
            return sortAscending[property]
                ? a[property].localeCompare(b[property])
                : b[property].localeCompare(a[property]);
        } else {
            return sortAscending[property]
                ? a[property] - b[property]
                : b[property] - a[property];
        }
    });
    sortAscending[property] = !sortAscending[property];
    printArray();
}

// Szűrés funkció
function filterTable(column) {
    var filterValue = document.getElementById("filter" + column.charAt(0).toUpperCase() + column.slice(1)).value.toLowerCase();
    var filteredArray = array.filter(function(item) {
        return item[column].toString().toLowerCase().includes(filterValue);
    });
    printArray(filteredArray);
}
