let loginBtn = document.querySelector('.loginBtn')

if (localStorage.getItem('sessionState') === 'true') {
  loginBtn.innerHTML = 'Log out'
  loginBtn.href = '../index.html'
}

loginBtn.onclick = function () {
  localStorage.setItem('sessionState', null)
}

let submit = document.querySelector('.sub-button')
let firstName = document.querySelector('#fname')
let nameReq = document.querySelector('.nameReq')

let lastName = document.querySelector('#lname')
let lnameReq = document.querySelector('.lnameReq')

let Email = document.querySelector('#email')
let regexEmail = /^[A-z0-9]+@(gmail|yahoo).com$/
let emailReq = document.querySelector('.emailReq')

let comment = document.querySelector('#comment')
let commentReq = document.querySelector('.commentReq')

submit.addEventListener('click', function (e) {
  e.preventDefault()
  if (firstName.value === '') {
    nameReq.innerHTML = `*Please enter your first name`
  } else {
    nameReq.innerHTML = ``
  }
  if (lastName.value === '') {
    lnameReq.innerHTML = `*Please enter your second name`
  } else {
    lnameReq.innerHTML = ``
  }
  if (Email.value === '') {
    emailReq.innerHTML = '*Please enter your Email'
  } else if (regexEmail.test(Email.value)) {
    emailReq.innerHTML = ''
  } else {
    emailReq.innerHTML = `*Please enter a valid Email.`
  }
  if (comment.value === '') {
    commentReq.innerHTML = `*this field cant be empty`
  } else {
    commentReq.innerHTML = ``
  }
  if (
    Email.value.match(regexEmail) &&
    lastName.value != '' &&
    firstName.value != '' &&
    comment.value != ''
  ) {
    alert('your message sent successfully')
    window.open('../index.html')
  }
})
