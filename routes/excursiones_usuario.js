var express = require('express');
var router = express.Router();
const knex = require('../db/knex');
/* GET  page. */

//localhost:3000/excursiones
router.get('/', (req, res)=>{
  //Si no me envia el id en la url lo redirijo a la lista de usuario
  res.redirect('/jugar');
  //res.redirect('/excursiones_usuario');

})

//localhost:3000/excursiones_usuario/1
router.get('/:id', (req, res)=>{

  //Si el id me llega en la URL lo dirijo al listado de excursiones
  let id = req.params.id;

  knex('usuario')
  .where('id', id)
  .first()
  .then((usuario)=>{
    console.log("-->")
    console.log(usuario)

    knex('excursion')
    .select()
    .then((excursiones)=>{
      //Con knex consulto todas las excursiones y se lo envio a la vista excuriones_usuario.hbs
      console.log(excursiones)
      res.render('excursiones_usuario', {excursiones:excursiones,usuario: usuario})
    })

  })

    

})


router.post('/excursiones_usuario', (req, res)=> {

})


module.exports = router;
