
exports.seed = function(knex, Promise) {
  return knex('excursion').del()
  .then(function () {
    const excursiones = [{
      titulo: 'Excursion animales',
      descripcion: 'descripcion 1',
      creditos: 'creditos 1',
      portada: '/img/excursion_animales.png',
    }];
    return knex('excursion').insert(excursiones);
  });
};
