var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const alertMessage = req.flash('alertMessage') ? req.flash('alertMessage') : null;
  const alertStatus = req.flash('alertStatus') ? req.flash('alertStatus') : null;
  const alert = { message: alertMessage, status: alertStatus }
  res.render('index', { alert} );
});

router.get('/tambah-data', function(req, res, next) {
  res.render('tambah', { model: true });
});

router.get('/edit-data', function(req, res, next) {
  res.render('tambah', { model: false });
});

module.exports = router;
