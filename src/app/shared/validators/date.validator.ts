import { FormControl, Validator } from '@angular/forms';

export class DateValidator implements Validator {

    public validate(control: FormControl):
        {[key: string]: boolean}
    {
        const dateRegExpp = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
        return dateRegExpp.test(control.value) ?
            null:
            { invalidDate: true };
    }

}