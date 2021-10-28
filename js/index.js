let loginBtn = document.querySelector('.login-link')
let getStartBtn = document.querySelector('.getStart-link')
window.onload = function () {
  if (localStorage.getItem('sessionState') === 'true') {
    loginBtn.innerHTML = 'Log out'
    loginBtn.href = './index.html'
    getStartBtn.href = './html/category.html'
  }
}

loginBtn.onclick = function () {
  localStorage.setItem('sessionState', null)
}
