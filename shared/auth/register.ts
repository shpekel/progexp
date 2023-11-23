import { AuthApi } from './api'

export const register = async (login: string, password: string, email: string) => {
    await fetch(AuthApi.SignUp, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login,
            password,
            email
        })
    }).catch((error) => {
        console.error(error)
    })
}
