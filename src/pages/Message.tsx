import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import './styles.sass'
import { Link, useParams } from 'react-router-dom'
import Input from '../components/Input'

const MessagePage = () => {
    const { id } = useParams()

    const [messages, setMessages] = useState([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:8080/api/messages/get/${id}`)
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch posts')
    //             }
    //
    //             const data = await response.json()
    //             setMessages(data)
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //
    //     fetchData()
    // }, [])

    const MESSAGES = [
        {
            id: 0,
            author: 'Артём Данон',
            text: 'прьветт, я сиводня выйграл мерседес'
        },
        {
            id: 1,
            author: 'Артём Данон',
            text: 'кагда в вальхейм???'
        },
        {
            id: 2,
            author: 'Степан Захаров',
            text: 'НИКОГДА'
        },
        {
            id: 3,
            author: 'Степан Захаров',
            text: 'ВАЛЬХЕЙМА БОЛЬШЕ НЕ БУДЕТ!!!!'
        }
    ]

    return (
        <motion.div
            className="messages-page"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="messages">
                <div className="title">
                    <span className="text">Артём Данон</span>
                </div>
                <ul className="messages-list">
                    {MESSAGES.map((message, index) => (
                        <Link to={`${message.id}`} key={index}>
                            <li
                                className={`message ${
                                    message.author !== 'Степан Захаров' ? 'left' : 'right'
                                }`}
                            >
                                <div className="avatar">
                                    <div className="inner"></div>
                                </div>
                                <div className="personal-message">
                                    <div className="name">{message.author}</div>
                                    <div className="preview">{message.text}</div>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
                <Input />
            </div>
        </motion.div>
    )
}

export default MessagePage
