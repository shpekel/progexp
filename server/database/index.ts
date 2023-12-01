import mongoose, { connect } from 'mongoose'

const mongoURL: string = 'mongodb://localhost:27017/progexp'

const connectToMongoDB = async () => {
    try {
        await connect(mongoURL)
        console.log('MongoDB database is ready.')
    } catch (error) {
        console.error('MongoDB error: ', error)
    }
    return mongoose
}

export default connectToMongoDB()
