var Income = require('mongoose').model('Income');
var path = require("path");

exports.getAll = (req, res, next) => {
    Income.find((err, income) => {
        if (err) {
            console.log('Failure: ' + err);
            return next(err);
        }
        else {
            console.log(income);
            res.json(income);
        }
    });
}

exports.create = (req, res, next) => {
    var income = new Income(req.body);
    income.save(function (err) {
        if (!income || err) {
            console.log('Failure' + err);
            res.json({ "success": "false" });
        }
        else {
            console.log('Success\n' + income);
            res.json({ "success": "true" });
        }
    });
}

exports.update = (req, res, next) => {
    var incomeupdate = {};
    incomeupdate = Object.assign(incomeupdate, req.body);
    delete incomeupdate._id;
    Income.update({
        date: req.params.date,
        detail: req.params.detail,
        income_val: req.params.income_val,
        expenses_val: req.params.expenses_val
    }, incomeupdate,
        function (err, income) {
            if (err) { return next(err); }
            else { res.json(income); }
        }
    );
}

exports.remove = (req, res, next) => {
    Income.remove({
        _id: req.params.id
    }, function (err, income) {
        if (err) {
            console.log('Failure');
            return next(err);
        }
        else {
            console.log('Remove success');
            res.json({ "success": "true" });
        }
    });
}

exports.removeAll = (req, res, next) => {
    Income.remove({}, function (err, income) {
        if (err) {
            return next(err);
        }
        else {
            console.log('Remove All success');
            res.json({ "succuss": "true" });
        }
    });
}