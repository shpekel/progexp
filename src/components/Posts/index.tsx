import React, { FC, useEffect, useState } from 'react'
import './styles.sass'
import Post from '../Post'
import { motion } from 'framer-motion'
const Posts: FC = () => {
    const [posts, setPosts] = useState([])

    const initPosts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/posts/getall')

            if (!response.ok) {
                throw new Error('Failed to fetch posts')
            }

            const data = await response.json()
            setPosts(data)
        } catch (error) {
            console.error(error)
            // Обработка ошибки, например, установка пустого массива в случае неудачи
            setPosts([])
        }
    }

    useEffect(() => {
        initPosts()
    }, [])

    return (
        <motion.div
            className="posts-container"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="posts">
                {Array.isArray(posts) &&
                    posts.length > 0 &&
                    posts.map((post, index: number) => (
                        <Post
                            key={index}
                            id={post.id}
                            title={post.title}
                            description={post.description}
                            img={post.img}
                        />
                    ))}
            </div>
        </motion.div>
    )
}

export default Posts
