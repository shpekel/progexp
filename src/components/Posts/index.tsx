import React, { FC } from 'react'
import './styles.sass'
import Post from '../Post'

const posts = [
    {
        title: 'JavaScript теория',
        description:
            'JavaScript – это язык программирования, который добавляет интерактивность на ваш веб-сайт (например: игры, отклик при нажатии кнопок или при вводе данных в формы, динамические стили, анимация). Эта статья поможет вам начать работать с этим захватывающим языком и даст вам представление о том, на что он способен.',
        img: ['programmer1.jpg', '89900949e098a80f8fc33964de5f52a6.jpeg']
    }
]
const Posts: FC = () => {
    return (
        <div className="posts-container">
            <div className="posts">
                {posts.map((post, index: number) => (
                    <Post title={post.title} description={post.description} img={post.img} />
                ))}
            </div>
        </div>
    )
}

export default Posts
