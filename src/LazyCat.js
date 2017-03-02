// Supports modern browsers & IE10+

;(function(){

'use strict';

var LazyCat = function(args){};

if (typeof define === 'function' && define.amd) define(LazyCat);
else if (typeof module === 'object' && module.exports) module.exports = LazyCat;
else this.LazyCat = LazyCat;
}).call(this);
