// ------------------------------- Sketch Setup ------------------------------
function setup() {
  // Remove Canvas
  noCanvas(); 

  var width = windowWidth;
  var height = windowHeight;

  // Empty svg as the root.
  var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background", "black");

  d3.json("timezones.json").then(function(topology) { 
    console.log(topology);
    
    // Extract all the feature data into a GeoJson object. 
   // var geojson = topojson.feature(topology, topology.objects.timezone_oceans_geo);
    var geojson = topojson.feature(topology, topology.objects.timezone_oceans_geo);
    console.log(geojson);

    // Create projection (how lat/long will be converted to 2D pixel space). 
    // Do scaling to fit the map on the screen. 
    var geoProjection = d3.geoEquirectangular(); 
    geoProjection.fitExtent([0, 0], [width, height], geojson);
    geoProjection.fitSize([width, height], geojson);

    // Geo shape object that converts the actual geometry into shapes to be drawn. 
    var geoPath = d3.geoPath(geoProjection);

    // Join FeatureCollection's features to path elements. 
    // Append path elements 'd' attribute to the geoPath (path string that defines the svg path) 
    svg.selectAll("path")
    .data(geojson.features)
    .enter().append("path")
    .attr("d", geoPath);
  });
}

// ------------------------------- Sketch Draw (loop) ------------------------
function draw() {
}