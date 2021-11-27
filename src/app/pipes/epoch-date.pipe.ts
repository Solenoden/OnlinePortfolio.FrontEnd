import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
    name: 'epochDate'
})
export class EpochDatePipe implements PipeTransform {
    transform(value: number): string {
        if (value < 1000000000000) value *= 1000

        return moment(value).format('YYYY-MM-DD')
    }
}