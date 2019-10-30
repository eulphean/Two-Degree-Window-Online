var map; 
var mainClock; 

var momentFormat = "MM/DD/YYYY HH:mm:ss"; 
var futureDateTime = "01/05/2037 00:00:00";
var timezoneFile = "timezones.json";

// ------------------------------- Sketch Setup ------------------------------
function setup() {
  // Remove Canvas
  noCanvas(); 

  // Initialize map using D3. 
  map = new Map(windowWidth, windowHeight); 

  // Initialize the main clock counter
  var timezone = moment.tz.guess(); // Retrieve the timezone from the browser. 
  clock = new Clock(timezone); 
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {

}