var express = require('express');
var router = express.Router();

const knex = require('../db/knex');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin', (req, res)=>{

  res.render('administracion')

})


router.get('/login', (req, res)=>{

  res.render('login')

})

router.post('/admin', (req, res)=> {
  let usuario = {
    usuario : req.body.usuario,
    clave : req.body.clave,
    rol:'A'
  }
  console.log(usuario)

  knex('usuario')
  .where(usuario)
  .first()
  .then((usuario)=> {
    console.log(usuario)

    if(usuario!=undefined)
      res.redirect('/validar/'+usuario.id);

    res.redirect('/login')
  })
})

router.get('/validar/:id', (req, res)=> {

  let id = req.params.id;

  res.render('validar', {id:id})
  
})

module.exports = router;
