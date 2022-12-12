const formLogin = document.querySelector('.login');
const formSignUp = document.querySelector('.sign-up');

// tab switching
const label_sign_up = document.querySelector('.label-sign-up');
label_sign_up.addEventListener('click', () => {
   formLogin.classList.toggle('isActive');
   formSignUp.classList.toggle('isActive');
});
const label_login = document.querySelector('.label-login');
label_login.addEventListener('click', () => {
   formLogin.classList.toggle('isActive');
   formSignUp.classList.toggle('isActive');
});

// Event button login, signup
const button_login = document.querySelector('.btn-login');
button_login.addEventListener('click', (e) => {
   e.preventDefault();
});
const button_signup = document.querySelector('.btn-signup');
button_signup.addEventListener('click', (e) => {
   e.preventDefault();
});
