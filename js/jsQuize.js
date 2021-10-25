//declare array to save info from json
let jsQuestions = [];

//fetch function
fetch("./json/jsQuize.json")
  .then((res) => {
    return res.json();
  })
  .then((loadjsQuestions) => {
    console.log(loadjsQuestions);
    jsQuestions = loadjsQuestions;
  });
console.log(jsQuestions);

//selecting all required elements
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
info_box.classList.add("activeInfo"); //show info box

// if continueQuiz button clicked
continue_btn.onclick = () => {
  //hide info box
  info_box.classList.remove("activeInfo");

  //show quiz box
  quiz_box.classList.add("activeQuiz");

  //calling showQestions function
  showQuetions(0);

  //passing 1 parameter to queCounter
  queCounter(1);

  //calling startTimer function
  startTimer(15);

  //calling startTimerLine function
  startTimerLine(0);
};

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

//select next btn by query selector
const next_btn = document.querySelector("footer .next_btn");

//select question counter
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next btn clicked
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

// getting html questions and options
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  //creating a new span and div tag for question and option
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

  //adding new span tag inside que_tag
  que_text.innerHTML = que_tag;

  //adding new div tag inside option_tag
  option_list.innerHTML = option_tag;

  //selecting option
  const option = option_list.querySelectorAll(".option");

  // make qusetion options clickable - set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

//declare empty array to push user answers to it
let getUserAnswerArr = [];

//if user clicked on option
function optionSelected(answer) {
  //add style to selected option
  answer.style.background = "#bababa";
  console.log(answer);

  //clear counter
  clearInterval(counter);

  //clear counterLine
  clearInterval(counterLine);

  //getting user selected option
  let userAns = answer.textContent;

  //getting correct answer from json file
  let correcAns = jsQuestions[que_count].answer;

  //getting all option items
  const allOptions = option_list.children.length;

  //save user answer in local storage
  localStorage.setItem("userAnswers", JSON.stringify(userAns));

  //get user answer from local storge
  let ansArray = localStorage.getItem("userAnswers")
    ? JSON.parse(localStorage.getItem("userAnswers"))
    : [];
  console.log(ansArray);

  //push user answer to the empty array
  getUserAnswerArr.push(ansArray);

  //save total user answers array
  if (getUserAnswerArr.length == 7) {
    localStorage.setItem("userAnswerArray", getUserAnswerArr);
  }
  console.log(getUserAnswerArr);

  //if user selected option is equal to json correct answer
  if (userAns == correcAns) {
    //increase score value with 1
    userScore += 1;

    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  }

  for (i = 0; i < allOptions; i++) {
    //once user select an option then disabled all options
    option_list.children[i].classList.add("disabled");
  }
  //show the next button if user selected any option
  next_btn.classList.add("show");
}

function showResult() {
  //hide info box
  info_box.classList.remove("activeInfo");

  //hide quiz box
  quiz_box.classList.remove("activeQuiz");

  //show result box
  result_box.classList.add("activeResult");

  //select score text
  const scoreText = result_box.querySelector(".score_text");

  //select image result div
  let imgResult = document.getElementById("img-result");

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

    //change to green theme if user pass the exam
    document.querySelector(".activeResult").style.background = "#13c813";
    document.querySelector(".complete_text").style.color = "white";
    document.querySelector(".score_text").style.color = "white";

    //add image to the result box
    imgResult.src = "./imgs/like.gif";
  } else {
    // if user scored less than 4
    let scoreTag =
      "<span>and sorry , You got only <p>" +
      userScore +
      "</p> out of <p>" +
      jsQuestions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;

    //add red theme to result box
    document.querySelector(".activeResult").style.background = "red";
    document.querySelector(".complete_text").style.color = "white";
    document.querySelector(".score_text").style.color = "white";

    //add image to the result box
    imgResult.src = "./imgs/broken-heart.gif";
  }
}

//timer function
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
    //increase time value with 1
    time += 1;

    //increasing width of time_line with px by time value
    time_line.style.width = time + "px";

    //if time value is greater than 549
    if (time > 549) {
      //clear counterLine
      clearInterval(counterLine);
    }
  }
}

//creating a new span tag and passing the question number and total question
function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    jsQuestions.length +
    "</p> Questions</span>";

  //adding new span tag inside bottom_ques_counter
  bottom_ques_counter.innerHTML = totalQueCounTag;
}

//linkshow answer page
let showAnswers = document.getElementById("showAnswers");
showAnswers.onclick = function () {
  window.open("./jsAnswers.html", "_self");
};
