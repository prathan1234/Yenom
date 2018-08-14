var income = require('../controllers/income.controller');

module.exports = (app) => {
    var path = '/income';

    app.get(path + '/all', income.getAll);
    app.post(path + '/create', income.create);
    app.post(path + '/update', income.update);
    app.get(path + '/remove/:id', income.remove);
    app.get(path + '/removeAll', income.removeAll);
}