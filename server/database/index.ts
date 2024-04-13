import mongoose, { connect } from 'mongoose'

const mongoURL: string = 'mongodb+srv://stepanzaxarov01:AEdliADBVy8rd8pl@cluster0.ajyt0zp.mongodb.net/'

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
