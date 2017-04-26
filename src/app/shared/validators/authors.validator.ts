import { FormControl, Validator } from '@angular/forms';

export class AuthorsValidator implements Validator {

    public validate(control: FormControl): {[key: string]: boolean} {
        return control.value.length > 0 ? null : { invalidNumberOfAuthors: true };
    }
}
