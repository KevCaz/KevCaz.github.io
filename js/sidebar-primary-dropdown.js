// https://www.w3schools.com/howto/howto_js_dropdown.asp
// https://stackoverflow.com/questions/11212470/double-click-to-show-an-div
function dropDown(id) {
    var el = document.getElementById(id);
    el.style.display = (el.style.display == 'none' || el.style.display == '') ? 'block' : 'none';
  }
