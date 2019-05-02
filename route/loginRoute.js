var express = require('express');
var db = require("../db/loginDB");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var passport   = require("../services/passport")
var crypto = require("crypto")
var signAuth   = require("../services/signAuth")
var ensureAuth   = require("../services/ensureAuth")
var urlencodedParser = bodyParser.urlencoded({extended : false})
var router = express.Router();

/* GET home page. */
router.get('/', [signAuth], function(req, res, next) {
	var fmsg = req.flash();
	if(fmsg.error){
		feedback = fmsg.error[0]
		res.render('login/index', {feedback: feedback});
	} else {
		res.render('login/index', {feedback: fmsg});
	}
});

router.get('/sign_up',  function(req, res, next) {
	res.render('login/sign_up');
});

router.post("/signUp", [jsonParser], function(req, res){

	let body = req.body;
	let user_id = body.user_id;
	let psw = body.user_password;
	
	var key = "sadfjklsdafjkl"; // 암호화할 key
	var cipher = crypto.createCipher('aes256', key)
	cipher.update(psw, 'utf8', 'base64')
	var cipheredOutput = cipher.final('base64')
	
	db.signUp(user_id, cipheredOutput, function(result){
		res.send(result)
	})
})
	
router.post("/signin", [urlencodedParser,passport.authenticate('local', {failureRedirect: '/login', failureFlash:true})], function(req, res){
	res.redirect('/main');
})

module.exports = router;
