import { Document, Model, model, Schema } from 'mongoose'

interface UserData extends Document {
    id: number
    login: string
    password: string
    email: string
}

class Users extends Model<Users> {
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

    public static async createUser(userData: Users): Promise<UserData | null> {
        const lastAccount = await Users.model.findOne().sort({ id: -1 })
        const id = lastAccount ? lastAccount.id + 1 : 0

        try {
            return await Users.model.create({
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

export { Users }
