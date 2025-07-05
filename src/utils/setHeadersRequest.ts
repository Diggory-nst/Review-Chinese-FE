
const setHeadersRequest = () => {

    // Retrieve Token from LocalStorage
    const client_id = localStorage.getItem('client_id')
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    // Set headers requets
    const headers = {
        "Content-Type": 'application/json',
        "x-client-id": client_id,
        "authorization": accessToken,
        "x-rtoken-id": refreshToken
    }

    return headers
}

export default setHeadersRequest;