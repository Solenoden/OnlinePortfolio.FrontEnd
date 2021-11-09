/* istanbul ignore file */

(function(window) {
    window.env = window.env || {}

    // Environment variables
    window['env']['emailAddress'] = '${EMAIL_ADDRESS}'
    window['env']['githubProfileLink'] = '${GITHUB_PROFILE_LINK}'
    window['env']['linkedInProfileLink'] = '${LINKED_IN_PROFILE_LINK}'
    window['env']['backendUrl'] = '${BACKEND_URL}'
})(this)
