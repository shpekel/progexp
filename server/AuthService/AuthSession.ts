import { AuthStatus } from './AuthStatus'
import { UserData } from '../../shared/user/UserData'
import { User } from '../database/Models/users'
import { UserHandler } from '../User/UserHandler'

export class AuthSession {
    readonly id: number
    private status: AuthStatus
    public user: User
    private flood: number

    constructor(id: number, user: UserData) {
        this.id = id
        this.user = user
        this.flood = 0
    }

    private startSession(): void {}

    private finishSession(): void {}

    async onUserTryLogin(request: any, response: any): Promise<void> {
        try {
            const { login, password } = request.body

            const user = await User.model.findOne({
                login: login,
                password: password
            })

            if (user) {
                response.status(200).json({
                    message: 'Successful authorization'
                })

                this.successAuth(user)
            } else {
                response.status(400).json({
                    error: 'User not found'
                })
            }
        } catch (error) {
            console.log(error)
            response.status(500).json({
                error: 'ERROR'
            })
        }
    }

    async onUserTryRegister(request: any, response: any): Promise<void> {
        try {
            const { login, password, email } = request.body

            const newUser = await User.createUser({
                login: login,
                password: password,
                email: email
            })

            this.successAuth(newUser)

            response.status(201).json({ message: 'User has been created' })
        } catch (error) {
            console.log(error)
            response.status(500).json({ error: 'ERROR' })
        }
    }

    successAuth(userModelInstance: UserData): void {
        this.user = UserHandler.create(userModelInstance.id, {
            id: userModelInstance.id,
            login: userModelInstance.login,
            password: userModelInstance.password,
            email: userModelInstance.email
        })

        this.finishSession()
    }
}
