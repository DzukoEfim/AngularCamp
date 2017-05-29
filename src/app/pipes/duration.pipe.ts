import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration'
})

export class DurationPipe implements PipeTransform {

    transform(duration: number) {
        let hours: number = Math.floor  ((duration / 60) % 60),
            minutes: number = duration % 60,
            result: string = '';

        if (hours >= 1) {
            result += hours + 'h ';
        }

        if (minutes >= 0) {
            result += minutes + 'min';
        }

        return result;
    }

}
