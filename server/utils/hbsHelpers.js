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

let possessive = function (username) {
  return username.charAt(username.length - 1) === 's' ? `${username}'` : `${username}'s`
}

let isSameUser = function (userId, profileId, options) {
  // block helper solution borrowed from this place. thank god for stack overflow
  //https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
  
  if (userId && profileId) {
    let firstId = userId.toString()
    let secondId = profileId.toString()
    if (firstId === secondId) {
      return options.fn(this)
    } 
    return options.inverse(this)
  }
}


module.exports = {
  truncTitle,
  truncBody,
  possessive,
  isSameUser
}