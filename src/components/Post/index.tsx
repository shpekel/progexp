import React, { FC, useState } from 'react'
import './styles.sass'

interface PostProps {
    title: string
    description: string
    img: string[]
}
const Post: FC<PostProps> = ({ title, description, img }) => {
    const imgLength = img.length
    const [currentImg, setCurrentImg] = useState(0)

    const handleClickLeft = () => {
        setCurrentImg((prevState: number) => Math.max(prevState - 1, 0))
    }

    const handleClickRight = () => {
        setCurrentImg((prevState: number) => Math.min(prevState + 1, imgLength - 1))
    }

    return (
        <div className="post">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
            <div className="images-container">
                <div className="buttons">
                    <div className="button" onClick={handleClickLeft}></div>
                    <div className="button" onClick={handleClickRight}>
                        2
                    </div>
                </div>
                <div className="images" style={{ right: currentImg * 100 + '%' }}>
                    {img.map((img: string, index: number) => (
                        <img
                            src={`../../../../posts/assets/images/${img}`}
                            alt="Нет картинки"
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post
