# LazyCat v0.4.1

### A simple lazy loader for images and videos

To see pages using LazyCat in production, please refer to [this list](#live-links).

<br>

## Download

- [minified](https://raw.githubusercontent.com/cy-park/LazyCat/master/dist/LazyCat.min.js)
- [unminified](https://raw.githubusercontent.com/cy-park/LazyCat/master/src/LazyCat.js)

<br>

## Installation

#### Option 1: HTML

```html
<script src="LazyCat.min.js"></script>
```

#### Option 2: Node.js & npm

In terminal, execute:

```shell
$ npm i lazycat --save
```

and import in JS:

```js
var LazyCat = require('lazycat'); // CommonJS
```

or alternatively:

```js
import LazyCat from 'lazycat'; // ES6
```

<br>

## Quick Start

After downloading LazyCat.js, use below code to quick-start:

**Image loading on `<img>` tag:**

```html
<!DOCTYPE html>
<html>
  <body>
    <img class="lazycat-target" data-lazycat-image="sample.png" />
    <script src="LazyCat.js"></script>
    <script>
      LazyCat.image('.lazycat-target', function(){
        console.log('callback loaded');
      });
    </script>
  </body>
</html>
```

**Image loading on `<div>` tag:**

```html
<!DOCTYPE html>
<html>
  <body>
    <div class="lazycat-target" data-lazycat-image="sample.png" style="width:80%;height:80vh"></div>
    <script src="LazyCat.js"></script>
    <script>
      LazyCat.image('.lazycat-target', function(){
        console.log('callback loaded');
      });
    </script>
  </body>
</html>
```

**Video loading with time out:**

```html
<!DOCTYPE html>
<html>
  <body>
    <video class="lazycat-target" src="sample.mp4" preload="none" autoplay loop></video>
    <script src="LazyCat.js"></script>
    <script>
      LazyCat.video('.lazycat-target', function(){
        console.log('callback loaded');
      }, 20000); // `callback` being executed after 20 seconds.
    </script>
  </body>
</html>
```

**Video loading using `blob`:**

```html
<!DOCTYPE html>
<html>
  <body>
    <video class="lazycat-target" data-lazycat-video="sample.mp4" autoplay loop></video>
    <script src="LazyCat.js"></script>
    <script>
      LazyCat.videoBlob('.lazycat-target', function(){
        console.log('callback loaded');
      }, function(){
        console.log('error occurred');
      });
    </script>
  </body>
</html>
```

<br>

## APIs

### LazyCat.image()

Load image. It can load `src`s on an `<img>` tag or `background-image` on any DOM element.

**Syntax:**

<pre>
<b>LazyCat.image( selector [, callback, callbackError] )</b>
</pre>

**Arguments:**

- `selector` *{string}* Target DOM element for lazy load. The DOM element must have an attribute `data-lazycat-image="[source URL]"`. 

- `callback` *{function}* (optional) Callback function calling after loading is successfully completed.

- `callbackError` *{function}* (optional) Callback function calling after loading failed.

<br>

### LazyCat.video()

Load video. No error callback is available, but loading time out is applicable.

**Syntax:**

<pre>
<b>LazyCat.video( selector [, callback, timeout] )</b>
</pre>

**Arguments:**

- `selector` *{string}* Target DOM element for lazy load. The DOM element must have an attribute `src="[source URL]"` and `preload="none"`.

- `callback` *{function}* (optional) Callback function calling after loading is successfully completed. Successful loading here means the video’s `readyState` becoming `3` or bigger.

- `timeout` *{integer}* (optional) Time out for callback execution in millisecond. If `timeout` is set, `callback` will be executed regardless of the target video's status. If the value is `0` or not provided it will wait forever until the video’s `readyState` becomes `3` or bigger. Default value is `0`.

<br>

### LazyCat.videoBlob()

(Experimental) Load video using `blob`. It will always try to load full length of the video and execute either `callback` (when suceeded), or `callbackError` (when failed).

**Syntax:**

<pre>
<b> LazyCat.videoBlob( selector [, callback, callbackError] )</b>
</pre>

**Arguments:**

- `selector` *{string}* Target DOM element for lazy load. The DOM element must have an attribute `data-lazycat-video="[source URL]"`.

- `callback` *{function}* (optional) Callback function calling after loading is successfully completed. Successful loading here means successful loading of the entire portion.

- `callbackError` *{function}* (optional) Callback function calling after loading failed.

<br>

## Live Links

- [North: An Illustrated Travelogue by Christoph Niemann](http://www.nationalgeographic.com/travel/destinations/europe/norway/christoph-niemann-artist-trip-svalbard-norway/)

<br>

## Browser Support

LazyCat supports all major modern browsers including IE 10+.

<br>

## License

MIT
