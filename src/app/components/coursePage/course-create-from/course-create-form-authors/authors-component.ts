import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { DateValidator } from '../../../../shared/validators/date.validator';

const CUSTOM_DATEFIELD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => DateFieldComponent),
    multi: true
};

const CUSTOM_DATEFIELD_VALIDATOR_= {
    provide: NG_VALIDATORS,
    useExisting: forwardRef( () => DateValidator ),
    multi: true
};

@Component({
    selector: 'date-field',
    template: `
        <div class="form-group">
            <label for="datefield">{{label}}</label>
            <input
                [value]="value"
                [name]="fieldName"
                (change)="setValue($event)"
                type="datetime"
                class="form-control"
                id="datefield"
            />
        </div>`,
    providers: [CUSTOM_DATEFIELD_VALUE_ACCESSOR, CUSTOM_DATEFIELD_VALIDATOR_]
})

export class DateFieldComponent implements ControlValueAccessor {

    @Input() fieldName: string;
    @Input() label: string;
    public currentValue: any;

    public onChange = (_) => {};
    public onTouched =(_) => {};

    set value(newValue) {
        this.currentValue = newValue;
        this.onChange(newValue);
    }

    get value() {
        return this.currentValue;
    }

    public setValue(object: any): void {
        this.value = object.target.value
    }

    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
}
