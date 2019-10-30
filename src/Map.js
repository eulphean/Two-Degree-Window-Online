// A class to create a Map. 
class Map {
    constructor(width, height) {
        this.width = width; this.height = height;

        // Empty svg as the root.
        this.svg = d3.select(".map").append("svg")
                .attr('preserveAspectRadio', 'none')
                .attr('viewBox', [0, 0, width, height])

        if (this.isMobile()) {
            // Initiate modal. 
            this.initModal();

            // Remove tooltip. 
            var tooltip = document.getElementsByClassName('tooltip')[0];
            tooltip.remove();
        } else {
            // Select tooltip component to modify it in the future.  
            this.tooltip = d3.select('.tooltip');
        }
        
        // Load TopoJson file and create the map. 
        this.initMap();
    }

    initModal() {
        // New modal. 
        this.modal = new tingle.modal({
            footer: true,
            stickyFooter: true,
            cssClass: ['custom-class-1']
        });

        /// Append dom elements that I want to show. 
        var tz = document.getElementsByClassName('tooltipTz')[0].outerHTML; 
        var clock = document.getElementsByClassName('tooltipClock')[0].outerHTML; 
        var caption = document.getElementsByClassName('tooltipCaption')[0].outerHTML; 
        this.modal.setContent(tz+clock+caption);

        // // add a button
        this.modal.addFooterBtn('OK', 'tingle-btn tingle-btn--primary', ()=> {
            // here goes some logic
            this.modal.close();
        });
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
                .on('mouseover', this.handleMouseover.bind(this))
                .on('mousemove', this.handleMousemove.bind(this))
                .on('mouseout', this.handleMouseout.bind(this));
        });
    }

    handleMouseover(d, i) {
        // Extract the timezone from the data. 
        var timezone = d.properties.tzid; 
        var tzData = moment.tz(timezone).format('Z'); // Get utc offset and timezone
        
        // Calculate a future moment. 
        var futureMoment = moment.tz(futureDateTime, momentFormat, timezone);  
        this.updateClock(futureMoment, timezone); // One shot update. 
        this.timeInterval = setInterval(this.updateClock.bind(this), 1000, futureMoment, timezone);

        // Path's style updates. 
        var randomColor = this.getRandomColor(); 
        
        if (!this.isMobile()) {
            d3.select(d3.event.target)
                .transition()
                .style('fill', color(randomColor.r, randomColor.g, randomColor.b));
        } else {
            d3.select(d3.event.target)
                .transition()
                .style('fill', 'white');
        }

        if (this.isMobile()) {
            d3.selectAll('.tooltipTz').text(timezone + ' ' + tzData);
            this.modal.open(); // Open model. 
        }  else {
            // Show tooltip. 
            this.tooltip
                .style('visibility', 'visible')
                .select('.tooltipTz')
                .text(timezone + ' ' + tzData);
        }
    }

    handleMousemove(d, i) {
        if (!this.isMobile()) {
            var tooltipWidth = select('.tooltip').width;
            // Handle where to draw the tooltip. 
            var left;
            if (mouseX > 1/2* windowWidth) {
                left = event.pageX-tooltipWidth; 
            } else {
                left = event.pageX+25; 
            }

            this.tooltip
                .style('top', (event.pageY+15) + 'px')
                .style('left', left + 'px');
        }
    }

    handleMouseout(d, i) {
        if (!this.isMobile()) {
            // Path's style updates. 
            d3.select(d3.event.target)
                .transition().duration(10000)
                .style('fill', 'white');

            // Hide the tooltip. 
            this.tooltip    
                .style('visibility', 'hidden');

            // Clear the pending interval of the current timezone. 
        }
        
        // We clear interval nonetheless.
        clearInterval(this.timeInterval); 
    }

    updateClock(future, timezone) {
        var currentMoment = moment.tz(timezone); 
        var diff = future.diff(currentMoment.format());
        var duration = moment.duration(diff); 
        var counter = {
            y : duration.years(),
            d : parseInt(duration.days()) + duration.months() * 30,
            h : duration.hours(),
            m : duration.minutes(),
            s : duration.seconds()
        }

        var output = counter.y + ' Years, ' + counter.d + ' Days, ' + counter.h + ' Hours, ' + counter.m + ' Minutes, ' + counter.s + ' Seconds'; 
        
        // Update text on tooltip clock. 
        d3.selectAll('.tooltipClock')
            .text(output);
    }

    getRandomColor() {
        var r = random(255); 
        var g = random(255);
        var b = random(255); 
        return {
            'r': r, 'g': g, 'b': b
        }; 
    }

    isMobile() {
        return (typeof window.orientation !== "undefined");
    }
}

