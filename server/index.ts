import express, { Express } from 'express'
import cors from 'cors'
import pkg from 'body-parser'
import './database'
// import { AuthController } from './AuthService/controller'
import { Users as UsersModel } from './database/Models/users'
import { Posts as PostsModel } from './database/Models/posts'
// import { Dialogs as DialogsModel } from './database/Models/dialogs'
import { Messages as MessagesModel } from './database/Models/messages'
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

// app.post('/api/users/add', AuthController.addUser)

app.post('/api/users/get', async (req: any, res: any) => {
    try {
        const { login, password } = req.body

        const account = await UsersModel.model.findOne({
            login: login,
            password: password
        })

        if (account) {
            res.status(200).json({
                message: 'Successful authorization',
                id: account.id
            })
        } else {
            res.status(400).json({
                error: 'User not found'
            })
        }
    } catch (error) {
        console.error(error)
    }
})

app.get('/api/posts/getall', async (req: any, res: any) => {
    try {
        const posts = await PostsModel.model.find()

        res.json(posts)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

app.get('/api/post/get/:id', async (req, res) => {
    try {
        const id = req.params.id
        const post = await PostsModel.model.findOne({
            id: id
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
            author: 'Xyesos',
            title: title,
            description: description,
            img: img
        })

        res.status(201).json({ message: `Post '${title}' has been created` })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

app.post('/api/post/create/img', upload.single('img'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' })
    }

    res.status(200).json({ message: 'Image uploaded successfully' })
})

app.post('/api/post/delete', async (req: any, res: any) => {
    try {
        const { id } = req.body

        const deletePost = await PostsModel.model.findOneAndDelete({
            id: id
        })

        res.status(201).json({ message: `Post ${id} has been deleted` })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

app.post('/api/post/edit', async (req: any, res: any) => {
    try {
        const { title, description, img, id } = req.body
        const newPost = await PostsModel.model.findOneAndReplace(
            {
                id: id
            },
            { title: title, description: description, img: img }
        )

        res.status(201).json({ message: `Post '${id}' has been updated` })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

app.get('/api/dialogs/getall/:id', async (req, res) => {
    try {
        const userId = req.params.id

        // Находим все сообщения, в которых участвует данный пользователь
        const userMessages = await MessagesModel.model.find({
            $or: [{ sender: userId }, { recipient: userId }]
        })

        console.log(userMessages)
        console.log('/////////////////////////')

        // Создаем объект для хранения диалогов
        const dialogs = {}

        // Перебираем сообщения и формируем диалоги
        userMessages.forEach((message) => {
            // Идентификатор собеседника (если отправитель текущий пользователь, то получатель, и наоборот)
            const interlocutorId =
                message.sender.toString() === userId ? message.recipient : message.sender
            // Идентификатор диалога (используем конкатенацию и сортировку идентификаторов для уникальности)
            const dialogId = [userId, interlocutorId].sort().join('-')

            // Добавляем сообщение в соответствующий диалог
            if (!dialogs[dialogId]) {
                dialogs[dialogId] = []
            }
            dialogs[dialogId].push(message)
        })

        // Преобразуем объект диалогов в массив
        const dialogArray = Object.keys(dialogs).map((dialogId) => ({
            dialogId,
            messages: dialogs[dialogId]
        }))

        res.json(dialogArray)
    } catch (error) {
        console.error('Error fetching dialogs:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.get('/api/messages/get/:id', async (req, res) => {
    try {
        const userId = req.params.id
        // Найти все сообщения, где отправитель или получатель равен userId
        const messages = await MessagesModel.model
            .find({
                $or: [{ sender: userId }, { recipient: userId }]
            })
            .sort({ createdAt: 'asc' })

        // Формирование объекта диалога
        const dialog = {}
        messages.forEach((message: any) => {
            const counterpartId = message.sender === userId ? message.recipient : message.sender
            if (!dialog[counterpartId]) {
                dialog[counterpartId] = []
            }
            dialog[counterpartId].push({
                sender: message.sender,
                recipient: message.recipient,
                text: message.text,
                createdAt: message.createdAt
            })
        })

        res.json(dialog)
    } catch (error) {
        console.error('Error fetching messages:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
