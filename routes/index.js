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
	//tl tiempo total en periodos que no se realizan observaciones
  var tl=0;
  for (i = 0; i < req.body.hip.length; i++) {
    tl+=(req.body.hfp[i]*60+req.body.mfp[i])-(req.body.hip[i]*60+req.body.mip[i])
  }
  res.render('plantilla', {tl: tl});
	//tiempo total que se trabaja
	var tw=(req.body.hf*60+req.body.mf*1)-(req.body.hi*60+req.body.mi*1)-tl
	var horarios = new Array(req.body.no);
	for (var i = 0; i < req.body.no; i++) {
  	horarios[i]=Math.floor((Math.random() * tw) + 1);
	}
	horarios.sort(function(a, b){return a-b})
  var flag=true;
  var pos=0;
  var acum=0;
  var hr= new Array(req.body.no);
  var mr= new Array(req.body.no);
  for (i = 0; i < req.body.hfp.length ; i++) {
    while(((req.body.hip[i]*60+req.body.mip[i])-(req.body.hi*60+req.body.mi*1))> horarios[pos] && flag){
      hr[pos]=req.body.hi*1+Math.floor(horarios[pos]/60)
      if(horarios[pos]%60+req.body.mi*1 > 59){
        hr[pos]++;
        mr[pos]=((horarios[pos]+req.body.mi*1)%60)
      }else{
        mr[pos]=(horarios[pos]%60+req.body.mi*1)
      }
      
    }
  }
});



module.exports = router;
