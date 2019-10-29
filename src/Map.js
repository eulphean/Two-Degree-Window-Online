// A class to create a Map. 
class Map {
    constructor(width, height) {
        this.width = width; this.height = height;

        // Empty svg as the root.
        this.svg = d3.select(".map").append("svg")
                .attr('preserveAspectRadio', 'none')
                .attr('viewBox', [0, 0, width, height])
        
        // Load TopoJson file and create the map. 
        this.initMap(); 
    }

    initMap() {
        d3.json(timezoneFile).then((topology) => { 
            // console.log(topology);

            // Extract all the feature data into a GeoJson object. 
            var geojson = topojson.feature(topology, topology.objects.timezone_oceans_geo);
            // console.log(geojson);
        
            // Create Projection (how lat/long will be converted to 2D pixel space). 
            // Do scaling to fit the map on the screen. 
            var geoProjection = d3.geoEquirectangular(); 
            geoProjection.fitSize([this.width, this.height], geojson);
        
            // Geo shape object that converts the actual geometry into shapes to be drawn. 
            var geoPath = d3.geoPath(geoProjection);
        
            // Bind geogson features to path elements and then append (enter) new path element. 
            // Append path elements 'd' attribute to the geoPath (path string that defines the svg path)
            this.svg.selectAll("path")
                .data(geojson.features)
                .enter().append("path")
                .attr("d", geoPath)
                .on("mouseover", this.handleMouseover)
                .on("mouseout", this.handleMouseout);
        });
    }

    handleMouseover(d, i) {
        console.log(d.properties.tzid); // Get a text element 
        d3.select(d3.event.target)
            .transition()
            .style('fill', 'black');
    }

    handleMouseout(d, i) {
        d3.select(d3.event.target)
        .transition()
        .style('fill', 'white');
    }
}

  