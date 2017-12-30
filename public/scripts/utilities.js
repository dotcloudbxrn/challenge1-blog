console.log('yoo')

function fieldValid (lmnt) {
  switch (lmnt.name) {
    
    case 'username':
      message="We all need a cool nickname"
      break;
  
    case 'password':
      message="Should be something you remember"
      break;
  
    case 'confirm':
      message="Trust me, it's for the better"
      break;
  
    case 'firstName':
      message="What is yours but everyone else uses"
      break;

    case 'lastName':
      message="A proud representative of the family [let us know here]"
      break;
      
    default:
      message="Some random funny text."
      break;
  }
  // if(lmnt.validity)
  if(lmnt.value.length === 0) {
    lmnt.setCustomValidity(message)
  } else {
    lmnt.setCustomValidity('')
  }
}

window.onload = function() {
  var commentButton = document.getElementById("comment-button")
  if (commentButton) {
    commentButton.addEventListener("click", function(event) {
      let comment = document.getElementById("commentBody")
      if(comment.value.trim().length === 0) {
        comment.setCustomValidity('Add a comment first before posting it')
      } else {
        comment.setCustomValidity('')        
      }
    })
    // commentButton.addEventListener("touchend")
  }
}

