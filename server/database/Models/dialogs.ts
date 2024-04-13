import { Document, Model, model, Schema } from 'mongoose'

interface DialogData extends Document {
    id: number
    sender: number
    recipient: number
    text: string
    date: Date
}

class Dialogs extends Model<Dialogs> {
    private static dialogSchema = new Schema<DialogData>({
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

    public static async createDialog(dialogData: Dialogs): Promise<DialogData | null> {
        const lastDialog = await Dialogs.model.findOne().sort({ id: -1 })
        const id = lastDialog ? lastDialog.id + 1 : 0

        try {
            return await Dialogs.model.create({
                ...dialogData,
                id: id
            })
        } catch (error) {
            console.error(error)
            return null
        }
    }

    public static model: Model<DialogData> = model<DialogData>('Dialogs', this.dialogSchema)
}

export { Dialogs }
