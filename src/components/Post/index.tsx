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
    const sentences = description.split('. ')

    // Берем только первые 2-3 предложения
    const previewSentences = sentences.slice(0, 2) // Измените на 3, если вам нужно 3 предложения

    // Объединяем предложения обратно в строку
    const previewText = previewSentences.join('. ') + '.'
    // const imgLength = img.length
    // const [currentImg, setCurrentImg] = useState(0)

    // const handleClickLeft = () => {
    //     setCurrentImg((prevState: number) => Math.max(prevState - 1, 0))
    // }
    //
    // const handleClickRight = () => {
    //     setCurrentImg((prevState: number) => Math.min(prevState + 1, imgLength - 1))
    // }

    return (
        <div className="post">
            <div className="title">{title}</div>
            <div className="description">{previewText}</div>
            <div className="images-container">
                {/*<div className="buttons">*/}
                {/*    <div className="button" onClick={handleClickLeft}></div>*/}
                {/*    <div className="button" onClick={handleClickRight}>*/}
                {/*        2*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="images" style={{ right: currentImg * 100 + '%' }}>*/}
                {/*    {img.map((img: string, index: number) => (*/}
                <img
                    src={`../../../../posts/assets/images/${img}`}
                    alt="Нет картинки"
                    // key={index}
                />
                {/*    ))}*/}
                {/*</div>*/}
            </div>
            <Link to={`/post/${id}`}>
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
