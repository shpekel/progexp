import { AuthSessionHandler } from './AuthSessionHandler'
import { AuthSession } from './AuthSession'

export class AuthController {
    static addUser(req: any, res: any): void {
        const newUser: AuthSession = AuthSessionHandler.create()
        newUser.onUserTryRegister(req, res).then()
    }

    static getUser(req: any, res: any): void {
        const user: AuthSession = AuthSessionHandler.create()
        user.onUserTryLogin(req, res).then()
    }
}
