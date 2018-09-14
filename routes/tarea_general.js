var express = require('express');
var router = express.Router();
const knex = require('../db/knex');
/* GET  page. */


router.get('/:id_capitulo/:id_excursion', (req, res)=>{

  let id_capitulo = req.params.id_capitulo;
  let id_excursion = req.params.id_excursion;

  console.log(id_capitulo)
  console.log(id_excursion)

  knex('pregunta')
  .where('id_capitulo', id_capitulo)
  .first()
  .then((pregunta)=>{

    if(pregunta!= undefined){
      console.log('Pregunta')
      console.log(pregunta)
      res.render('tarea_general', {pregunta:pregunta})
    }else {
      res.redirect('/jugar');
    }
    
  })

  

})


module.exports = router;
