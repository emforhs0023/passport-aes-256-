var passport = require("passport")
var crypto = require("crypto")
var LocalStrategy = require("passport-local").Strategy;
var db = require("../db/loginDB")
var key = "sadfjklsdafjkl"; // 암호화할 key
passport.use(new LocalStrategy({
	usernameField : "userId",
	paswordField : "password",
	passReqToCallback: true
	}
	, function(req, userId, password, done){
		if(userId == undefined || userId == "" || password == undefined || password == ""){
			return done(null, false, {message : '아이디 혹은 비밀번호를 입렵하지 않았습니다.'});
		}
		var psw = password
		db.information(userId, function(result, password){
			if(result){
				var decipher = crypto.createDecipher('aes256', key);
			   	var dc = decipher.update(password, 'base64', 'utf8');
			   	var decipheredOutput = dc + decipher.final('utf8'); 
			   	
			   	if(psw == decipheredOutput){
					user = {"user_id": userId}
			   		return done(null, user);
			   	} else {
			   		return done(null, false, {message:"잘못된 아이디 또는 패스워드 입니다."})
			   	}
			} else {
				return done(null, false, {message:"아이디가 없습니다."})
			} 
		})
	}
))

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user_id, done) {
	done(null, user);
})

module.exports = passport