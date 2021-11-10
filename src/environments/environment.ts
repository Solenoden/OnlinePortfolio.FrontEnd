/* istanbul ignore file */

export const environment = {
    production: false,
    emailAddress: window['env'] && window['env']['emailAddress']
        ? window['env']['emailAddress']
        : 'gavin.debruyn1@gmail.com',
    githubProfileLink: window['env'] && window['env']['githubProfileLink']
        ? window['env']['githubProfileLink']
        : 'https://github.com/Solenoden',
    linkedInProfileLink: window['env'] && window['env']['linkedInProfileLink']
        ? window['env']['linkedInProfileLink']
        : 'https://www.linkedin.com/in/gavin-de-bruyn-1a8692182/',
    backendUrl: window['env'] && window['env']['backendUrl']
        ? window['env']['backendUrl']
        : 'https://online-portfolio-backend-dev.herokuapp.com',
}
