import React, { FC, useEffect, useState } from 'react'
import './styles.sass'
import Post from '../Post'
import Button from '../Button'

// const posts = [
//     {
//         title: 'JavaScript теория',
//         description:
//             'JavaScript – это язык программирования, который добавляет интерактивность на ваш веб-сайт (например: игры, отклик при нажатии кнопок или при вводе данных в формы, динамические стили, анимация). Эта статья поможет вам начать работать с этим захватывающим языком и даст вам представление о том, на что он способен.',
//         img: ['programmer1.jpg', '89900949e098a80f8fc33964de5f52a6.jpeg']
//     },
//     {
//         title: 'JavaScript теория',
//         description:
//             'JavaScript – это язык программирования, который добавляет интерактивность на ваш веб-сайт (например: игры, отклик при нажатии кнопок или при вводе данных в формы, динамические стили, анимация). Эта статья поможет вам начать работать с этим захватывающим языком и даст вам представление о том, на что он способен.',
//         img: ['programmer1.jpg', '89900949e098a80f8fc33964de5f52a6.jpeg']
//     }
// ]
const Posts: FC = () => {
    const [posts, setPosts] = useState<any[]>([])

    const initPosts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/posts/getall')

            if (!response.ok) {
                throw new Error('Failed to fetch posts')
            }

            const data = await response.json()
            setPosts(data)
            console.log(data)
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
        <div className="posts-container">
            <div className="posts">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post, index: number) => (
                        <Post
                            key={index}
                            id={post.id}
                            title={post.title}
                            description={post.description}
                            img={post.img}
                        />
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
        </div>
    )
}

export default Posts
