// ------------------------------- Sketch Setup ------------------------------
function setup() {
  // Time we are calculating till. 
  var future = "01/05/2037 00:00:00"; 

  var futureTaipei = moment.tz(future, "MM/DD/YYYY HH:mm:ss", "Asia/Taipei"); 
  var futureChicago = moment.tz(future, "MM/DD/YYYY HH:mm:ss", "America/Chicago"); 
  var futureUtc = moment.utc(future, "MM/DD/YYYY HH:mm:ss"); 

  setInterval(timerCallback, 1000, futureTaipei, futureChicago, futureUtc); 
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {

}

function timerCallback(futureTaipei, futureChicago, futureUtc) { 
  // Current time.
  var nowTaipei = moment.tz("Asia/Taipei");
  var nowChicago = moment.tz("America/Chicago");
  var nowUtc = moment.utc(); 

  var diffTaipei = futureTaipei.diff(nowTaipei.format());
  var diffChicago = futureChicago.diff(nowChicago.format());
  var diffUtc = futureUtc.diff(nowUtc.format());

  var counterTaipei = createOutput(diffTaipei);
  var counterChicago = createOutput(diffChicago);
  var counterUtc = createOutput(diffUtc); 
 
  console.log('Taipei: ' + counterTaipei);
  console.log('Chicago: ' + counterChicago);
  console.log('UTC: ' + counterUtc);
}

function createOutput(diff) {
  var output; 
  var duration = moment.duration(diff); 
  var days = parseInt(duration.days()) + duration.months() * 30;
  output = 'Years:' + duration.years() + ' Days:' + days + ' Hours:' + duration.hours() + ' Minutes:' + duration.minutes() + ' Seconds:' + duration.seconds(); 

  return output; 
}