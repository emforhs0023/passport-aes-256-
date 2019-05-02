SocketHandler = (function(){

	var root = this;
	var Module;
	var io = null;

	if(typeof exports !== "undefined"){ // exports ==  module.exports는 
		Module = exports;
	}else{
		Module = root.Module = {};
	}

	Module.testInfo = function(socketIo){ // room 만드는 작업
		io = socketIo;

		io.on("connection", function(socket){
			// layer가 변경 되었을 경우
			socket.on('test', function(data) {
				socket.on('move_layer', function(data){
					
				})
			})
		})
	}

})();


module.exports = SocketHandler;