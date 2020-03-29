const mongoose = require('mongoose');

const mongooseError = mongoose.Error;
const { ValidationError } = mongooseError;

function DuplicateKeyError() {
    this.message = 'Duplicate _id has been used';
}

DuplicateKeyError.prototype = Object.create(mongooseError.prototype);

module.exports = {
    ValidationError,
    DuplicateKeyError,
};
