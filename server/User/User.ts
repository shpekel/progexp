import { UserData } from '../../shared/user/UserData'

export class User {
    private readonly _id: number
    private readonly _user: UserData

    constructor(id: number, user: UserData) {
        this._id = id
        this._user = user
    }

    get id(): number {
        return this._id
    }

    get user(): UserData {
        return this._user
    }
}
