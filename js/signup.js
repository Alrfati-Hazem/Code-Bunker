const switchers = [...document.querySelectorAll(".switcher")];

switchers.forEach((item) => {
  item.addEventListener("click", function () {
    switchers.forEach((item) =>
      item.parentElement.classList.remove("is-active")
    );
    this.parentElement.classList.add("is-active");
  });
});
//////////get elemant/////////////////////////////////
let firstName = document.querySelector("#first-name");
let secondName = document.querySelector("#second-name");
let signUpEmail = document.querySelector("#signup-email");
let signUpPassword = document.querySelector("#signup-password");
let FirstREQ = document.querySelector("#FirstREQ");
let secondREQ = document.querySelector("#secondREQ");
let emailREQ = document.querySelector("#emailREQ");
let passwordREQ = document.querySelector("#passwordREQ");
let buttonSignUP = document.querySelector(".btn-login");
let regexEmail = /^[A-z0-9._-]+@(gmail|yahoo).com$/;
let regexPass = /^[A-z0-9]{6,18}$/;
let errMsg = document.querySelector(".errMsg");
let arrayOfInformation = [];
let logInState;
let signUpState;
if (localStorage.getItem("information")) {
  arrayOfInformation = JSON.parse(localStorage.getItem("information"));
}
// localStorage.clear();
//signup click/////////////////////
buttonSignUP.addEventListener("click", function (e) {
  e.preventDefault();
  if (firstName.value === "") {
    FirstREQ.innerHTML = `/Please enter your name/`;
  } else if (firstName.value.length < 3) {
    FirstREQ.innerHTML = `/Your name must has 3 Ch/`;
  } else {
    FirstREQ.innerHTML = ``;
  }
  if (secondName.value === "") {
    secondREQ.innerHTML = `/Please enter your name/`;
  } else if (secondName.value.length < 3) {
    secondREQ.innerHTML = `/Your name must has 3 Ch/`;
  } else {
    secondREQ.innerHTML = ``;
  }
  if (signUpEmail.value === "") {
    emailREQ.innerHTML = `/The email field is required/`;
  } else {
    if (regexEmail.test(signUpEmail.value)) {
      emailREQ.innerText = "";
    } else {
      emailREQ.innerText = "/The email should be like Eg/ ";
    }
  }
  if (signUpPassword.value === "") {
    passwordREQ.innerHTML = `/The password field is required/`;
  } else {
    if (regexPass.test(signUpPassword.value)) {
      passwordREQ.innerHTML = "";
    } else {
      passwordREQ.innerText = `/The password must have 6-18 character/`;
    }
  }

  if (
    signUpEmail.value.match(regexEmail) &&
    signUpPassword.value.match(regexPass) &&
    firstName.value.length >= 3 &&
    secondName.value.length >= 3
  ) {
    addInformationToArray(
      firstName.value,
      secondName.value,
      signUpEmail.value,
      signUpPassword.value
    );

    localStorage.setItem("logName", firstName.value);
    console.log(localStorage.getItem("information"));
    window.open("./category.html", "_self");
  }
});
///////////addInformationToArray
function addInformationToArray(
  firstName,
  secondName,
  signUpEmail,
  signUpPassword
) {
  // Task Data
  const information = {
    FirstName: firstName,
    secondName: secondName,
    email: signUpEmail,
    password: signUpPassword,
  };
  // Push Task To Array Of Tasks
  arrayOfInformation.push(information);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfInformation);
}
function addDataToLocalStorageFrom(arrayOfInformation) {
  window.localStorage.setItem(
    "information",
    JSON.stringify(arrayOfInformation)
  );
}
getDataFromLocalStorage();
let state;
let login = document.querySelector(".btn-signup");
let loginEmail = document.getElementById("login-email");
let loginPassword = document.getElementById("login-password");

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("information");

  let tasks = JSON.parse(data);
  console.log(tasks);
}
// login click///////////////
login.onclick = function (e) {
  e.preventDefault();
  let data = window.localStorage.getItem("information");
  let tasks = JSON.parse(data);
  console.log(tasks);
  localStorage.setItem("inEmail", loginEmail.value);
  let EmailLogIn = localStorage.getItem("inEmail");
  localStorage.setItem("inPassword", loginPassword.value);
  let PasswordLogIn = localStorage.getItem("inPassword");
  if (tasks === null) {
    errMsg.innerHTML = "please create an account";
  } else {
   tasks.forEach((element) => {
      state = false;
      if (EmailLogIn === "" && PasswordLogIn === "") {
        errMsg.innerText = "Please enter your Email and password ";
      } else if (
        EmailLogIn === element.email &&
        PasswordLogIn === element.password
      ) {
        state = true;
        localStorage.setItem("logName", element.FirstName);
      } else {
        e.preventDefault();
        errMsg.innerText = "Email or password is wrong";
      }

      if (state == true) {
        emailStat = false;
        state = false;
        window.open("./category.html", "_self");
        errMsg.innerHTML = "";
      }
    });
  }
};
