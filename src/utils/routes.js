import pathToRegexp from 'path-to-regexp'

const routes = {
    index: '/',
    dashboard: '/dashboard/',
    clients: '/clients/',
    transactions: '/transactions/',
}

const buildUrl = (template, params) => {
    params = params || {}
    const toPath = pathToRegexp.compile(template)
    return toPath(params)
}

export {
    buildUrl,
}

export default routes
