var express = require('express');
const config = require('../config');
const { user } = config 
const { jsonPayload } = config
var router = express.Router();
const jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/login', (req, res, next) => {
  const { body } = req;
  const { username } = body;
  const { password } = body;


  //checking to make sure the user entered the correct username/password combo
  if(username === user.username && password === user.password) { 
       console.log("Clownapggedon!!")
      //if user log in success, generate a JWT token for the user with a secret key
      jwt.sign({jsonPayload}, 'privatekey', { expiresIn: '1h' },(err, token) => {
          if(err) { console.log(err) }    
          res.send(token);
      });
  } else {
      console.log('ERROR: Could not log in');
  }
})

module.exports = router;
