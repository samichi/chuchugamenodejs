const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
path = require('path');

router.get('/', (req, res) => {
  knex('capitulo')
    .select()
    .then(capitulos => {
      res.render('capitulo/index', { capitulos: capitulos }); //Llama a un archivo index.hbs dentro de la carpeta /views/capitulo y envia un objeto capitulos
    });
});

router.get('/eliminar/:id', (req, res) => {
  let id = req.params.id; //Tomo el id del capitulo que me llega en la URL
  if(req.params.id != undefined) { 
    knex('capitulo')
    .del()
    .where('id', id)
    .then(()=> { //Funcion que se ejecuta despues del Query que hace knex a la base
      res.redirect('/capitulos')
    })
  }
});

router.get('/editar/:id', (req, res)=> {
  let id = req.params.id;
  if(id!= undefined) {
    knex('capitulo')
    .select()
    .where('id', id)
    .first()
    .then((capitulo)=> {
        
      res.render('capitulo/editar_capitulo', capitulo);
    })
  }
});

router.post('/editar/:id', (req, res)=> {

  let id = req.params.id;
  let capitulo = {
    id_excursion: req.body.id_excursion,
    titulo: req.body.titulo,
    video_youtube: req.body.video_youtube
  }

  if(id!= undefined) {

    if (req.files) {
      let foto = req.files.portada;
      capitulo["portada"] = "/img/"+foto.name;
  
      foto.mv(path.join(__dirname, '../public')+'/img/'+foto.name, function(err) {
        if (err)
          return res.status(500).send(err);
    
        knex('capitulo')
        .where('id', id)
        .update(capitulo, 'id')
        .then((capitulo)=> {
          res.redirect('/capitulos')
        })
      });
    } else {

        knex('capitulo')
        .where('id', id)
        .update(capitulo, 'id')
        .then((capitulo)=> {
        res.redirect('/capitulos')
        })
    }
  }
});

router.get('/agregar', (req, res) => {

    knex('excursion')
    .select()
    .then((excursiones)=>{
        console.log(excursiones)
        res.render('capitulo/nuevo_capitulo',{excursiones:excursiones} );
    })

  
})

router.post('/agregar', (req, res) => { //Agregar un capitulo por metodo POST

  //Crear un capitulo con los datos que llegan dentro de req.body
  let capitulo = {
    id_excursion: req.body.id_excursion,
    titulo: req.body.titulo,
    video_youtube: req.body.video_youtube
  }

  // Si envia un archivo se guarda en el servidor en la carpeta /public/img/
  if (req.files.portada) {
    let foto = req.files.portada;
    capitulo["portada"] = "/img/"+foto.name;

    foto.mv(path.join(__dirname, '../public')+'/img/'+foto.name, function(err) {
      if (err)
        return res.status(500).send(err);
  
      knex('capitulo')
      .insert(capitulo)
      .then((capitulo)=> {
        res.redirect('/capitulos')
      });
    });
  }else {
    knex('capitulo')
    .insert(capitulo)
    .then((capitulo)=> {
      res.redirect('/capitulos')
    });
  }
});


router.delete('/eliminar/:id', () => {  //Borra un registro pero por metodo DELETE
  let id = req.params.id; //Tomo el id del usuario que me llega en la URL
  if(id != undefined) { 
    knex('capitulo')
    .del()
    .where('id', id)
    .then(()=> { //Funcion que se ejecuta despues del Query que hace knex a la base
      res.redirect('/capitulos')
    })
  }
})

/////////////////////// REST API ///////////////////////

router.get('/api/v1/capitulos/', (req, res) => {
  knex('capitulo')
    .select()
    .then(capitulos => {
      res.json(capitulos); //Llama a un archivo index.hbs dentro de la carpeta /views/capitulo y envia un objeto capitulos
    });
});

router.get('/api/v1/capitulos/:id', (req, res) => {
  let id=req.params.id;
  if(id!= undefined) {
    knex('capitulo')
    .select()
    .first()
    .where('id', id)
    .then((capitulo)=> {   
      res.json(capitulo);
    })
  }
});
router.post('/api/v1/insertar/', (req, res) => {
  
  //Crear un capitulo con los datos que llegan dentro de req.body
  let capitulo = {
    id_excursion: req.body.id_excursion,
    titulo: req.body.titulo,
    video_youtube: req.body.video_youtube,
    portada: req.body.portada
  }
  knex('capitulo')
    .insert(capitulo)
    .then((capitulo)=> {
      res.json(capitulo)
  });

});
router.put('/api/v1/editar/:id', (req, res) => {
  let id = req.params.id;
  let capitulo = {
    id_excursion: req.body.id_excursion,
    titulo: req.body.titulo,
    video_youtube: req.body.video_youtube,
    portada: req.body.portada
  }
  knex('capitulo')
    .where('id', id)
    .update(capitulo, 'id')
    .then(()=> {
      res.json(capitulo)
  });
});

router.delete('/api/v1/eliminar/:id', (req, res) => {
  let id = req.params.id; //Tomo el id del usuario que me llega en la URL
  if(id != undefined) { 
    knex('capitulo')
    .del()
    .where('id', id)
    .then(()=> { //Funcion que se ejecuta despues del Query que hace knex a la base
      res.json(id)
    })
  }
});


module.exports = router;
