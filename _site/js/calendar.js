var monthLabels = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
    daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    currDay = date.getDate(),
    firstDay = new Date(currYear, currMonth, 1), // adott hónap első napja
    startingDay = firstDay.getDay() - 1, // hány nap van elseje előtt a hónapban
    monthLength = daysInMonths[currMonth],
    calCurrDate = document.getElementsByClassName("curr-date"),
    days = document.getElementById("days"),
    container = document.getElementById("container"),
    adding = document.getElementById("adding"),
    closer = document.getElementById("closer"),
    formData = document.getElementById("form-data"),
    dayLi,
    daySpan,
    clickedDay;


// *Naptár feltöltése* //
var loadCal = (function loadCalendar() {
    calCurrDate[0].innerHTML = currYear;
    calCurrDate[1].innerHTML = monthLabels[currMonth];

    if (startingDay < 0) {
        startingDay += 7; 
    }
    
    for (var j = 0; j < startingDay; j++) { // üres napok
        dayLi = document.createElement("li");
        days.appendChild(dayLi);    
    }

    for (var i = 1; i <= monthLength; i++) {
        dayLi = document.createElement("li");
        daySpan = document.createElement("span");
        if ((currYear === date.getFullYear()) && (currMonth === date.getMonth()) && (currDay === i)) {
            daySpan.className = "active";
        } else {
            daySpan.className = "select";
            daySpan.addEventListener("click", addProgram);
            closer.addEventListener("click", closing);

        }
        daySpan.innerHTML = i;
        dayLi.appendChild(daySpan);
        days.appendChild(dayLi);
    }
    return loadCalendar;
})();


// *Dátum lapozó* //
function plusDates(n) {
    currMonth += n;
    
    if (currMonth === 12) {
        currYear++;
        currMonth = 0;
    } else if (currMonth === -1) {
        currYear--;
        currMonth = 11;
    }
    
    firstDay = new Date(currYear, currMonth, 1);
    startingDay = firstDay.getDay() - 1;
    monthLength = daysInMonths[currMonth];
    
    while (days.hasChildNodes()) { // előző napok törlése
    days.removeChild(days.lastChild);
}
    loadCal();
}

// *Program hozzáadás* //
function addProgram(e) {
    container.style.filter = "blur(2px)";
    container.style.pointerEvents = "none";
    adding.style.display = "block";
    clickedDay = e.target.innerHTML;
    formData.innerHTML = currYear + ". " + monthLabels[currMonth].toLocaleLowerCase() + " " + clickedDay + ".";
}

// *Program hozzáadó bezárás* //
function closing() {
    container.style.filter = "";
    container.style.pointerEvents = "auto";
    adding.style.display = "none";
}