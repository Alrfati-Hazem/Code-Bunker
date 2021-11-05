window.onload = function () {
  if (localStorage.getItem('sessionState') === 'null') {
    alert('At first you have to log in ')
    window.open('../html/signup.html', '_self')
  }
  localStorage.removeItem('quizNumber')
}

document.body.addEventListener('click', function (event) {
  if (!event.target.classList.contains('login-click')) {
    if (localStorage.getItem('sessionState') === 'null') {
      event.preventDefault()
      alert('At first you have to log in ')
      window.open('../html/signup.html', '_self')
    }
  }
})

let fname = document.querySelector('.fname')

let data = window.localStorage.getItem('information')
let tasks = JSON.parse(data)
let logNAME = window.localStorage.getItem('logName')

fname.innerHTML = `${logNAME}!`

/* Check if it log in or not */

let login = document.querySelector('.home-btn-login')
login.onclick = function () {
  localStorage.setItem('sessionState', null)
}

let categoryBtn = document.querySelectorAll('.category-button')

categoryBtn.forEach(function (ele, index) {
  ele.onclick = function () {
    switch (index) {
      case 0:
        localStorage.setItem('quizNumber', 1)
        break
      case 1:
        localStorage.setItem('quizNumber', 2)
        break
      case 2:
        localStorage.setItem('quizNumber', 3)
        break
    }
    window.open('../html/quize.html', '_self')
  }
})
