import express, { Express } from 'express'
import cors from 'cors'
import pkg from 'body-parser'
import './database'
import { AuthController } from './AuthService/controller'
import { Posts as PostsModel } from './database/Models/posts'
import multer from 'multer'
import path from 'node:path'

const app: Express = express()

const port: number = 8080

app.listen(port, () => {
    console.log('Сервер запущен')
})

app.use(cors())

const { json } = pkg

app.use(json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../public/posts/assets/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

app.use('/uploads', express.static(path.join(__dirname, '../../public/posts/assets/images')))

app.post('/api/users/add', AuthController.addUser)

app.post('/api/users/get', AuthController.getUser)

app.get('/api/posts/getall', async (req: any, res: any) => {
    try {
        const posts = await PostsModel.model.find()
        res.json(posts)
    } catch (error) {
        res.status(500).json({
            error: 'ERROR'
        })
    }
})

app.get('/api/post/get/:id', async (req, res) => {
    try {
        const postId = req.params.id
        const post = await PostsModel.model.findOne({
            id: postId
        })

        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        }

        res.json(post)
    } catch (error) {
        console.error('Error fetching post:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.post('/api/post/create', async (req: any, res: any) => {
    try {
        const { title, description, img } = req.body

        const newPost = await PostsModel.createPost({
            title: title,
            description: description,
            img: img
        })

        res.status(201).json({ message: 'Post.tsx has been created' })
    } catch (error) {
        res.status(500).json({
            error: 'ERROR'
        })
    }
})

app.post('/api/post/create/img', upload.single('img'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' })
    }

    res.status(200).json({ message: 'Image uploaded successfully' })
})
