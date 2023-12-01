import { User } from './User'
import { UserData } from '../../shared/user/UserData'

const userStorage = new Map<number, User>()

export class UserHandler {
    static create(id: number, user: UserData): User {
        const _user: User = new User(id, user)
        userStorage.set(id, _user)
        return _user
    }

    static get(id: number): User {
        return userStorage.get(id)
    }

    static getByUser(user: UserData) {
        return [...userStorage.values()].find((item: User): boolean => item.user.id === user.id)
    }

    static remove(id: number) {
        if (userStorage.has(id)) {
            userStorage.delete(id)
        }
    }
}
