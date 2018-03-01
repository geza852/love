// *Input figyelő* //
function inputValue(e) {
    if (e.currentTarget.value.length !== 0) {
        e.currentTarget.previousElementSibling.classList.add("load-inputs");
        e.currentTarget.previousElementSibling.style.opacity = "1";
    } else {
        e.currentTarget.previousElementSibling.classList.remove("load-inputs");
        e.currentTarget.previousElementSibling.style.opacity = "0";
    }
}

// *Idővonal dátum választó* //
var tdate = new Date(),
    tyear = tdate.getFullYear(),
    dateIndex;

function plusDates(n, b) {
    var currDate = document.getElementsByClassName("curr-date"),
        timelineDate = document.getElementsByClassName("timeline-date"),
        arrows = document.getElementsByClassName,
        tline_ul = document.getElementsByClassName("timeline_ul");
    
    if (b !== true) {dateIndex += n;}

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

// *Idővonal létrehozása* //
function createTimeline() {
    var curr_month,
        cur_year,
        date_a,
        date_old,
        date_new,
        date_parts,
        date_selector,
        date_selector_div,
        dates_arrow,
        dates_header,
        drive,
        drive_icon,
        filtered_timeline = [],
        in_timeline = document.getElementById("timeline"),
        months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
        timeline_date,
        timeline_dates,
        timeline_img,
        timeline_li,
        timeline_ul,
        timeline_span,
        timeline_place,
        y,
        year_old,
        year_new; 

    response.sort(function(a,b) {
    return new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime();
    });

    for (var i = 0; i < response.length; i++) {
        timeline_li = document.createElement("li");
        timeline_span = document.createElement("span");
        timeline_date = document.createElement("div");
        date_parts = response[i].dates[0].split("-");
        date_new = date_parts[0] + "-" + date_parts[1];
        year_new = date_parts[0];

        if (year_old !== year_new) {
          timeline_ul = document.createElement("ul");
          timeline_ul.className = "timeline_ul";
          in_timeline.appendChild(timeline_ul);
        }
        timeline_ul.appendChild(timeline_li);

        // anchor tagek hozzáadása dátumokhoz
        if (date_new !== date_old) {
            y = 0;
            date_a = document.createElement("a");
            curr_month = new Date(response[i].dates[0]).getMonth();
            date_selector = document.createElement("a");

            date_a.setAttribute("id", date_new);
            timeline_li.appendChild(date_a);

            if (year_new !== year_old) {
                dates_header = document.getElementById("dates-header");
                timeline_dates = document.getElementById("timeline-dates");
                curr_year = document.createElement("p");
                date_selector_div = document.createElement("div");
                dates_arrow = document.getElementsByClassName("dates-arrow");
                
                date_selector_div.className = "timeline-date";
                timeline_dates.appendChild(date_selector_div);
                curr_year.className = "curr-date";
                curr_year.innerHTML = year_new;
                dates_header.insertBefore(curr_year, dates_arrow[1]);
                year_old = year_new;
            }

            date_selector.setAttribute("href", "#" + date_new);
            date_selector.innerHTML = months[curr_month];
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
            drive = document.createElement("a");
            drive_icon = document.createElement("i");

            timeline_date.setAttribute("id", "drive");
            drive.setAttribute("target", "_blank");
            drive.setAttribute("href", response[i].drive);
            timeline_date.appendChild(drive);

            drive_icon.className = "fa fa-picture-o";
            drive_icon.setAttribute("aria-hidden", true);
            drive.appendChild(drive_icon);
        }

        for (var j = 0; j < response[i].places.length; j++) {
            timeline_place = document.createElement("div");
            timeline_place.className = "place";
            timeline_place.innerHTML = response[i].places[j];
            timeline_li.appendChild(timeline_place);
        }

        if (response[i].imgname !== null) {
            timeline_img = document.createElement("img");
            timeline_img.setAttribute("src", "uploads/" + response[i].imgname);
            timeline_img.className = "timeline-img";
            timeline_li.appendChild(timeline_img);
        }
    }
    dateIndex = document.getElementsByClassName("curr-date").length - 1;
    plusDates(dateIndex, true);
}

// *Idővonal lekérdezés* //
var response;
var timeline = (function invokeTimeline() {
    
    var request = new XMLHttpRequest();
    request.open("GET", "data.json");
    request.onreadystatechange = function () {
        if ((request.status === 200) && (request.readyState === 4)) {
            response = JSON.parse(request.responseText);
            createTimeline();
            console.log('reloaded');
        }
    };
    request.send();
    return invokeTimeline;
})();

// *Form megnyitás* //
document.getElementById("add-button").addEventListener("click", function () {
    var formDateDrive = document.getElementsByClassName("form-date-drive"),
        formPlaceFirst = document.getElementById("form-place-first"),
        addingForm =  document.getElementById("adding-form");
    
    addingForm.setAttribute("class", "active");
    formPlaceFirst.addEventListener("keyup", inputValue);
    
    for (var i = 0; i < formDateDrive.length; i++) {
        formDateDrive[i].addEventListener("keyup", inputValue);
    }
});


// *Program hozzáadás* //
var pindex = 1;

function remaining() {
    document.getElementById("remaining").innerHTML = "Hozzáadás (" + (4 - pindex) + ")";
    if (pindex > 3) {
        document.getElementById("remaining").innerHTML = "";
    }
}

function addprogram() {
    var newProgram = document.createElement("input");
    
    newProgram.type = "text";
    newProgram.className = "form-place";
    newProgram.setAttribute("name", "place-" + pindex);
    newProgram.setAttribute("placeholder", "Helyszín / Program");
    newProgram.setAttribute("maxlength", 28);
    
    $(".form-place").last().after(newProgram);
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
    $(".form-place").last().remove();
    pindex--;
    remaining();
    if (pindex == 1) {
        $(".plus-minus-sign:eq(1)").addClass("inactive");
    }
    if (pindex == 3) {
        $(".plus-minus-sign:eq(0)").css("visibility", "visible");
    }
}

// *Program képméret ellenőrzés* //
var _URL = window.URL,
    formImgError = document.getElementById("form-img-error");

document.getElementById("form-img").addEventListener("change", function(e){
    var file,
        fileName,
        img;
        
    formImgError.innerHTML = "";
    
    if (file = this.files[0]) {
        img = new Image();
        
        img.onload = function() {
            fileName = file.name.split('.');
            
            if ((this.width > 500) || (this.height > 600)) {
                e.target.value = "";
                formImgError.innerHTML = "Túl nagy képméret!";
            }
            
            if (fileName.pop() !== "jpg") {
                e.target.value = "";
                formImgError.innerHTML = "Csak .jpg képformátum!";
            }
            
            if (fileName[0].length < 1) {
                e.target.value = "";
                formImgError.innerHTML = "Hibás fájlnév!";
            }
        };
        
        img.onerror = function() {
            e.target.value = "";
            formImgError.innerHTML = "Hibás fájlformátum!";
        };

        img.src = _URL.createObjectURL(file);
    }
});

$('#adding-form').submit(function(e){
    e.preventDefault();
    $.ajax({
        url:'form.php',
        type:'post',
        data:$('#adding-form').serialize(),
        success:function(){
            
            var currDate = document.getElementsByClassName("curr-date"),
                timelineDate = document.getElementsByClassName("timeline-date"),
                datesHeader = document.getElementById("dates-header"),
                timelineDates = document.getElementById("timeline-dates");
            document.getElementById("timeline").innerHTML = "";
            
            for (var i = currDate.length - 1; i >= 0; i--) {
                datesHeader.removeChild(currDate[i]);
                timelineDates.removeChild(timelineDate[i]);
            }
            alert("Sikeres hozzáadás az idővonalhoz!"); 
        }
    });
    $(document).ajaxStop(timeline);
});

// *Lassú ugrás linkekhez* //
window.onload = function () {
    document.getElementById("img-container").className = "load-showing";
    
    var findNavs = Array.from(document.getElementsByTagName("a"));
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
};
