class Clock {
    constructor(timezone) {
        this.tzone = timezone; 
        this.futureMoment = moment.tz(futureDateTime, momentFormat, this.tzone);  
        this.timer = setInterval(this.updateClock.bind(this), 1000); 
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

        var output = 'Years:' + counter.y + ' Days:' + counter.d + ' Hours:' + counter.h + ' Minutes:' + counter.m + ' Seconds:' + counter.s; 
        console.log(output);
    }
}