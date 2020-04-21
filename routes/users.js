var express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
var router = express.Router();

const { jwtSigningKeys } = config
const { jwtVerifyOptions } = config
const fs = require('fs');


/* GET users listing. */
router.get('/all', function(req, res, next) {
	console.log("Into the journey")
	res.locals.connection.query('select * from Thomas', function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});


const checkToken = (req, res, next) => {
	const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {

        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;

        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}


router.get('/certs', checkToken, function(req, res, next) {

	pubKey = fs.readFileSync(jwtSigningKeys['pubKey']);

	jwt.verify(req.token, pubKey, jwtVerifyOptions, (err, authorizedData) => {
		if(err){
			//If error send Forbidden (403)
			console.log('ERROR: Could not connect to the protected route');
			res.sendStatus(403);
		} else {
			//If token is successfully verified, we can send the autorized data 
			console.log(authorizedData)
			res.locals.connection.query('select * from certDomFqdnView', function (error, results, fields) {
				if(error){
					res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
					//If there is error, we send the error in the error section with 500 status
				} else {
					res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
					//If there is no error, all is good and response is 200OK.
				}
			});
			console.log('SUCCESS: Connected to protected route');
		}
	})
});

module.exports = router;
