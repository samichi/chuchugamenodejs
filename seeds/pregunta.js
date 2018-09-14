
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pregunta').del()
    .then(function () {
      const preguntas = [{
        id_capitulo: 1,
        pregunta: '¿Señala la vaca?',
        audio_pregunta: '/audio/sonido_vaca.mp3',
        img_opcion_1: '/img/cerdo.png',
        img_opcion_2: '/img/pato.png',
        img_opcion_3: '/img/vaca.png',
        respuesta: 3
      }, 
      {
        id_capitulo: 1,
        pregunta: '¿Señala el numero?',
        audio_pregunta: '/audio/senala_numero_dos.mp3',
        img_opcion_1: '/img/cinco.png',
        img_opcion_2: '/img/tres.png',
        img_opcion_3: '/img/uno.png',
        respuesta: 1
      }];
      return knex('pregunta').insert(preguntas);
    });
};
