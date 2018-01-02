function findAllOf (arr, uniqueProp) {
	// returns array of objects, from the same type of source
	// filtered by a property you give it
	// let arr = findAllOf(articleComments, 'authorId')
	// results in [ { _id: '5a4aaae8d2cb8a460d529f7a' }, ... ]
	prop = uniqueProp.toString()
	let obj = {}
	let nested = []

	for (let i = 0, j=arr.length; i < j; i++) {
		if(obj[arr[i][prop]] == undefined) {
			nested.push(arr[i])
			obj[arr[i][prop]] = 'init'
		}
	}

	let final = []
	for(let i = 0, j = nested.length; i < j; i++) {
		let obj = {}
		obj._id = nested[i][prop]
		final.push(obj)
	}
	return final
}

module.exports = findAllOf