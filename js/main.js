var mainNav = document.querySelector('.main-nav');
var mainNavToggle = mainNav.querySelector('.main-nav__toggle');
var mainNavLoginLink = mainNav.querySelector('.main-nav__user-login');
var overlay = document.querySelector('.overlay');

var loginForm = document.querySelector('.login-form');
var loginFormBtn = document.querySelector('.login-form__btn-close');
var loginFormSend = document.querySelector('.login-form__btn-login');

mainNav.classList.remove('main-nav--nojs');

function toggleMainNav() {
	if (mainNav.classList.contains('main-nav--closed')){
		mainNav.classList.remove('main-nav--closed');
		mainNav.classList.add('main-nav--opened');
	} else {
		mainNav.classList.add('main-nav--closed');
		mainNav.classList.remove('main-nav--opened');
	}
}

function toggleLoginForm(e) {
	e.preventDefault();
	if (loginForm.classList.contains('login-form--hidden')) {
		loginForm.classList.remove('login-form--hidden');
	} else {
		loginForm.classList.add('login-form--hidden');
	}
}

function toggleOverlay(e) {
	e.preventDefault();
	if (overlay.classList.contains('overlay--hidden')) {
		overlay.classList.remove('overlay--hidden');
		toggleLoginForm(e);
	} else {
		overlay.classList.add('overlay--hidden');
		toggleLoginForm(e);
	}
}

function validateForms(e) {
	e.preventDefault();
	if (!("FormData" in window)) {
		return;
	}

	var data = new FormData(loginForm);
	var xhr = new XMLHttpRequest();

	xhr.open("post", "/send?");
	xhr.addEventListener("readystatechange", function(){
		if (xhr.readyState == 4) {
			console.log(xhr.responseText);
		}
	});
		xhr.send(data);
};

mainNavToggle.addEventListener('click', toggleMainNav);
mainNavLoginLink.addEventListener('click', toggleOverlay);
loginFormBtn.addEventListener('click', toggleMainNav);
loginFormSend.addEventListener('click', validateForms);
overlay.addEventListener('click', toggleOverlay);