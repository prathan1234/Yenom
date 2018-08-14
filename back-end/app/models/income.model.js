import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var IncomeSchema = new Schema({
    date: {
        type: Number,
        trim: true
    },
    status: {
        type: String
    },
    detail: {
        type: String
    },
    income_val: {
        type: Number
    },
    expenses_val: {
        type: Number
    }
});

mongoose.model('Income', IncomeSchema);