import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {

    public getDiffBetweenDatesInDays(date1: Date, date2: Date): number {
        return Math.ceil( (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24) );
    }

    public getDaysInDate(date: Date): number {
        return date.getTime() / ( 1000 * 3600 * 24 );
    }

}
