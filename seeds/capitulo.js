
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('capitulo').del()
  .then(function () {
    const capitulos = [{
      titulo: 'Capitulo 1',
      video_youtube: 'https://www.youtube.com/watch?v=wzwBnB31Jso',
      id_excursion: 1,
      portada:'/img/capitulo_animales_espaniol.png',
    }, {
      titulo: 'Capitulo 2',
      video_youtube: 'https://www.youtube.com/watch?v=UXujYNnPEsM',
      id_excursion: 1,
      portada:'/img/capitulo_animales_ingles.png',
    }];
    return knex('capitulo').insert(capitulos);
  });
};
