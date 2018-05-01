// Category : https://data.police.uk/api/crime-categories

// Force : https://data.police.uk/api/forces

// Crimes: https://data.police.uk/api/crimes-no-location?category=all-crime&force=leicestershire


var categoriesEl = document.getElementById('crimeCategories');
var forcesEl = document.getElementById('forces');
var searchBtn = document.getElementById('search');
var resultEl = document.getElementById('result');
var tbodyEl = document.getElementById('tbody');
var tableEl = document.getElementById('table');

fetch("https://data.police.uk/api/crime-categories")
    .then(res => res.json())
    .then(myJson => categories(myJson))

fetch("https://data.police.uk/api/forces")
    .then(res => res.json())
    .then(myJson => forces(myJson))


function categories(myJson) {
    crimesUrl = myJson.url;
    for (var i = 0; i < myJson.length; i++) {
        categoriesEl.innerHTML += `
            <option value="${myJson[i].url}">${myJson[i].name}</option>
        `
    }
}

function forces(myJson) {
    forcesId = myJson.id;
    for (var i = 0; i < myJson.length; i++) {
        forcesEl.innerHTML += `
            <option value="${myJson[i].id}">${myJson[i].name}</option>
        `
    }
}

function searchTheCrimeReport() {
    var crimeRef = document.getElementById("crimeCategories");
    var strUserCrime = crimeRef.options[crimeRef.selectedIndex].value;

    var forceRef = document.getElementById("forces");
    var strUserForce = forceRef.options[forceRef.selectedIndex].value;
    var crimeType = crimeRef.value;
    var force = forceRef.value;

    fetch(`https://data.police.uk/api/crimes-no-location?category=${crimeType}&force=${force}`)
        .then(res => res.json())
        .then(myJson => crimes(myJson))
}

function crimes(myJson) {
    resultEl.innerHTML = '';

    if (myJson.length !== 0) {
        for (var i = 0; i < myJson.length; i++) {
            tableEl.style.visibility = 'visible';
            tbodyEl.innerHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${myJson[i].category}</td>
                    <td>${myJson[i].month}</td>
                    <td>${myJson[i].id}</td>
                </tr>
            ` // <td class="text-center">${myJson[i].outcome_status.category}</td>                             

        }
    }
    else {
        tableEl.style.visibility = 'hidden';
        tbodyEl.innerHTML = " ";
        resultEl.style.color = "Red";
        resultEl.style.fontSize = "3em";
        resultEl.style.textShadow = "3px 3px 6px yellow";
        resultEl.innerHTML = "No Cirminal Record";

    }
}


                   