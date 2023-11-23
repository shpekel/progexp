import express from 'express'
import cors from 'cors'
import pkg from 'body-parser'
import './database/index.js'
import Users from './database/Models/users.js'
import { apiRegister } from './api/auth/apiRegister.js'
import { apiLogin } from './api/auth/apiLogin.js'

const app = express()

const port = 8080

app.listen(port, () => {
    console.log('Сервер запущен')
})

app.use(cors())

const { json } = pkg

app.use(json())

app.post('/api/users/register', apiRegister)

app.post('/api/users/login', apiLogin)
