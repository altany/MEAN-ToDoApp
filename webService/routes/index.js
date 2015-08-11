var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/webservice', function(req, res, next) {
  res.render('webservice', { title: 'Express' });
});

/* GET AngularJS home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/partials/:name', function(req, res){
	var name = req.params.name;
	res.render('partials/' + name );
});

router.get('*', function(req, res, next) {
  res.render('index');
});

module.exports = router;
