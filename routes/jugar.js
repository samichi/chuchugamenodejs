var express = require('express');
var router = express.Router();
const knex = require('../db/knex');
/* GET  page. */


router.get('/', (req, res)=>{


  knex('usuario')
  .where('rol', 'J')
  .then((usuarios)=>{
    //Le envio a la vista jugar.hbs un arreglo de usuarios con rol 'J' (jugador)
    res.render('jugar', {usuarios:usuarios})
  })
  //res.render('jugar')

})

router.post('/jugar', (req, res)=> {
    res.redirect('/jugar')
})


module.exports = router;
