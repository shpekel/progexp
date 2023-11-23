import { AuthApi } from './api'

export const signin = async (login: string, password: string) => {
    await fetch(AuthApi.SignIn, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login,
            password
        })
    })
        .then((res) => console.log(res))
        .catch((error) => {
            console.error(error)
        })
}
