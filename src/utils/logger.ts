/**
 * Logger utility for development and production
 * Prevents sensitive information leaks in production
 */

const isDevelopment = import.meta.env.MODE !== 'production'

const logger = {
    error: (error: any, context?: string) => {
        if (isDevelopment) {
            if (context) {
                console.error(`[${context}]`, error)
            } else {
                console.error(error)
            }
        }
        // TODO: In production, send to error tracking service (e.g., Sentry)
        // if (!isDevelopment) {
        //     Sentry.captureException(error)
        // }
    },

    warn: (message: string, data?: any) => {
        if (isDevelopment) {
            console.warn(message, data)
        }
    },

    info: (message: string, data?: any) => {
        if (isDevelopment) {
            console.log(message, data)
        }
    },

    debug: (message: string, data?: any) => {
        if (isDevelopment) {
            console.debug(message, data)
        }
    }
}

export default logger
