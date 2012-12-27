// 10 hours a day
// 100 minutes an hour
// 100 seconds a minute
// 1 new second = 864 milliseconds

function getTime(d) {
    var partOfDay = (d.getTime() % 86400000) / 86400000;

    var h = Math.floor(partOfDay * 10);

    var m = Math.floor(partOfDay * 1000) % 100;

    var s = Math.floor(partOfDay * 100000) % 100;

    return {
        "hours": h,
        "minutes": m,
        "seconds": s
    };
}

function isLeapYear(d) {
    return new Date(d.getFullYear(), 1, 29).getMonth() == 1;
}

function getDate(d) {
    var monk, day;

    var startOfYear = new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0).getTime();

    var dayOfYear = Math.floor((d - startOfYear) / 86400000);

    var nilLength = 5;

    if(isLeapYear(d)) {
        nilLength = 6;
    }

    if(dayOfYear < nilLength) {
        monk = 0;
    } else {
        monk = 1 + Math.floor((dayOfYear - nilLength) / 10);
    }

    if(dayOfYear < nilLength) {
        day = 1 + dayOfYear;
    } else {
        day = 1 + ((dayOfYear - nilLength) % 10);
    }

    return {
        "day": day,
        "monk": monk
    };
}

var ONES = [
    "",
    "hena",
    "di",
    "tri",
    "tetra",
    "penta",
    "hexa",
    "hepta",
    "octa",
    "nona"
];

function nameNumber(n) {
    if(n === 0) {
        return "nil";
    } else if(n < 10) {
        return ONES[n];
    } else if(n == 10) {
        return "deca";
    } else if(n < 20) {
        return ONES[n % 10] + "deca";
    } else if(n < 30) {
        return "icosa" + ONES[n % 10];
    } else if(n < 40) {
        return "triaconta" + ONES[n % 10];
    }
}

function nameDay(n) {
    n = nameNumber(n);

    return n + "day";
}

function nameMonk(n) {
    n = nameNumber(n);

    if(/[^aeiou]a$/.test(n)) {
        return n.substring(0, n.length - 1) + "ember";
    } else {
        return n + "cember";
    }
}

function zeroPad(n, len) {
    n = "" + n;

    len = len || 2;

    while(n.length < len) {
        n = "0" + n;
    }

    return n;
}

function setTime() {
    var d = new Date();

    var newTime = getTime(d);

    var newDate = getDate(d);

    document.getElementById("time").innerHTML = zeroPad(newTime.hours) + ":" + zeroPad(newTime.minutes) + "." + zeroPad(newTime.seconds);

    document.getElementById("day").innerHTML = nameDay(newDate.day);

    document.getElementById("monk").innerHTML = nameMonk(newDate.monk);
}

window.onload = function() {
    setTime();

    setInterval(setTime, 864);
};
