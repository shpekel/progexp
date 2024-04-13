import { Document, Model, model, Schema } from 'mongoose'

interface PostData extends Document {
    id: number
    title: string
    description: string
    img: string
    dateTime: Date
    author: string
}

class Posts extends Model<Posts> {
    private static postSchema = new Schema<PostData>({
        id: {
            type: Number,
            unique: true,
            required: true,
            default: 0
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: false
        },
        dateTime: {
            type: Date,
            required: true,
            default: new Date()
        },
        author: {
            type: String,
            required: true
        }
    })

    public static async createPost(postData: Posts): Promise<PostData | null> {
        const lastPost = await Posts.model.findOne().sort({ id: -1 })
        const id = lastPost ? lastPost.id + 1 : 0

        try {
            return await Posts.model.create({
                ...postData,
                id: id
            })
        } catch (error) {
            console.error(error)
            return null
        }
    }

    public static model: Model<PostData> = model<PostData>('Posts', this.postSchema)
}

export { Posts }
