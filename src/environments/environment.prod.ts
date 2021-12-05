/* istanbul ignore file */

export const environment = {
    production: true,
    backendUrl: window['env'] && window['env']['backendUrl']
        ? window['env']['backendUrl']
        : '',
    emailAddress: window['env'] && window['env']['emailAddress']
        ? window['env']['emailAddress']
        : '',
    githubProfileLink: window['env'] && window['env']['githubProfileLink']
        ? window['env']['githubProfileLink']
        : '',
    githubUsername: window['env'] && window['env']['githubUsername']
        ? window['env']['githubUsername']
        : '',
    linkedInProfileLink: window['env'] && window['env']['linkedInProfileLink']
        ? window['env']['linkedInProfileLink']
        : '',
    linkedInUsername: window['env'] && window['env']['linkedInUsername']
        ? window['env']['linkedInUsername']
        : '',
    backendServiceToken: window['env'] && window['env']['backendServiceToken']
        ? window['env']['backendServiceToken']
        : '',
    cvDocumentUrl: window['env'] && window['env']['cvDocumentUrl']
        ? window['env']['cvDocumentUrl']
        : '',
}
