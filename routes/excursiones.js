const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
path = require('path');

router.get('/', (req, res) => {
  knex('excursion')
    .select()
    .then(excursiones => {
      res.render('excursion/index', { excursiones: excursiones }); //Llama a un archivo index.hbs dentro de la carpeta /views/excursion y envia un objeto excursiones
    });
});

router.get('/eliminar/:id', (req, res) => {
  let id = req.params.id; //Toma el id de la excursion que me llega en la URL
  if(req.params.id != undefined) { 
    knex('excursion')
    .del()
    .where('id', id)
    .then(()=> { //Funcion que se ejecuta despues del Query que hace knex a la base
      res.redirect('/excursiones')
    })
  }
});

router.get('/editar/:id', (req, res)=> {
  let id = req.params.id;
  if(id!= undefined) {
    knex('excursion')
    .select()
    .where('id', id)
    .first()
    .then((excursion)=> {
      res.render('excursion/editar_excursion', excursion);
    })
  }
});

router.post('/editar/:id', (req, res)=> {

  let id = req.params.id;

  let excursion = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    creditos: req.body.creditos,
    //portada: req.body.portada
  }

  if(id!= undefined) {
    console.log(req.files)

    if (req.files.portada) {
      let foto = req.files.portada;
      excursion["portada"] = "/img/"+foto.name;
  
      foto.mv(path.join(__dirname, '../public')+'/img/'+foto.name, function(err) {
        if (err)
          return res.status(500).send(err);
    
        knex('excursion')
        .where('id', id)
        .update(excursion, 'id')
        .then((excursion)=> {
          res.redirect('/excursiones')
        })
      });
    } else {

        //excursion["portada"] = "/img/profile.png";
        knex('excursion')
        .where('id', id)
        .update(excursion, 'id')
        .then((excursion)=> {
        res.redirect('/excursiones')
        })
    }
    
  }
});

router.get('/agregar', (req, res) => {
  res.render('excursion/nuevo_excursion');
})

router.post('/agregar', (req, res) => { //Agregar una excursion por metodo POST

  //Crear una excursion con los datos que llegan dentro de req.body
  let excursion = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    creditos: req.body.creditos
  }

  // Si envia un archivo se guarda en el servidor en la carpeta /public/img/
  if (req.files.portada) {
    let foto = req.files.portada;
    excursion["portada"] = "/img/"+foto.name;

    foto.mv(path.join(__dirname, '../public')+'/img/'+foto.name, function(err) {
      if (err)
        return res.status(500).send(err);
  
      knex('excursion')
      .insert(excursion)
      .then((excursion)=> {
        res.redirect('/excursiones')
      });
    });
  } else {
    
    knex('excursion')
      .insert(excursion)
      .then((excursion)=> {
        res.redirect('/excursiones')
      });
  }
});


router.delete('/eliminar/:id', () => {  //Borra un registro pero por metodo DELETE
  let id = req.params.id; //Tomo el id de la excursion que me llega en la URL
  if(id != undefined) { 
    knex('excursion')
    .del()
    .where('id', id)
    .then(()=> { //Funcion que se ejecuta despues del Query que hace knex a la base
      res.redirect('/excursiones')
    })
  }
})

/////////////////////// REST API ///////////////////////

router.get('/api/v1/excursiones/', (req, res) => {
  knex('excursion')
    .select()
    .then(excursiones => {
      res.json(excursiones); //Llama a un archivo index.hbs dentro de la carpeta /views/capitulo y envia un objeto capitulos
    });
});

router.get('/api/v1/excursiones/:id', (req, res) => {
  let id=req.params.id;
  if(id!= undefined) {
    knex('excursion')
    .select()
    .first()
    .where('id', id)
    .then((excursion)=> {   
      res.json(excursion);
    })
  }
});
router.post('/api/v1/insertar/', (req, res) => {
  
  //Crear un capitulo con los datos que llegan dentro de req.body
  let excursion = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    creditos: req.body.creditos,
    portada: req.body.portada
  }

  knex('excursion')
    .insert(excursion)
    .then((excursion)=> {
      res.json(excursion)
  });

});
router.put('/api/v1/editar/:id', (req, res) => {
  let id = req.params.id;
  let excursion = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    creditos: req.body.creditos,
    portada: req.body.portada
  }

  knex('excursion')
    .where('id', id)
    .update(excursion, 'id')
    .then(()=> {
      res.json(excursion)
  });
});

router.delete('/api/v1/eliminar/:id', (req, res) => {
  let id = req.params.id; //Tomo el id del usuario que me llega en la URL
  if(id != undefined) { 
    knex('excursion')
    .del()
    .where('id', id)
    .then(()=> { //Funcion que se ejecuta despues del Query que hace knex a la base
      res.json(id)
    })
  }
});


module.exports = router;
