import React, { FC } from 'react'
import './styles.sass'
import Button, { ButtonStyles } from '../Button'
import { Link } from 'react-router-dom'

interface PostProps {
    id: number
    title: string
    description: string
    img: string
}
const Post: FC<PostProps> = ({ id, title, description, img }) => {
    return (
        <div className="post">
            <div className="title">{title}</div>
            <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
            <div className="images-container">
                <img src={`../../../../posts/assets/images/${img}`} alt="Нет картинки" />
            </div>
            <Link to={`post/${id}`}>
                <Button
                    style={{ marginTop: '20px' }}
                    type={ButtonStyles.Primary}
                    text="Перейти к посту"
                />
            </Link>
        </div>
    )
}

export default Post
