
exports.seed = function(knex, Promise) {
  return knex('usuario').del()
    .then(function () {
      const usuarios = [{
        nombre: 'Jenny',
        usuario: 'jenny',
        clave: '1',
        rol: 'A',
        foto: '/img/avatar04.png'

      }, {
        nombre: 'Meche',
        usuario: 'meche',
        clave: '1',
        rol: 'J',
        foto: '/img/avatar02.png'
      }, {
        nombre: 'Isa',
        usuario: 'isa',
        clave: '1',
        rol: 'J',
        foto: '/img/avatar03.png'
      }];
      return knex('usuario').insert(usuarios);
    });
};
