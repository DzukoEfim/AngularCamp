"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var number_validator_1 = require('../../../../shared/validators/number.validator');
var CUSTOM_DATEFIELD_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DurationComponent; }),
    multi: true
};
var CUSTOM_NUMBER_VALIDATOR_ = {
    provide: forms_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return number_validator_1.NumberValidator; }),
    multi: true
};
var DurationComponent = (function () {
    function DurationComponent() {
        this.onChange = function (_) { };
        this.onTouched = function (_) { };
    }
    Object.defineProperty(DurationComponent.prototype, "value", {
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
    DurationComponent.prototype.setValue = function (object) {
        this.value = object.target.value;
    };
    DurationComponent.prototype.writeValue = function (value) {
        this.value = value;
    };
    DurationComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DurationComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input()
    ], DurationComponent.prototype, "fieldName", void 0);
    __decorate([
        core_1.Input()
    ], DurationComponent.prototype, "label", void 0);
    DurationComponent = __decorate([
        core_1.Component({
            selector: 'duration-field',
            template: "\n        <div class=\"form-group\">\n            <label for=\"duration\">{{label}}</label>\n            <input\n                [value]=\"value\"\n                [name]=\"fieldName\"\n                (change)=\"setValue($event)\"\n                type=\"text\"\n                class=\"form-control\"\n                id=\"duration\"\n            />\n        </div>",
            providers: [CUSTOM_DATEFIELD_VALUE_ACCESSOR, CUSTOM_NUMBER_VALIDATOR_]
        })
    ], DurationComponent);
    return DurationComponent;
}());
exports.DurationComponent = DurationComponent;
