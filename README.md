# JSWR
JavaScript Weirdifier

## What is JSWR?
JSWR is
- a little program to show how weird JS is
- an obfuscation tool that generates perfectly valid and unreadable code from numbers or strings

__Check out the examples__ at `examples.md`

## How it works?
You need `jswr.js` (or `meta.js` if you want the gigantic obfuscated version - you probably don't, it's really really bigger)  
The syntax is easy:
```js
something_to_weirdify.toWeird()
```
For now it supports
- `undefined` (global variable `weirdUndefined`)
- `Boolean`
- `NaN` (global variable `weirdNaN`)
- `Number` (only whole numbers, `Infinity` and `-Infinity`)
- `String`

## TODO
- add support for `Array` and `Object`
- add more characters to the `weirdChars` list that can be reproduced without having to manipulate character codes
- make the custom symbol for `getCharCodeAt` and `String.fromCharCode` feature really work (now it only works for single chars)

## What is meta edition?
As you might have guessed from it's name... a bit meta!  
It's JSWR's code obfuscated with JSWR passed into an `eval`.

__/!\\ WARNING__  
The meta edition is just a gigantic example of what JSWR can do.  
Don't try to read or contribute to the meta edition.  
It's generated from the normal (developer) edition's code using the normal (developer) edition.  
It's not tested and is not guaranteed to work.

## Is the normal (developer) edition available too?
Yes, it is!  
And it's very readable.
