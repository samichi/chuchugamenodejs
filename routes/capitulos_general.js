var express = require('express');
var router = express.Router();
const knex = require('../db/knex');
/* GET  page. */


router.get('/', (req, res)=>{
  res.redirect('/jugar');
  //res.redirect('/capitulos_general');
})


router.get('/:id_usuario/:id_excursion', (req, res)=> {

  //Si el id me llega en la URL lo dirijo al listado de excursiones
  let id_excursion = req.params.id_excursion;
  let id_usuario = req.params.id_usuario;

    knex('capitulo')
    .select()
    .where('id_excursion', id_excursion)
    .then((capitulos)=>{

      //Se le aumenta 1 punto al usuario visitante
      knex('usuario')
      .increment('puntos', 1)
      .where('id', id_usuario)
      .then(()=>{
        //Con knex consulto todos los capitulos y se lo envio a la vista capitulos_general.hbs
        console.log(capitulos)
        res.render('capitulos_general', {capitulos:capitulos})
      })


      
    })

})


module.exports = router;
