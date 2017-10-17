// *Program hozzáadás* //
var pindex = 1;
$(".form-date-place:eq(0)").bind("keyup", inputValue);
$(".form-drive").bind("keyup", inputValue);

// *Képvetítő* //


// *Input figyelő* //
function inputValue() {
    if ($(this).val().length !== 0) {
        $(event.currentTarget).prev().addClass("active");
    } else {
        $(event.currentTarget).prev().removeClass("active");
    }
}


// *Idővonal lekérdezés* //
var response = "";
(function () {
    var request = new XMLHttpRequest();
    request.open("POST", "data.json");
    request.onreadystatechange = function () {
        if ((request.status === 200) && (request.readyState === 4)) {
            response = JSON.parse(request.responseText);
            createTimeline();
        }
    };
    request.send();
})();

// *Idővonal létrehozása* //
function createTimeline() {
    var inTimeline = document.getElementById("timeline");
    var months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
    var date_old = "";
    var year_old = "";
    var filtered_timeline = [];

    response.sort(function(a,b) {
       return new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime();
    });

    for (var i = 0; i < response.length; i++) {
        var timeline_li = document.createElement("li");
        var timeline_span = document.createElement("span");
        var timeline_date = document.createElement("div");
        var date_parts = response[i].dates[0].split("-");
        var date_new = date_parts[0] + "-" + date_parts[1];
        var year_new = date_parts[0];

        if (year_old !== year_new) {
          var timeline_ul = document.createElement("ul");
          timeline_ul.className = "timeline_ul";
          inTimeline.appendChild(timeline_ul);
        }
        timeline_ul.appendChild(timeline_li);

        // anchor tagek hozzáadása dátumokhoz
        if (date_new !== date_old) {
            var y = 0;
            var date_a = document.createElement("a");
            var currMonth = new Date(response[i].dates[0]).getMonth();
            var date_selector = document.createElement("a");

            date_a.setAttribute("id", date_new);
            timeline_li.appendChild(date_a);

            if (year_new !== year_old) {
                var dates_header = document.getElementById("dates-header");
                var timeline_dates = document.getElementById("timeline-dates");
                var curr_year = document.createElement("p");
                var date_selector_div = document.createElement("div");
                var dates_arrow = document.getElementsByClassName("dates-arrow");
                
                date_selector_div.className = "timeline-date";
                timeline_dates.appendChild(date_selector_div);
                curr_year.className = "curr-date";
                curr_year.innerHTML = year_new;
                dates_header.insertBefore(curr_year, dates_arrow[1]);
                year_old = year_new;
            }

            date_selector.setAttribute("href", "#" + date_new);
            date_selector.innerHTML = months[currMonth];
            date_selector_div.appendChild(date_selector);
            date_old = date_new;
        }

        timeline_li.appendChild(timeline_span);
        timeline_date.className = "date";

        if ((response[i].dates[1] !== "") && (response[i].dates[0] !== response[i].dates[1])) {
            timeline_date.innerHTML = response[i].dates[0] + " - " + response[i].dates[1];
        }
        else {
           timeline_date.innerHTML = response[i].dates[0];
        }
        timeline_li.appendChild(timeline_date);

        if (response[i].drive !== "") {
            var drive = document.createElement("a");
            var drive_icon = document.createElement("i");

            timeline_date.setAttribute("id", "drive");
            drive.setAttribute("target", "_blank");
            drive.setAttribute("href", response[i].drive);
            timeline_date.appendChild(drive);

            drive_icon.className = "fa fa-picture-o";
            drive_icon.setAttribute("aria-hidden", true);
            drive.appendChild(drive_icon);
        }

        for (var j = 0; j < response[i].places.length; j++) {
            var timeline_place = document.createElement("div");
            timeline_place.className = "place";
            timeline_place.innerHTML = response[i].places[j];
            timeline_li.appendChild(timeline_place);
        }

        if (response[i].imgname !== null) {
            var timeline_img = document.createElement("img");
            timeline_img.setAttribute("src", "uploads/" + response[i].imgname);
            timeline_img.className = "timeline-img";
            timeline_li.appendChild(timeline_img);
        }
    }
    dateIndex = document.getElementsByClassName("curr-date").length - 1;
    animationToLinks();
    plusDates(dateIndex);
}

// *Idővonal dátum választó* //
var tdate = new Date();
var tyear = tdate.getFullYear();
var dateIndex = "";

function plusDates(n) {
    
    var currDate = document.getElementsByClassName("curr-date");
    var timelineDate = document.getElementsByClassName("timeline-date");
    var arrows = document.getElementsByClassName;
    var tline_ul = document.getElementsByClassName("timeline_ul");
    dateIndex += n;

    if (dateIndex === currDate.length) {
        dateIndex = currDate.length - 1;
    }
    
    if (dateIndex === -1) {
        dateIndex = 0;
    }
    
    for (var i = 0; i < currDate.length; i++) {
        currDate[i].style.display = "none";
        timelineDate[i].style.display = "none";
    }
    
    currDate[dateIndex].style.display = "block";
    timelineDate[dateIndex].style.display = "flex";

    for (var i = 0; i < tline_ul.length; i++) {
      tline_ul[i].style.display = "none";
    }
    
    tline_ul[dateIndex].style.display = "block";
}

// *Lassú ugrás linkekhez* //
var findNavs = Array.from(document.getElementsByTagName("a"));

function animationToLinks() {
    
    findNavs.forEach(function (val) {
        var arr = val.href.split("#");
        if (arr[1]) {
            $(val).click(function (e) {
                e.preventDefault();

                $("html, body").animate({
                    scrollTop: $("#" + arr[1]).offset().top - 70
                }, 500);
            });
        }
    });
}


// *Form megnyitás* //
document.getElementById("add-button").addEventListener("click", function () {
    document.getElementById("adding-form").setAttribute("class", "active");
});


// *Program hozzáadás* //
function remaining() {
    
    document.getElementById("remaining").innerHTML = "Hozzáadás (" + (4 - pindex) + ")";
    if (pindex > 3) {
        document.getElementById("remaining").innerHTML = "";
    }
}

function addprogram() {
    var newProgramText = document.createElement("p");
    var newProgram = document.createElement("input");
    
    newProgramText.innerHTML = "Helyszín / Program:";
    newProgramText.className = "form-date-place-text";
    newProgram.type = "text";
    newProgram.className = "form-date-place";
    newProgram.setAttribute("name", "place-" + pindex);
    newProgram.setAttribute("placeholder", "Helyszín / Program");
    newProgram.setAttribute("maxlength", 28);

    $(".form-date-place").last().after(newProgramText);
    $(".form-date-place-text").last().after(newProgram);
    $(".form-date-place").last().on("keyup", inputValue);
    pindex++;
    remaining();
    if (pindex > 1) {
        $(".plus-minus-sign:eq(1)").removeClass("inactive");
    }
    if (pindex > 3) {
        $(".plus-minus-sign:eq(0)").css("visibility", "hidden");
    }
    document.body.scrollTop = document.body.scrollHeight;
}


// *Program törlés* //
function deleteprogram() {
    $(".form-date-place").last().remove();
    $(".form-date-place-text").last().remove();
    pindex--;
    remaining();
    if (pindex == 1) {
        $(".plus-minus-sign:eq(1)").addClass("inactive");
    }
    if (pindex == 3) {
        $(".plus-minus-sign:eq(0)").css("visibility", "visible");
    }
}


// *Function meghívások* //