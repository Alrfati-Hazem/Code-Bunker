let tbody = document.querySelector('tbody')

let items = localStorage.getItem('userAnswerArray').split(',')
let pageQuestion = []
if (localStorage.getItem('page') == 1) {
  fetch('../json/htmlQuize.json')
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      pageQuestion = json
      showResult()
    })
} else if (localStorage.getItem('page') == 2) {
  fetch('../json/cssQuize.json')
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      pageQuestion = json
      showResult()
    })
} else {
  fetch('../json/jsQuize.json')
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      pageQuestion = json
      showResult()
    })
}

function showResult() {
  for (let i = 0; i < items.length; i++) {
    tr = document.createElement('tr')
    // Create number of question
    th = document.createElement('th')
    th.setAttribute('scope', 'row')
    th.innerHTML = i + 1
    // Create td of question
    tdQuestion = document.createElement('td')
    tdQuestion.innerHTML = pageQuestion[i].question
    // For User Answer
    tdUserAnswer = document.createElement('td')
    tdUserAnswer.innerHTML = items[i]
    // For Correct Answer
    tdCorrectAnswer = document.createElement('td')
    tdCorrectAnswer.innerHTML = pageQuestion[i].answer
    // Append
    tbody.appendChild(tr)
    tr.appendChild(th)
    tr.appendChild(tdQuestion)
    if (tdUserAnswer.innerHTML == tdCorrectAnswer.innerHTML) {
      tr.appendChild(tdCorrectAnswer)
      tdUserAnswer.style.color = 'green'
      tr.appendChild(tdUserAnswer)
    } else {
      tr.appendChild(tdCorrectAnswer)
      tdUserAnswer.style.color = 'red'
      tr.appendChild(tdUserAnswer)
    }
  }
}

let loginBtn = document.querySelector('.log-btn')

loginBtn.onclick = function () {
  localStorage.setItem('sessionState', null)
}
