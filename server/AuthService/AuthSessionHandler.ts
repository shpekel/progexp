import { UserData } from '../../shared/user/UserData'
import { AuthSession } from './AuthSession'

const sessionStorage = new Map<number, AuthSession>()
let idGenerator: number = 0
export class AuthSessionHandler {
    static create(): AuthSession {
        const id: number = idGenerator++
        const user = new AuthSession(id)
        sessionStorage.set(id, user)
        return user
        // user.onUserTryLogin()
    }

    static get(user: UserData): AuthSession {
        return [...sessionStorage.values()].find(
            (item: AuthSession): boolean => item.user.id === user.id
        )
    }

    static remove(id: number): void {
        if (sessionStorage.has(id)) {
            sessionStorage.delete(id)
        }
    }
}
