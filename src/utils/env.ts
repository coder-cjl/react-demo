export const isDev = import.meta.env.MODE === 'development'
export const isDebug = window.location.search.includes('debug=true')
export const showVConsole = isDev || isDebug
