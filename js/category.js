let fname = document.querySelector(".fname");

let data = window.localStorage.getItem("information");
let tasks = JSON.parse(data);
let logNAME = window.localStorage.getItem("logName");
console.log(tasks);

fname.innerHTML = `${logNAME}!`;
