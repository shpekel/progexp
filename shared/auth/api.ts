export const enum AuthApi {
    SignIn = 'http://localhost:8080/api/users/get',
    SignUp = 'http://localhost:8080/api/users/add'
}

export class AuthApiClient {
    static async addUser(login: string, password: string, email: string) {
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

    static async getUser(login: string, password: string) {
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
}
