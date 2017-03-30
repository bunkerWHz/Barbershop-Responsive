var mainNav = document.querySelector('.main-nav');
var mainNavToggle = mainNav.querySelector('.main-nav__toggle');
var mainNavLoginLink = mainNav.querySelector('.main-nav__user-login');

var loginForm = document.querySelector('.login-form');
var loginFormBtn = document.querySelector('.login-form__btn-close');

mainNav.classList.remove('main-nav--nojs');

function toggleMainNav() {
	if (mainNav.classList.contains('main-nav--closed')){
		mainNav.classList.remove('main-nav--closed');
		mainNav.classList.add('main-nav--opened');
	} else {
		mainNav.classList.add('main-nav--closed');
		mainNav.classList.remove('main-nav--opened');
	}
};

function toggleLoginForm(e) {
	e.preventDefault();
	if (loginForm.classList.contains('login-form--hidden')) {
		loginForm.classList.remove('login-form--hidden');
	} else {
		loginForm.classList.add('login-form--hidden');
	}
}

mainNavToggle.addEventListener('click', toggleMainNav);
mainNavLoginLink.addEventListener('click', toggleLoginForm);
loginFormBtn.addEventListener('click', toggleLoginForm);