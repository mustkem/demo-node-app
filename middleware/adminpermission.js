module.exports = function() {
	function permissionHandler(param) {
		return this.originalUrl;
	}
	
	return function(req, res, next) {
		permission = permissionHandler;
		
		next();
	}
}