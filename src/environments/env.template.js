/* istanbul ignore file */

(function(window) {
    window.env = window.env || {}

    // Environment variables
    window['env']['backendUrl'] = '${BACKEND_URL}'
    window['env']['emailAddress'] = '${EMAIL_ADDRESS}'
    window['env']['githubProfileLink'] = '${GITHUB_PROFILE_LINK}'
    window['env']['githubUsername'] = '${GITHUB_USERNAME}'
    window['env']['linkedInProfileLink'] = '${LINKED_IN_PROFILE_LINK}'
    window['env']['linkedInUsername'] = '${LINKED_IN_USERNAME}'
    window['env']['backendServiceToken'] = '${BACKEND_SERVICE_TOKEN}'
})(this)
