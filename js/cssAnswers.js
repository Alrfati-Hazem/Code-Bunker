let tbody = document.querySelector('tbody')

let items = localStorage.getItem('userAnswerArray').split(',')

for (let i = 0; i < items.length; i++) {
  fetch('./json/cssQuize.json')
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      tr = document.createElement('tr')
      // Create number of question
      th = document.createElement('th')
      th.setAttribute('scope', 'row')
      th.innerHTML = i + 1
      // Create td of question
      tdQuestion = document.createElement('td')
      tdQuestion.innerHTML = json[i].question
      // For User Answer
      tdUserAnswer = document.createElement('td')
      tdUserAnswer.innerHTML = items[i]
      // For Correct Answer
      tdCorrectAnswer = document.createElement('td')
      tdCorrectAnswer.innerHTML = json[i].answer
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
    })
}
