"use strict";
var NumberValidator = (function () {
    function NumberValidator() {
    }
    NumberValidator.prototype.validate = function (control) {
        return !isNaN(parseFloat(control.value)) && isFinite(control.value) ? null : { invalidNumber: true };
    };
    return NumberValidator;
}());
exports.NumberValidator = NumberValidator;
