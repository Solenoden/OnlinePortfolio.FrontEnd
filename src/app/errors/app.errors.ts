/* istanbul ignore file */

import { UserFriendlyError } from './user-friendly-error.model'

const DefaultUnexpectedErrorMessage = 'An unexpected error occurred'

export class ApiCallError extends UserFriendlyError {
    constructor(
        httpMethod: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE',
        endpoint: string,
        originalError: Error
    ) {
        super(
            DefaultUnexpectedErrorMessage,
            `API call to ${httpMethod} ${endpoint} failed`,
            originalError
        )
    }
}

export class UnexpectedError extends UserFriendlyError {
    constructor(originalError: Error, activityDescription?: string) {
        let errorMessage = DefaultUnexpectedErrorMessage
        errorMessage += activityDescription ? ' while ' + activityDescription.toLowerCase() : '.'

        super(
            errorMessage,
            errorMessage,
            originalError
        )
    }
}