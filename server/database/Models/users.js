import { model } from 'mongoose'
import { Schema } from 'mongoose'

const userSchema = new Schema({
    login: String,
    password: String,
    email: String
})

export default model('Users', userSchema)
