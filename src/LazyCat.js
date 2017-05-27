/*! Lazycat.js v0.3.1 | (c) 2017 Chan Young Park | MIT License */

;(function(){

'use strict';

var LazyCat = {};

LazyCat.image = function(selector, callback, callbackError){

	var elms = document.querySelectorAll(selector);

	for (var i = 0; i < elms.length; i++) {
		(function(_i){
			var img = new Image();

			img.src = elms[_i].getAttribute('data-lazycat-image');

			img.onload = function(){

				if (elms[_i].tagName.toLowerCase() === 'img') {
					elms[_i].setAttribute('src',img.src);
				} else {
					elms[_i].style.backgroundImage = 'url("'+img.src+'")';
				}

				if (callback)
					callback.call(elms[_i]);
			};

			img.onerror = function(){
				if (callbackError)
					callbackError.call(elms[_i]);
			};
		}(i));
	}
};

LazyCat.video = function(selector, callback, timeout){
	var el = document.querySelector(selector);
	var url = el.getAttribute('data-lazycat-video');
	el.src = url;
	el.removeAttribute('data-lazycat-video');
	el.load();

	var runCallback = function(){
		el.setAttribute('data-lazycat-loaded','');
		if (callback)
			callback.call(el);
	};

	el.addEventListener('canplay', function(){
		// `canplay` event is fired when radyState is 3 (HAVE_FUTURE_DATA) or bigger.
		if (!el.hasAttribute('data-lazycat-loaded')) {
			runCallback()
		}
	});

	if (!el.hasAttribute('data-lazycat-loaded')) {
		if (el.readyState > 2) {
			runCallback();
		} else {
			if (timeout) {
				setTimeout(function(){
					if (!el.hasAttribute('data-lazycat-loaded'))
						runCallback();
				}, timeout);
			}
		}
	}
};

LazyCat.videoBlob = function(selector, callback, callbackError){

	var el = document.querySelector(selector);
	var url = el.getAttribute('data-lazycat-video');

	var r = new XMLHttpRequest();

	if (el.canPlayType('video/mp4;codecs="avc1.42E01E, mp4a.40.2"')) {
		r.open('GET', url);
	}

	r.responseType = 'blob';
	r.send();

	r.onload = function() {
		el.src = URL.createObjectURL(r.response);
		if (callback)
			callback.call(el);
	};

	r.onerror = function(){
		if (callbackError)
			callbackError.call(el);
	};
};

if (typeof define === 'function' && define.amd) define(LazyCat);
else if (typeof module === 'object' && module.exports) module.exports = LazyCat;
else this.LazyCat = LazyCat;
}).call(this);
