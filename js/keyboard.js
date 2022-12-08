function keyboard(keyCode) {
    return bbzGameKeys[keyCode];
  }
  
  function keyboardOnce(keyCode) {
    if(bbzGameKeys[keyCode]) {
      bbzGameKeys[keyCode] = false;
      return true;
    } else {
      return false;
    }
  }
  
  var bbzGameKeys = {};
  
  function bbzGameKeydown(e) {
    bbzGameKeys[e.keyCode] = true;
  }
  
  function bbzGameKeyup(e) {
    bbzGameKeys[e.keyCode] = false;
  }
  
  document.addEventListener('keydown', bbzGameKeydown);
  document.addEventListener('keyup', bbzGameKeyup);