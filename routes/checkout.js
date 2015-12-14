'use strict';

var express = require('express');
var router = express.Router();
var stripe = reqire('stripe')('API_TestKeyHere');

router.post('/', function(req, res){
  var tokenObj = req.body.tokenOBj;
  var book = req.body.book;
  var charge = stripe.charges.create({
    amount: Math.round(book.price * 100),
    currency: 'usd',
    source: tokenObj.id,
    description: book.title + 'by ' + book.author
  }, function(err, charge){
    res.status(err ? 400 : 200).send(err || charge);
  });
});

module.exports = router;
