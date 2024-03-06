 var then = new Date(2017, 09, 23), // month is zero based
     now  = new Date;               // no arguments -> current date

 // 24 hours, 60 minutes, 60 seconds, 1000 milliseconds
let jour = Math.round((now - then) / (1000 * 60 * 60 * 24)); // round the amount of days
 // result: 712
 let sec = Math.round(now - then) / 1000; // round the amount of days

 
document.getElementById("love").innerHTML = jour;
document.getElementById("love2").innerHTML = sec;