const getAxiosErrorMessage = (error: any, fallbackMessage = 'An error occurred') => {
    if (error?.response?.data?.message) {
        return error.response.data.message
    }

    if (error?.request) {
        return 'Can not connect to server'
    }

    if (error?.message) {
        return error.message
    }

    return fallbackMessage
}

export default getAxiosErrorMessage

