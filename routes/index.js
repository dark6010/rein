var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.post('/periodos', function(req, res) {
  res.render('periodos', req.body);
  //console.log(req.body  )
});
router.post('/plantilla', function(req, res) {
  var tl=0;
  for (i = 0; i < req.body.hip.length; i++) {
    tl+=(req.body.hfp[i]*60+req.body.mfp[i])-(req.body.hip[i]*60+req.body.mip[i])
  }
  res.render('plantilla', {tl: tl});
});

module.exports = router;
