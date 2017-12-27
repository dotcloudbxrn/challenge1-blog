let truncTitle = function(str) {
  let num = 14;
  if(num < str.length) {
    var returnedStr = ''; 
    var trunc = Math.abs(num - str.length);  
    var result = str.length - trunc;
    if (result <= 3) {
      returnedStr = (str.substring(0, result) + '...');
    } else {
      returnedStr = (str.substring(0, result-3) + '...');
    }
  
    return returnedStr;
  } else {
    return str;
  }
}

let truncBody = function (str) {
  let num = 110;
  if(num < str.length) {
    var returnedStr = ''; 
    var trunc = Math.abs(num - str.length);  
    var result = str.length - trunc;
    if (result <= 3) {
      returnedStr = (str.substring(0, result) + '...');
    } else {
      returnedStr = (str.substring(0, result-3) + '...');
    }
  
    return returnedStr;
  } else {
    return str;
  }
}

module.exports = {
  truncTitle,
  truncBody
}