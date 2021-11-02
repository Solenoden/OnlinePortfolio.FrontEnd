/* istanbul ignore file */

export const environment = {
    production: true,
    emailAddress: window['env'] && window['env']['emailAddress']
        ? window['env']['emailAddress']
        : '',
    githubProfileLink: window['env'] && window['env']['githubProfileLink']
        ? window['env']['githubProfileLink']
        : '',
    linkedInProfileLink: window['env'] && window['env']['linkedInProfileLink']
        ? window['env']['linkedInProfileLink']
        : '',
}
