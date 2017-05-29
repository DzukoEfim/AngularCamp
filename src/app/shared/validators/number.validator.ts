import { FormControl, Validator } from '@angular/forms';

export class NumberValidator implements Validator {

    public validate(control: FormControl): {
        invalidNumber: boolean,
        error: string
    } {
        return !isNaN(parseFloat(control.value)) && isFinite(control.value) ?
            null :
            { invalidNumber: true, error: 'Duration should be number!' };
    }
}
