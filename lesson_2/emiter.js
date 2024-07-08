// Імпорт модуля подій
const EE = require('node:events');

// Створення екземпляра класу EventEmitter
const emitter  = new EE();

// Реєстрація обробника подій 'test2'
// Викликається кожного разу при виникненні події 'test2'
emitter.on('test2', (...data) => {
    console.log(data);
})

// Реєстрація обробника подій 'create_user'
// Викликається тільки один раз при виникненні події 'create_user'
emitter.once('create_user', (user) => {
    console.log(user);
})

// Експорт екземпляра emitter для використання в інших модулях
module.exports = {emitter};
