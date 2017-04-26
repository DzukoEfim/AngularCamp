import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { AuthorsValidator } from '../../../../shared/validators/authors.validator';

const CUSTOM_AUTHORS_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef( () => AuthorsValidator ),
    multi: true
};

const CUSTOM_DATEFIELD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => AuthorsSelectorComponent),
    multi: true
};

@Component({
    selector: 'authors',
    template: `
        <div *ngFor="let author of authors; let i=index">
            <div class="form-group">
                <label>
                    <input 
                        (change)="setValue($event)"
                         value="{{author}}"
                        type="checkbox" 
                        [checked]="activeAuthors.indexOf(author) > -1"
                    /> {{author}}
                </label>
            </div>
        </div>`,
    providers: [CUSTOM_DATEFIELD_VALUE_ACCESSOR, CUSTOM_AUTHORS_VALIDATOR]
})

export class AuthorsSelectorComponent implements ControlValueAccessor {

    @Input() authors: Array<string>;

    public activeAuthors: Array<{name: string, enabled: boolean}>;

    public onChange = (_) => {};
    public onTouched = (_) => {};

    set value(newValue) {
        this.activeAuthors = newValue;
        this.onChange(newValue);
    }

    get value() {
        return this.activeAuthors;
    }

    public setValue(object: any): void {

        let newAuthorsArray = this.value.slice(0);

        if (object.target.checked) {
            newAuthorsArray.push(object.target.value);
        } else {
            const index = newAuthorsArray.indexOf(object.target.value);
            newAuthorsArray.splice(index, 1);
        }
        this.value = newAuthorsArray;
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
