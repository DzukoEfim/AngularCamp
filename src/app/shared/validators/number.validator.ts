import { FormControl, Validator } from '@angular/forms';

export class NumberValidator implements Validator {

    public validate(control: FormControl):
    {[key: string]: boolean}
    {
        return !isNaN(parseFloat(control.value)) && isFinite(control.value) ? null : { invalidNumber: true };
    }

}