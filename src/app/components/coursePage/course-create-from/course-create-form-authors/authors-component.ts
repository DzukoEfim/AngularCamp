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
        <div *ngFor="let author of authors;">
            <div class="form-group">
                <label>
                    <input 
                        (change)="setValue($event)"
                         value="{{author.name}}"
                         type="checkbox" 
                        [checked]="isChecked(author.name)"
                    /> {{author.name}}
                </label>
            </div>
        </div>`,
    providers: [CUSTOM_DATEFIELD_VALUE_ACCESSOR, CUSTOM_AUTHORS_VALIDATOR]
})

export class AuthorsSelectorComponent implements ControlValueAccessor {

    @Input() authors: Array<{name: string, enabled: boolean}>;

    public onChange = (_) => {};
    public onTouched = (_) => {};

    set value(newValue) {
        this.onChange(newValue);
    }

    get value() {
        return this.authors.map( authorObject =>  {
            return authorObject.name;
        });
    }

    public setValue(object: any): void {
        let newAuthorsArray = [],
            authorIndex = this.getAuthorIndex(object.target.value);

        this.authors[authorIndex].enabled = object.target.checked;
        newAuthorsArray = this.authors.filter( author => { return author.enabled; });
        this.value = newAuthorsArray.map( author => { return author.name; });
    }

    public writeValue(value: any): void {
        this.value = value.map( author => { return author.name; });
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public isChecked(author: string): boolean {
        return this.authors[this.getAuthorIndex(author)].enabled;
    }

    private getAuthorIndex(name: string): number {
        return this.authors.findIndex( authorObject => {
            return authorObject.name === name;
        });
    }
}
