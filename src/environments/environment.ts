/* istanbul ignore file */

export const environment = {
    production: false,
    backendUrl: window['env'] && window['env']['backendUrl']
        ? window['env']['backendUrl']
        : 'https://online-portfolio-backend-dev.herokuapp.com',
    emailAddress: window['env'] && window['env']['emailAddress']
        ? window['env']['emailAddress']
        : 'gavin.debruyn1@gmail.com',
    githubProfileLink: window['env'] && window['env']['githubProfileLink']
        ? window['env']['githubProfileLink']
        : 'https://github.com/Solenoden',
    githubUsername: window['env'] && window['env']['githubUsername']
        ? window['env']['githubUsername']
        : 'Solenoden',
    linkedInProfileLink: window['env'] && window['env']['linkedInProfileLink']
        ? window['env']['linkedInProfileLink']
        : 'https://www.linkedin.com/in/gavin-de-bruyn-1a8692182/',
    linkedInUsername: window['env'] && window['env']['linkedInUsername']
        ? window['env']['linkedInUsername']
        : 'Gavin de Bruyn',
    backendServiceToken: window['env'] && window['env']['backendServiceToken']
        ? window['env']['backendServiceToken']
        : '',
}
