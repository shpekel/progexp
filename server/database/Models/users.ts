import { Document, Model, model, Schema } from 'mongoose'

interface UserData extends Document {
    id: number
    login: string
    password: string
    email: string
}

class User extends Model<User> {
    private static userSchema = new Schema<UserData>({
        id: {
            type: Number,
            unique: true,
            required: true,
            default: 0
        },
        login: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        }
    })

    public static async createUser(userData: User): Promise<UserData | null> {
        const lastAccount = await User.model.findOne().sort({ id: -1 })
        const id = lastAccount ? lastAccount.id + 1 : 0

        try {
            return await User.model.create({
                ...userData,
                id: id
            })
        } catch (error) {
            console.error(error)
            return null
        }
    }

    public static model: Model<UserData> = model<UserData>('Users', this.userSchema)
}

export { User }
