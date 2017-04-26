import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, /*NG_VALIDATORS*/ } from '@angular/forms';

const CUSTOM_DATEFIELD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => DateFieldComponent),
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
    providers: [CUSTOM_DATEFIELD_VALUE_ACCESSOR]
})

export class DateFieldComponent implements ControlValueAccessor {

    @Input() fieldName: string;
    @Input() label: string;
    private dateRegExp: RegExp = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
    public currentValue: any;

    public onChange = (_) => {};
    public onTouched = (_) => {};

    set value(newValue) {
        const valueForExport = this.dateRegExp.test(newValue) ? newValue : null;
        this.currentValue = newValue;
        this.onChange(valueForExport);
    }

    get value() {
        return this.currentValue;
    }

    public setValue(object: any): void {
        this.value = object.target.value;
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
