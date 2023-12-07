import express, { Express } from 'express'
import cors from 'cors'
import pkg from 'body-parser'
import './database'
import { AuthController } from './AuthService/controller'

const app: Express = express()

const port: number = 8080

app.listen(port, () => {
    console.log('Сервер запущен')
})

app.use(cors())

const { json } = pkg

app.use(json())

app.post('/api/users/add', AuthController.addUser)

app.post('/api/users/get', AuthController.getUser)
