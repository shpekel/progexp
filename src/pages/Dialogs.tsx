import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import './styles.sass'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

const DialogsPage = () => {
    const [dialogs, setDialogs] = useState([])

    const id = useAppSelector((state) => state.mainReducer.id)

    const MESSAGES = [
        {
            id: 0,
            name: 'Артем Данон',
            preview: 'Привет, у меня есть вариант заработать очень много денег...'
        },
        {
            id: 1,
            name: 'Михаил Майер',
            preview: 'У меня сегодня кошка собаку родила, афигеть'
        },
        {
            id: 2,
            name: 'Тамирлан Сулейменов',
            preview: 'В хант когда? Пацаны я палец разрубил'
        },
        {
            id: 3,
            name: 'Алексей Дёкин',
            preview: 'Я вот сегодня лям поднял на бинарных ауционах'
        },
        {
            id: 4,
            name: 'Никита Братухин',
            preview: 'сегодня на эверест лазил... понравилось!'
        },
        {
            id: 5,
            name: 'Планирование выходных в горах',
            preview: 'Давайте соберемся вместе на этой...'
        },
        {
            id: 6,
            name: 'Михаил Майер',
            preview: 'У меня сегодня кошка собаку родила, афигеть'
        },
        {
            id: 7,
            name: 'Тамирлан Сулейменов',
            preview: 'В хант когда? Пацаны я палец разрубил'
        },
        {
            id: 8,
            name: 'Алексей Дёкин',
            preview: 'Я вот сегодня лям поднял на бинарных ауционах'
        },
        {
            id: 9,
            name: 'Никита Братухин',
            preview: 'сегодня на эверест лазил... понравилось!'
        }
    ]

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:8080/api/dialogs/getall/${id}`)
    //
    //             if (!response.ok) {
    //                 setDialogs([])
    //                 return
    //             }
    //
    //             const data = await response.json()
    //             setDialogs(data)
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //
    //     fetchData()
    // }, [id])

    return (
        <motion.div
            className="dialogs-page"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="dialogs">
                <div className="title">
                    <span className="text">Личные сообщения</span>
                </div>
                <ul className="dialogs-list">
                    {MESSAGES?.map((dialog, index) => (
                        <Link to={`${dialog?.id}`} key={index}>
                            <li className="dialog">
                                <div className="avatar">
                                    <div className="inner"></div>
                                </div>
                                <div className="personal-dialog">
                                    <div className="name">{dialog.name}</div>
                                    <div className="preview">{dialog.preview}</div>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </motion.div>
    )
}

export default DialogsPage
