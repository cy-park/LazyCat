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

LazyCat.Video = function(selector, callback, callbackArgs){
	var el = document.querySelector(selector);
	var url = el.getAttribute('data-lazycat-video');
	el.src = url;
	el.removeAttribute('data-lazycat-video');
	setTimeout(function(){el.load();},0);

	el.addEventListener('canplay', function(){
		if (!el.hasAttribute('data-lazycat-init')) {
			el.setAttribute('data-lazycat-init','');
			if (callback)
				callback.apply(el, callbackArgs);
		}
	});
	if (!el.hasAttribute('data-lazycat-init')) {
		if (el.readyState >= 2) {
			el.setAttribute('data-lazycat-init','');
			if (callback)
				callback.apply(el, callbackArgs);
		}
	}
};

LazyCat.VideoBlob = function(selector, callback, callbackArgs){

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
			callback.apply(el, callbackArgs);
	};
};

if (typeof define === 'function' && define.amd) define(LazyCat);
else if (typeof module === 'object' && module.exports) module.exports = LazyCat;
else this.LazyCat = LazyCat;
}).call(this);
