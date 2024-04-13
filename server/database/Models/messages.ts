import { Document, Model, model, Schema } from 'mongoose'

interface MessageData extends Document {
    id: number
    sender: number
    recipient: number
    text: string
    date: Date
}

class Messages extends Model<Messages> {
    private static messageSchema = new Schema<MessageData>({
        id: {
            type: Number,
            unique: true,
            required: true,
            default: 0
        },
        sender: {
            type: Number,
            required: true
        },
        recipient: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: new Date()
        }
    })

    public static async createMessage(messageData: Messages): Promise<MessageData | null> {
        const lastMessage = await Messages.model.findOne().sort({ id: -1 })
        const id = lastMessage ? lastMessage.id + 1 : 0

        try {
            return await messageData.model.create({
                ...messageData,
                id: id
            })
        } catch (error) {
            console.error(error)
            return null
        }
    }

    public static model: Model<MessageData> = model<MessageData>('Messages', this.messageSchema)
}

export { Messages }
