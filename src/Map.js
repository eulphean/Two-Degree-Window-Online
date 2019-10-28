// A class to create a Map. 
class Map {
    constructor(width, height) {
        // Empty svg as the root.
        var svg = d3.select(".map").append("svg")
                .attr('width', width)
                .attr('height', height)
        console.log(svg);
        
        // Load TopoJson file and create the map. 
        this.loadMap(svg, width, height); 
    }

    loadMap(svg, width, height) {
        d3.json("timezones.json").then((topology) => { 
            console.log(topology);

            // Extract all the feature data into a GeoJson object. 
            var geojson = topojson.feature(topology, topology.objects.timezone_oceans_geo);
            console.log(geojson);
        
            // Create Projection (how lat/long will be converted to 2D pixel space). 
            // Do scaling to fit the map on the screen. 
            var geoProjection = d3.geoEquirectangular(); 
            // geoProjection.fitSize([width-100, height], geojson);
            geoProjection.fitExtent([[0, 0], [width-50, height-100]], geojson); 
        
            // Geo shape object that converts the actual geometry into shapes to be drawn. 
            var geoPath = d3.geoPath(geoProjection);
        
            // Join FeatureCollection's features to path elements.
            // Bind date
            // Append path elements 'd' attribute to the geoPath (path string that defines the svg path) 
            svg.selectAll("path")
            .data(geojson.features)
            .enter().append("path")
            .attr("d", geoPath);
        });
    }
}

  