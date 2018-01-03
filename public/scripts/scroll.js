// USING https://github.com/jquery/jquery-mousewheel

function is_touch_device() {  
	try {  
		document.createEvent('TouchEvent')
		return true 
	} catch (e) { 
		return false
	}  
}

is_touch_device()

if (is_touch_device())  {
	$(function() {
		$('.user-posts').css('overflow', 'scroll')
	})
} else {
	$(function() {
		$('.user-posts').mousewheel(function(evt, chg) {
			this.scrollLeft -= (chg * 50) //need a value to speed up the change
			evt.preventDefault()
		})
	})
}