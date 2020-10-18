// ==UserScript==
// @name        Arrow Key Movement Mope
// @namespace   Enjoy
// @version     1.0.0
// @description Mope.io Arrow Keys Movement
// @author      Toilet Paper
// @include     https://mope.io/
// @include     https://beta.mope.io/*
// @require     none
// @run-at      document-start
// @grant       none
// ==/UserScript==

function checkKey(e) {
    var event = window.event ? window.event : e;
    console.log(event.keyCode)
    document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }
    node.addEventListener('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        switch (event.key) {
    case "ArrowLeft":
        // Left pressed
        break;
    case "ArrowRight":
        // Right pressed
        break;
    case "ArrowUp":
        // Up pressed
        break;
    case "ArrowDown":
        // Down pressed
        break;
        }
                document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            alert('left');
            break;
        case 38:
            alert('up');
            break;
        case 39:
            alert('right');
            break;
        case 40:
            alert('down');
            break;

    }
            function checkKey(e) {
    e = e || window.event;
    alert(e.keyCode);
}

document.onkeydown = checkKey;
                    document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            // up arrow
            break;
        case 'ArrowDown':
            // down arrow
            break;
        case 'ArrowLeft':
            // left arrow
            break;
        case 'ArrowRight':
            // right arrow
            document.addEventListener("keydown", function(event) {
  event.preventDefault();
  const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
  switch (key) { // change to event.key to key to use the above variable
    case "ArrowLeft":
      // Left pressed
       rawMouseY -= 5
      break;
    case "ArrowRight":
      // Right pressed
      rawMouseY += 5
      break;
    case "ArrowUp":
      // Up pressed
      rawMouseX += 5
      break;
    case "ArrowDown":
      // Down pressed
      rawMouseX -= 5
      break;
      
          function checkArrowKeys(e){
    var arrs= ['left', 'up', 'right', 'down'],
    key= window.event? event.keyCode: e.keyCode;
    if(key && key>36 && key<41) alert(arrs[key-37]);
}}
document.onkeydown= checkArrowKeys;

            })
        }};
    }
    })}}
