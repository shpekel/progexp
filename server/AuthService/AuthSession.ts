import { AuthStatus } from './AuthStatus'
import { UserData } from '../../shared/user/UserData'
import { User } from '../database/Models/users'
import { UserHandler } from '../User/UserHandler'

export class AuthSession {
    readonly id: number
    private status: AuthStatus
    public user: User
    private flood: number

    constructor(id: number) {
        this.id = id
        this.flood = 0
    }

    private startSession(): void {}

    private finishSession(): void {}

    async onUserTryLogin(req: any, res: any): Promise<void> {
        this.flood++

        if (this.flood > 4) {
            res.status(400).json({
                error: 'Превышено количество попыток входа'
            })
        }

        try {
            const { login, password } = req.body
            console.log(req)

            const user = await User.model.findOne({
                login: login,
                password: password
            })

            if (user) {
                res.status(200).json({
                    message: 'Successful authorization'
                })

                this.successAuth(user)
            } else {
                res.status(400).json({
                    error: 'User not found'
                })
            }
        } catch (error) {
            res.status(500).json({
                error: 'ERROR'
            })
        }
    }

    async onUserTryRegister(req: any, res: any): Promise<void> {
        this.flood++

        if (this.flood > 4) {
            res.status(400).json({
                error: 'Превышено количество попыток регистрации'
            })
        }

        try {
            const { login, password, email } = req.body

            const newUser = await User.createUser({
                login: login,
                password: password,
                email: email
            })

            this.successAuth(newUser)

            res.status(201).json({ message: 'User has been created' })
        } catch (error) {
            res.status(500).json({ error: 'ERROR' })
        }
    }

    private successAuth(userModelInstance: UserData): void {
        this.user = UserHandler.create(userModelInstance.id, {
            id: userModelInstance.id,
            login: userModelInstance.login,
            password: userModelInstance.password,
            email: userModelInstance.email
        })

        this.finishSession()
    }
}
