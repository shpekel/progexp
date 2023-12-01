import express, { Express } from 'express'
import cors from 'cors'
import pkg from 'body-parser'
import './database'
import { AuthSessionHandler } from "./AuthService/AuthSessionHandler";
import { AuthSession } from "./AuthService/AuthSession";

const app: Express = express()

const port: number = 8080

app.listen(port, () => {
    console.log('Сервер запущен')
})

app.use(cors())

const { json } = pkg

app.use(json())

app.post('/api/users/register', {
    const authSession = AuthSessionHandler.get(...)
    authSession.onPlayerTryRegister
})

app.post('/api/users/login', apiLogin)
