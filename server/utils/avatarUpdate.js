let avaUp = function (array, param, id) {
	let arr = array.filter(function (e) {
		return e[param] == id
	})
	return arr[0].avatar
}

module.exports = avaUp