const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
path = require('path');

router.get('/', (req, res) => {
  knex('usuario')
    .select()
    .then(usuarios => {
      res.render('usuario/index', { usuarios: usuarios }); //Llama a un archivo index.hbs dentro de la carpeta /views/usuario y envia un objeto usuarios
    });
});

router.get('/eliminar/:id', (req, res) => {
  let id = req.params.id; //Tomo el id del usuario que me llega en la URL
  if(req.params.id != undefined) { 
    knex('usuario')
    .del()
    .where('id', id)
    .then(()=> { //Funcion que se ejecuta despues del Query que hace knex a la base
      res.redirect('/usuarios')
    })
  }
});

router.get('/editar/:id', (req, res)=> {
  let id = req.params.id;
  if(id!= undefined) {
    knex('usuario')
    .select()
    .where('id', id)
    .first()
    .then((usuario)=> {
      res.render('usuario/editar_usuario', usuario);
    })
  }
});

router.post('/editar/:id', (req, res)=> {

  let id = req.params.id;
  if(id!= undefined) {

    let usuario = {
      nombre: req.body.nombre,
      usuario: req.body.usuario,
      clave: req.body.clave,
      //foto: req.body.foto,
      rol: req.body.rol,
    }

    if (req.files) {
      let foto = req.files.foto;
      usuario["foto"] = "/img/"+foto.name;
  
      foto.mv(path.join(__dirname, '../public')+'/img/'+foto.name, function(err) {
        if (err)
          return res.status(500).send(err);
    
        knex('usuario')
        .where('id', id)
        .update(usuario, 'id')
        .then((usuario)=> {
          res.redirect('/usuarios')
        })
      });
    } else {

    knex('usuario')
    .where('id', id)
    .update(usuario, 'id')
    .then((usuario)=> {
      res.redirect('/usuarios')
    })

    }
    
  }
});

router.get('/agregar', (req, res) => {
  res.render('usuario/nuevo_usuario');
})

router.post('/agregar', (req, res) => { //Agregar un usuario por metodo POST

  //Crear un usuario con los datos que llegan dentro de req.body
  let usuario = {
    nombre: req.body.nombre,
    usuario: req.body.usuario,
    clave: req.body.clave,
    foto: "",
    rol: req.body.rol,
  }

  // Si envia un archivo se guarda en el servidor en la carpeta /public/img/
  if (req.files) {
    let foto = req.files.foto;
    usuario["foto"] = "/img/"+foto.name;

    foto.mv(path.join(__dirname, '../public')+'/img/'+foto.name, function(err) {
      if (err)
        return res.status(500).send(err);
  
      knex('usuario')
      .insert(usuario)
      .then((usuario)=> {
        res.redirect('/usuarios')
      });
    });
  }
});


router.delete('/eliminar/:id', () => {  //Borra un registro pero por metodo DELETE
  let id = req.params.id; //Tomo el id del usuario que me llega en la URL
  if(id != undefined) { 
    knex('usuario')
    .del()
    .where('id', id)
    .then(()=> { //Funcion que se ejecuta despues del Query que hace knex a la base
      res.redirect('/usuarios')
    })
  }
})

/////////////////////// REST API ///////////////////////

router.get('/api/v1/usuarios/', (req, res) => {
  knex('usuario')
    .select()
    .then(usuarios => {
      res.json(usuarios); //Llama a un archivo index.hbs dentro de la carpeta /views/capitulo y envia un objeto capitulos
    });
});

router.get('/api/v1/usuarios/:id', (req, res) => {
  let id=req.params.id;
  if(id!= undefined) {
    knex('usuario')
    .select()
    .first()
    .where('id', id)
    .then((usuario)=> {   
      res.json(usuario);
    })
  }
});
router.post('/api/v1/insertar/', (req, res) => {
  
  //Crear un capitulo con los datos que llegan dentro de req.body
  let usuario = {
    nombre: req.body.nombre,
    usuario: req.body.usuario,
    clave: req.body.clave,
    foto: req.body.foto,
    rol: req.body.rol,
  }

  knex('usuario')
    .insert(usuario)
    .then((usuario)=> {
      res.json(usuario)
  });

});
router.put('/api/v1/editar/:id', (req, res) => {
  let id = req.params.id;
  let usuario = {
    nombre: req.body.nombre,
    usuario: req.body.usuario,
    clave: req.body.clave,
    foto: req.body.foto,
    rol: req.body.rol,
  }
  knex('usuario')
    .where('id', id)
    .update(usuario, 'id')
    .then(()=> {
      res.json(usuario)
  });
});

router.delete('/api/v1/eliminar/:id', (req, res) => {
  let id = req.params.id; //Tomo el id del usuario que me llega en la URL
  if(id != undefined) { 
    knex('usuario')
    .del()
    .where('id', id)
    .then(()=> { //Funcion que se ejecuta despues del Query que hace knex a la base
      res.json(id)
    })
  }
});


module.exports = router;
