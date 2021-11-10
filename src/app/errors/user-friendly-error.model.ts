/* istanbul ignore file */

import { environment } from '../../environments/environment'

export class UserFriendlyError implements Error {
    public name: string

    constructor(
        public userFriendlyMessage: string,
        public message: string,
        public originalError?: Error
    ) {
        this.name = typeof this
        if (this.userFriendlyMessage[this.userFriendlyMessage.length - 1] !== '.')
            this.userFriendlyMessage += '.'
        // eslint-disable-next-line no-console
        if (!environment.production) console.error(this)
    }
}