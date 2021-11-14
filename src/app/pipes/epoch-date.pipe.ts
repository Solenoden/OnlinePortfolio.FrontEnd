import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
    name: 'epochDate'
})
export class EpochDatePipe implements PipeTransform {
    transform(value: number): string {
        return moment(value).format('YYYY-MM-DD')
    }
}