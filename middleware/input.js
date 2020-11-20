module.exports = function() {
	function inputHandler(param, inputDefault) {
		var request = Object.assign(this.body, this.params, this.query);
		var value = null;

		if(typeof param === 'string' && param === '__all__') {
			value = request;
		}else if(typeof param === 'string' && request[param]) {
			value = request[param];
		}else {
			value = inputDefault;
		}
		
		return value;
	}
	
	return function(req, res, next) {
		req.input = inputHandler;		
		next();
	}
}
