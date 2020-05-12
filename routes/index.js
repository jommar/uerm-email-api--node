var express = require('express');
const mailjet = require('node-mailjet')
  // .connect('975b520b579ed7f68df24d988d34d3bc', '9439b6d37a402d058601580521c5476b')4
  .connect('d5756bd2a66525b42917761f83330586', '7550398337eafabeff9e7677d4af213b')

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'UERM Mail API' })
});

module.exports = router;
