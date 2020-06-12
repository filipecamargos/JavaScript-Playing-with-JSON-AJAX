/**************************************************************
 * AJAX FIRST PART FOR THE COUNTRY DATA
 * ************************************************************/

//get the event for the buttom selected
var country = document.getElementById("country");

//add an event to country
country.addEventListener("change", function() {
    CountryInfo(this.value)
});


//object of the information
var info1 = document.getElementById("info1");

//Display Country Info Fuction
function CountryInfo(countrySelected) {

    //Return in case none is selected
    if (countrySelected == "None") {
        info1.style.display = "none";
        return;
    }

    //Make the name a document.txt
    let documentToBeOpen = countrySelected + ".txt";

    //Open the proper file and load it in the page
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            info1.innerHTML = this.responseText;
            info1.style.display = "block"
        }
    };
    xhttp.open("GET", documentToBeOpen, true);
    xhttp.send();
}

/**************************************************************
 * AJAX SECOND PART WITH JSON
 * ************************************************************/
//Default the the input value
document.getElementById("jsonText").value = "json.txt";

//Place where the file will be displayed
var displayPlace = document.getElementById("jason_display");


//Trigger the evernt when button is clicked
document.getElementById("button").addEventListener("click", function() {
    doesFileExist(document.getElementById("jsonText").value);
});

//Check if the File exist --  I found this function on www.kirupa.com/html5/checking_if_a_file_exists.htm
function doesFileExist(urlToFile) {
    var file = new XMLHttpRequest(); //Creat an object for the file
    file.open('HEAD', urlToFile, false);
    file.send();

    if (file.status == "404") {
        document.getElementById("intruction-file").innerHTML = " File Not Found. Please Enter a Valid File";
        document.getElementById("jason_display").innerHTML = ""
    } else {
        getFileFunction();
        document.getElementById("intruction-file").innerHTML = "";
    }
}

function getFileFunction() {
    //Get the input file name
    var fileRequested = document.getElementById("jsonText").value;

    //Let Use AJAX to request the data
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            //lets parse the file into a object in JavaScript
            let jasonobj = JSON.parse(this.responseText);

            //lets have our function that will display
            displayJason(jasonobj);
        }
    };

    xhr.open("GET", fileRequested, true);
    xhr.send();

}

//Display Function

function displayJason(jasonobj) {

    var infomation = "";

    for (i of jasonobj.students) {
        infomation += "<div class=information> <h3> Full Name: " + i.first + " " + i.last + "</h3>"
        infomation += "<h3> Address: " + i.address.city + ", " + i.address.state + ", " +
            i.address.zip + "</h3>";
        infomation += "<h3> Major: " + i.major + "</h3>";
        infomation += "<h3> GPA: " + i.gpa + "</h3> </div>";
    }
    console.log(infomation); //For visualizaition of the structure
    document.getElementById("jason_display").innerHTML = infomation;
}