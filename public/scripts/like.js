$(function () {
	$('.like').on('click', function(e) {
		let parameters = {
			commentId: e.target.id
		}
		//create deferred
		var userId = $.getJSON('/check/user')
			.pipe(
			//success case
				function(response) {
					return response
				},
				//fail case
				function(response) {
					return $.Deferred().reject(response)
				}
			)
		
		userId
			.done(function(userData) {
				parameters.userId = userData.userId
				var addLike = $.post('/comment/like', parameters)
					.pipe(
						//success case
						function(response) {
							return response
						}, 
						//fail case
						function(response) {
							return $.Deferred().reject(response)
						}
					)
				
				addLike
					.done(function(commentData) {
						let count = e.target.parentNode.parentNode.firstElementChild.lastElementChild.lastChild
						$(count).html(commentData.res)
						return $.Deferred().resolve(commentData)
					})
			})})

	$('.dislike').on('click', function(e) {
		let parameters = {
			commentId: e.target.id
		}
		//create deferred
		var userId = $.getJSON('/check/user')
			.pipe(
				//success case
				function(response) {
					return response
				},
				//fail case
				function() {
					return $.Deferred().reject()
				}
			)
				
		userId
			.done(function(userData) {
				parameters.userId = userData.userId
				var removeLike = $.post('/comment/dislike', parameters)
					.pipe(
						//success case
						function(response) {
							return response
						}, 
						//fail case
						function() {
							return $.Deferred().reject()
						}
					)
		
						
				removeLike
					.done(function(commentData) {
						let count = e.target.parentNode.parentNode.firstElementChild.lastElementChild.lastChild
						$(count).html(commentData.res)
						return $.Deferred().resolve(commentData)
					})
			})})
})
