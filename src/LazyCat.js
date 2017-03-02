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
					var style_text = 'background-image:url("'+img.src+'");'+
									 elms[_i].getAttribute('style');

					elms[_i].setAttribute('style',style_text);
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

if (typeof define === 'function' && define.amd) define(LazyCat);
else if (typeof module === 'object' && module.exports) module.exports = LazyCat;
else this.LazyCat = LazyCat;
}).call(this);
