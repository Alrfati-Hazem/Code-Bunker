let submit = document.querySelector (".sub-button");
let firstName = document.querySelector("#fname");
let nameReq = document.querySelector(".nameReq");
console.log (nameReq);
console.log (firstName);



let lastName = document.querySelector("#lname");
let lnameReq = document.querySelector(".lnameReq");


let Email = document.querySelector("#email");
let regexEmail = /^[A-z0-9]+@(gmail|yahoo).com$/;
let emailReq = document.querySelector(".emailReq");


let Comment = document.querySelector("#comment");
let commentReq = document.querySelector(".commentReq");





submit.addEventListener("click", function (e) {
    e.preventDefault();
    if (firstName.value === "" ){
     nameReq.innerHTML = `*Please enter your first name`;
    } else  {
        nameReq.innerHTML = ``;
    }
    if (lastName.value === ""){
        lnameReq.innerHTML = `*Please enter your second name`;
    } else {
        lnameReq.innerHTML = ``;

    }
    if (Email.value === ""){
    emailReq.innerHTML = "*Please enter your Email";
        
    }
    
    else if (regexEmail.test (Email.value)) {
    emailReq.innerHTML = "";
    }
    else {
        emailReq.innerHTML = `*Please enter a valid Email.`
    }
    if (Comment.value === "") {
        commentReq.innerHTML = `*this field cant be empty`
    } else {
        commentReq.innerHTML = ``;

    }
    if (
        Email.value.match(regexEmail) &&
        lastName.value != "" && firstName.value != "" &&
        Comment.value != ""
    ) {
        
        
            alert("your message sent successfully");
            window.open ("/home.html");
          
    }
        


    







    
    
   
});
