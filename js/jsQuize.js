//declare array to save json info
let jsQuestions = [];

//fetch info from json file
fetch("../json/jsQuize.json")
  .then((res) => {
    return res.json();
  })
  .then((loadjsQuestions) => {
    jsQuestions = loadjsQuestions;
  });

//calling required elements by query selector
// const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

//show info div
info_box.classList.add("activeInfo");

// if continueQuiz button clicked
continue_btn.onclick = () => {

  //hide info box
  info_box.classList.remove("activeInfo"); 

  //show quiz box
  quiz_box.classList.add("activeQuiz"); 

  showQuetions(0); //calling showQestions function
  queCounter(1); //passing 1 parameter to queCounter
  startTimer(15); //calling startTimer function
  startTimerLine(0); //calling startTimerLine function
};


let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


//declare next button
const next_btn = document.querySelector("footer .next_btn");

//declare question couter variable
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next  button clicked
next_btn.onclick = () => {
  //if question count is less than total question length
  if (que_count < jsQuestions.length - 1) {
    //increment the que_count value
    que_count++;

    //increment the que_numb value
    que_numb++;

    //calling showQestions function
    showQuetions(que_count);

    //passing que_numb value to queCounter
    queCounter(que_numb);

    //clear counter
    clearInterval(counter);

    //clear counterLine
    clearInterval(counterLine);

    //calling startTimer function
    startTimer(timeValue);

    //calling startTimerLine function
    startTimerLine(widthValue);

    //change the timeText to Time Left
    timeText.textContent = "Time Left";

    //hide the next button
    next_btn.classList.remove("show");
  } else {
    //clear counter
    clearInterval(counter);

    //clear counterLine
    clearInterval(counterLine);

    //calling showResult function
    showResult();
  }
};

// getting  Questions info
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  //creating a new span and div tag for question and option and passing their values
  let que_tag =
    "<span>" +
    jsQuestions[index].numb +
    ". " +
    jsQuestions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    jsQuestions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    jsQuestions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    jsQuestions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    jsQuestions[index].options[3] +
    "</span></div>";

  //write question in que_text
  que_text.innerHTML = que_tag;

  //write question options in option_tag
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

//declare array to push values from local storage to it
let arr1 = [];

//if user clicked on option
function optionSelected(answer) {
  //give different backgroud color to selected option
  answer.style.background = "#bababa";

  //clear counter
  clearInterval(counter);
  //clear counterLine
  clearInterval(counterLine);

  //getting user selected option
  let userAns = answer.textContent;

  //getting correct answer
  let correcAns = jsQuestions[que_count].answer;

  //getting all option items
  const allOptions = option_list.children.length;

  //save user answers in local storage
  localStorage.setItem("userAnswers", JSON.stringify(userAns));
  let ansArray = localStorage.getItem("userAnswers")
    ? JSON.parse(localStorage.getItem("userAnswers"))
    : [];
  console.log(ansArray);
  //push to arr
  arr1.push(ansArray);

  //save all answer in the local storage
  if (arr1.length ==  7) {
    localStorage.setItem("userAnswerArray", arr1);
  }

  //if user selected option is match correct answer
  if (userAns == correcAns) {
    //increase score value
    userScore += 1;
  }
  //disabled all options once user select one
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  //show the next button
  next_btn.classList.add("show");
}


function showResult() {
  //hide info box
  info_box.classList.remove("activeInfo");

  //hide quiz box
  quiz_box.classList.remove("activeQuiz");

  //show result box
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score_text");

  // if user scored more than 3
  if (userScore > 3) {
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span>and congrats! , You got <p>" +
      userScore +
      "</p> out of <p>" +
      jsQuestions.length +
      "</p></span>";

    //adding new span tag inside score_Text
    scoreText.innerHTML = scoreTag;

    //add style - green theme
    document.querySelector(".activeResult").style.background = "#13c813";
    document.querySelector(".complete_text").style.color = "white";
    document.querySelector(".score_text").style.color = "white";
  } else {
    let scoreTag =
      "<span>and sorry , You got only <p>" +
      userScore +
      "</p> out of <p>" +
      jsQuestions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;

    //add style - red theme
    document.querySelector(".activeResult").style.background = "red";
    document.querySelector(".complete_text").style.color = "white";
    document.querySelector(".score_text").style.color = "white";
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    //changing the value of timeCount with time value
    timeCount.textContent = time;

    //decrement the time value
    time--;

    //if timer is less than 9
    if (time < 9) {
      let addZero = timeCount.textContent;
      //add a 0 before time value
      timeCount.textContent = "0" + addZero;
    }

    //if timer is less than 0
    if (time < 0) {
      //clear counter
      clearInterval(counter);

      //change the time text to time off
      timeText.textContent = "Time Off";

      //getting all option items
      const allOptions = option_list.children.length;

      //to disabled all options when user select one
      for (i = 0; i < allOptions; i++) {
        //once user select an option then disabled all options
        option_list.children[i].classList.add("disabled");
      }

      //show the next button if user selected any option
      next_btn.classList.add("show");
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    //increase time value
    time += 1;

    //increasing width of time_line with px by time value
    time_line.style.width = time + "px";

    //stop counter -if time value is greater than 549
    if (time > 549) {
      //clear counterLine
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    jsQuestions.length +
    "</p> jsQuestions</span>";

  //adding new span tag inside bottom_ques_counter
  bottom_ques_counter.innerHTML = totalQueCounTag;
}

//link show answer page
let showAnswers = document.getElementById('showAnswers')
showAnswers.onclick = function () {
  window.open('../jsAnswers.html', '_self')
}
