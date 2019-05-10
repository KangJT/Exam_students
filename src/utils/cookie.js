export default function getCookie(cookieName) {
    var cookieStr = unescape(document.cookie);
    if (cookieStr) {
      var arr = cookieStr.split("; ");
      var cookieValue = "";
      for (var i = 0; i < arr.length; i++) {
        var temp = arr[i].split("=");
        if (temp[0] === cookieName) {
          cookieValue = temp[1];
          break;
        }
      }
    }
    return cookieValue;
  }