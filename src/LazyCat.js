// Supports modern browsers & IE10+

;(function(){

'use strict';

var LazyCat = {};

LazyCat.Image = function(selector, callback, callbackArgs, callbackError, callbackArgsError){

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
					callback.apply(elms[_i], callbackArgs);
			};

			img.onerror = function(){
				if (callbackError)
					callbackError.apply(elms[_i], callbackArgsError);
			};
		}(i));
	}
};

LazyCat.VideoX = function(selector, callback, callbackArgs){
	var el = document.querySelector(selector);
	var url = el.getAttribute('data-lazycat-video');
	el.src = url;
	el.load();

	var callback_run = false;
	el.addEventListener('canplay', function(){
		if (!callback_run) {
			callback_run = true;
			callback.apply(el, callbackArgs);
		}
	});
	if (el.readyState > 3) {
		if (!callback_run) {
			callback_run = true;
			callback.apply(el, callbackArgs);
		}
	}
};

LazyCat.Video = function(selector, callback, callbackArgs){

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
		callback.apply(el, callbackArgs);
	};
};

if (typeof define === 'function' && define.amd) define(LazyCat);
else if (typeof module === 'object' && module.exports) module.exports = LazyCat;
else this.LazyCat = LazyCat;
}).call(this);
