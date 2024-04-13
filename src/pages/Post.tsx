import React, { useEffect, useState } from 'react'
import './styles.sass'
import { Link, useParams } from 'react-router-dom'
// @ts-ignore
import anonymous from '../assets/images/anonymous.svg'
// @ts-ignore
import quill from '../assets/images/quill.svg'
import Button, { ButtonStyles } from '../components/Button'
import { motion } from 'framer-motion'

export type PostData = {
    title: string
    description: string
    img: string
    dateTime: string
    author: string
}

const Post = () => {
    const { id } = useParams()

    const [post, setPost] = useState<PostData>()

    const handleClickToDelete = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/post/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/post/get/${id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch posts')
                }

                const data = await response.json()
                setPost(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return (
        <motion.div
            className="post-page"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {post && (
                <div className="content">
                    <div className="post-data">
                        <label className="author">
                            <img src={anonymous} alt="Автор" className="icon" />
                            <span className="text">{post.author}</span>
                        </label>
                        <label className="date">
                            <img src={quill} alt="Ошибка" className="icon" />
                            <span className="text">
                                {`${new Date(post.dateTime).getHours()}:${new Date(
                                    post.dateTime
                                ).getMinutes()} ` +
                                    `${new Date(post.dateTime).getDate()}.${
                                        new Date(post.dateTime).getMonth() + 1
                                    }.${new Date(post.dateTime).getFullYear()}`}
                            </span>
                        </label>
                    </div>
                    <div className="title">{post.title}</div>
                    <div
                        className="description"
                        dangerouslySetInnerHTML={{ __html: post.description }}
                    />
                    <img
                        src={`../../../../posts/assets/images/${post.img}`}
                        alt="Нет картинки"
                        className="img"
                    />
                    <div className="footer">
                        <div className="btn-container">
                            <Link to="edit">
                                <Button
                                    onClick={null}
                                    text="Редактировать"
                                    type={ButtonStyles.Interactive}
                                />
                            </Link>
                        </div>
                        <div className="btn-container square">
                            <Button onClick={handleClickToDelete} type={ButtonStyles.Red} />
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default Post
