"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var date_validator_1 = require('../../../../shared/validators/date.validator');
var CUSTOM_DATEFIELD_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DateFieldComponent; }),
    multi: true
};
var CUSTOM_DATEFIELD_VALIDATOR_ = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return date_validator_1.DateValidator; }),
    multi: true
};
var DateFieldComponent = (function () {
    function DateFieldComponent() {
        this.onChange = function (_) { };
        this.onTouched = function (_) { };
    }
    Object.defineProperty(DateFieldComponent.prototype, "value", {
        get: function () {
            return this.currentValue;
        },
        set: function (newValue) {
            this.currentValue = newValue;
            this.onChange(newValue);
        },
        enumerable: true,
        configurable: true
    });
    DateFieldComponent.prototype.setValue = function (object) {
        this.value = object.target.value;
    };
    DateFieldComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    DateFieldComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DateFieldComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input()
    ], DateFieldComponent.prototype, "fieldName", void 0);
    __decorate([
        core_1.Input()
    ], DateFieldComponent.prototype, "label", void 0);
    DateFieldComponent = __decorate([
        core_1.Component({
            selector: 'date-field',
            template: "\n        <div class=\"form-group\">\n            <label for=\"datefield\">{{label}}</label>\n            <input\n                [value]=\"value\"\n                [name]=\"fieldName\"\n                (change)=\"setValue($event)\"\n                type=\"datetime\"\n                class=\"form-control\"\n                id=\"datefield\"\n            />\n        </div>",
            providers: [CUSTOM_DATEFIELD_VALUE_ACCESSOR, CUSTOM_DATEFIELD_VALIDATOR_]
        })
    ], DateFieldComponent);
    return DateFieldComponent;
}());
exports.DateFieldComponent = DateFieldComponent;
