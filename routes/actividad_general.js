var express = require('express');
var router = express.Router();
const knex = require('../db/knex');

const urlParser = require("js-video-url-parser");
/* GET  page. */


router.get('/', (req, res)=>{

  res.render('actividad_general')

})
//localhost:3000/actividad_general/1/1/jugar
router.get('/:id_excursion/:id_capitulo/jugar', (req, res)=>{

  console.log("Actividad general")
  //El ID que recibo es el del capitulo y retorno toda la informacion del mismo

  let id_capitulo = req.params.id_capitulo;
  let id_excursion = req.params.id_excursion;
  //let excursion_ = null;
  console.log(id_capitulo)
  console.log(id_excursion)

  knex.select('*')
  .from('excursion')
  .where('excursion.id', id_excursion)
  .first()
  .then((excursion)=>{
    console.log(excursion)
    excursion_ = excursion;
    knex('capitulo')
    .where('id', id_capitulo)
    .first()
    .then((capitulo)=>{
        //console.log(capitulo)
        capitulo.urlId = urlParser.parse(capitulo.video_youtube).id; //Con esta funcion obtengo el ID de cualquier video de youtube

        res.render('actividad_general', {capitulo, excursion})
    })
  })

  

})


router.post('/actividad_general', (req, res)=> {

})


module.exports = router;
