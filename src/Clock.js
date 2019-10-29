class Clock {
    constructor(timezone) {
        // Find all the elements in the dom. 
        var clockElement = document.getElementsByClassName('clock')[0];
        var timezoneElement = document.getElementsByClassName('tz')[0];
        var captionElement = document.getElementsByClassName('caption')[0]; 

        var timezoneData = moment.tz(timezone).format('Z z');
        console.log(timezoneData);
        this.clockEl = clockElement; 
        this.tzone = timezone; 
        this.futureMoment = moment.tz(futureDateTime, momentFormat, this.tzone);  
        this.timer = setInterval(this.updateClock.bind(this), 1000); 

        // Set text for all the elements in this clock section. 
        this.clockEl.innerText = 'Years, Days, Hours, Minutes, Seconds'; 
        timezoneElement.innerText = timezone + ' ' + timezoneData; 
        captionElement.innerText = clockCaptionText; 
    }

    updateClock() {
        var currentMoment = moment.tz(this.tzone); 
        var diff = this.futureMoment.diff(currentMoment.format());
        var duration = moment.duration(diff); 
        var counter = {
            y : duration.years(),
            d : parseInt(duration.days()) + duration.months() * 30,
            h : duration.hours(),
            m : duration.minutes(),
            s : duration.seconds()
        }

        var output = counter.y + ' Years, ' + counter.d + ' Days, ' + counter.h + ' Hours, ' + counter.m + ' Minutes, ' + counter.s + ' Seconds'; 
        
        this.clockEl.innerText = output; 
    }
}