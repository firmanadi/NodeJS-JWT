var express = require('express');
var router = express.Router();
var Test=require('../models/Test');
var multer  = require('multer');
var jwt = require('jsonwebtoken');
var upload = multer();
router.get('/:id?',function(req,res,next){

  if(req.params.id){

    Test.getTestById(req.params.id,function(err,rows){

      if(err){
          res.json(err);
        }else{
          res.json(rows);
        }

    });

  }else{

    Test.getAllTests(function(err,rows){

      if(err){
          res.json(err);
        }else{
          res.json(rows);
        }

     });

  }

});

router.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

router.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '60s' }, (err, token) => {
    res.json({
      message: token
    });
  });
});

router.post('/',upload.fields([]),function(req,res,next){
    console.log('test data', Test);
    var formData = req.body;
    console.log('request : ', formData);
    Test.addTest(formData,function(err,count){

      if(err){
        res.json(err);
      }else{
        res.json(req.body);//or return count for 1 &amp;amp;amp; 0
      }

    });

});

router.delete('/:id',function(req,res,next){

    Test.deleteTest(req.params.id,function(err,count){

      if(err){
        res.json(err);
      }else{
        res.json(count);
      }

    });
});

router.put('/:id',function(req,res,next){

    Test.updateTest(req.params.id,req.body,function(err,rows){

      if(err){
        res.json(err);
      }else{
        res.json(rows);
      }

    });

});
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
module.exports=router;
