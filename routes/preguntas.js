const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
path = require('path');

router.get('/', (req, res) => {
  knex('pregunta')
    .select()
    .then(preguntas => {
      res.render('pregunta/index', { preguntas: preguntas }); //Llama a un archivo index.hbs dentro de la carpeta /views/pregunta y envia un objeto preguntas
    });
});

router.get('/eliminar/:id', (req, res) => {
  let id = req.params.id; //Tomo el id de la pregunta que llega en la URL
  if(req.params.id != undefined) { 
    knex('pregunta')
    .del()
    .where('id', id)
    .then(()=> { //Funcion que se ejecuta despues del Query que hace knex a la base
      res.redirect('/preguntas')
    })
  }
});

router.get('/editar/:id', (req, res)=> {
  let id = req.params.id;
  if(id!= undefined) {
    knex('pregunta')
    .select()
    .where('id', id)
    .first()
    .then((pregunta)=> {
        
      res.render('pregunta/editar_pregunta', pregunta);
    })
  }
});

router.post('/editar/:id', (req, res)=> {

  let id = req.params.id;
  let pregunta = {
    respuesta: req.body.respuesta,
    id_capitulo: req.body.id_capitulo,
    pregunta:req.body.pregunta
  }



  if(id!= undefined) {

    if (req.files) {

      if(req.files.img_opcion_1){
        let img_opcion_1 = req.files.img_opcion_1;
        pregunta["img_opcion_1"] = "/img/"+img_opcion_1.name;
        img_opcion_1.mv(path.join(__dirname, '../public')+'/img/'+img_opcion_1.name);
      }

      if(req.files.img_opcion_2){
        let img_opcion_2 = req.files.img_opcion_2;
        pregunta["img_opcion_2"] = "/img/"+img_opcion_2.name;
        img_opcion_2.mv(path.join(__dirname, '../public')+'/img/'+img_opcion_2.name);
      }

      if(req.files.img_opcion_3){
        let img_opcion_3 = req.files.img_opcion_3;
        pregunta["img_opcion_3"] = "/img/"+img_opcion_3.name;
        img_opcion_3.mv(path.join(__dirname, '../public')+'/img/'+img_opcion_3.name);
      }

      if(req.files.audio_pregunta){
        let audio_pregunta = req.files.audio_pregunta;
        pregunta["audio_pregunta"] = "/img/"+audio_pregunta.name;
        audio_pregunta.mv(path.join(__dirname, '../public')+'/img/'+audio_pregunta.name);
      }
      
      knex('pregunta')
      .where('id', id)
      .update(pregunta, 'id')
      .then((pregunta)=> {
        res.redirect('/preguntas')
      })
    } else {
        knex('pregunta')
        .where('id', id)
        .update(pregunta, 'id')
        .then((pregunta)=> {
        res.redirect('/preguntas')
      })
    }
  }
});

router.get('/agregar', (req, res) => {

    knex('capitulo')
    .select()
    .then((capitulos)=>{
        console.log(capitulos)
        res.render('pregunta/nuevo_pregunta',{capitulos:capitulos} );
    })

  
})

router.post('/agregar', (req, res) => { //Agregar un capitulo por metodo POST

  //Crear una pregunta con los datos que llegan dentro de req.body
  let pregunta = {
    respuesta: req.body.respuesta,
    id_capitulo: req.body.id_capitulo,
    pregunta:req.body.pregunta
  }

  // Si envia un archivo se guarda en el servidor en la carpeta /public/img/
  if(req.files.img_opcion_1){
    let img_opcion_1 = req.files.img_opcion_1;
    pregunta["img_opcion_1"] = "/img/"+img_opcion_1.name;
    img_opcion_1.mv(path.join(__dirname, '../public')+'/img/'+img_opcion_1.name);
  }

  if(req.files.img_opcion_2){
    let img_opcion_2 = req.files.img_opcion_2;
    pregunta["img_opcion_2"] = "/img/"+img_opcion_2.name;
    img_opcion_2.mv(path.join(__dirname, '../public')+'/img/'+img_opcion_2.name);
  }

  if(req.files.img_opcion_3){
    let img_opcion_3 = req.files.img_opcion_3;
    pregunta["img_opcion_3"] = "/img/"+img_opcion_3.name;
    img_opcion_3.mv(path.join(__dirname, '../public')+'/img/'+img_opcion_3.name);
  }

  if(req.files.audio_pregunta){
    let audio_pregunta = req.files.audio_pregunta;
    pregunta["audio_pregunta"] = "/img/"+audio_pregunta.name;
    audio_pregunta.mv(path.join(__dirname, '../public')+'/img/'+audio_pregunta.name);
  }

  knex('pregunta')
    .insert(pregunta)
    .then((pregunta)=> {
      res.redirect('/preguntas')
    });
});


router.delete('/eliminar/:id', () => {  //Borra un registro pero por metodo DELETE
  let id = req.params.id; //Tomo el id de la pregunta que me llega en la URL
  if(id != undefined) { 
    knex('pregunta')
    .del()
    .where('id', id)
    .then(()=> { //Funcion que se ejecuta despues del Query que hace knex a la base
      res.redirect('/preguntas')
    })
  }
})

module.exports = router;
