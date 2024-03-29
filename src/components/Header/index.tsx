import React, { FC, useState } from 'react'
import './styles.sass'
import Input from '../Input'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { mainActions } from '../../reducers/mainReducer'
import { ThemeType } from '../../features/enums/ThemeType'
import { Link, useLocation } from 'react-router-dom'
import Modal from '../Modal'
import Button, { ButtonStyles } from '../Button'

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.mainReducer.theme)

    const [isOpenCreatePost, setIsOpenCreatePost] = useState<boolean>(false)

    const [postTitle, setPostTitle] = useState<string>('')
    const [postDescription, setPostDescription] = useState<string>('')

    const [selectedImage, setSelectedImage] = useState(null)

    const [search, setSearch] = useState<string>('')

    let location = useLocation()

    const handleToggleTheme = () => {
        const newTheme = theme === ThemeType.Dark ? ThemeType.White : ThemeType.Dark
        dispatch(mainActions.setTheme(newTheme))

        if (newTheme === ThemeType.White) {
            document.documentElement.setAttribute('white-theme', '')
        } else document.documentElement.removeAttribute('white-theme')
    }

    const toggleClickToCreatePost = () => {
        setIsOpenCreatePost(!isOpenCreatePost)
    }

    const handleClickToCreatePost = async (event) => {
        const formData = new FormData()
        formData.append('img', selectedImage)

        const response = await fetch('http://localhost:8080/api/post/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: postTitle,
                description: postDescription,
                img: selectedImage.name
            })
        })

        const response_image = await fetch('http://localhost:8080/api/post/create/img', {
            method: 'POST',
            body: formData
        })
    }

    return (
        <>
            <div className="header">
                <div className="logo-container">
                    <div className="logo" />
                    <div className="text">Prog</div>
                    <div className="text primary">Exp</div>
                </div>
                <div className="theme-container">
                    <div className={`theme type-${theme}`} onClick={handleToggleTheme} />
                </div>
                <Input
                    style={{ width: '300px' }}
                    search
                    placeholder="Поиск..."
                    value={search}
                    setValue={setSearch}
                />
                <div className="user-container">
                    <div className="text">Stepandepala</div>
                    <div className="avatar" />
                </div>
            </div>
            <div className="navbar">
                <Link to="/">
                    <span className={location.pathname === '/' ? 'active' : ''}>Главная</span>
                </Link>
                <Link to="js">
                    <span>Теория</span>
                </Link>
                <Link to="forum">
                    <span>Форум</span>
                </Link>
                <Link to="question">
                    <span>Задать вопрос</span>
                </Link>
                <a onClick={toggleClickToCreatePost}>
                    <span>Создать пост</span>
                </a>
                <Link to="messages">
                    <span>Сообщения</span>
                </Link>
                <Link to="">
                    <span>Случайная статья</span>
                </Link>
            </div>
            <Modal
                isOpen={isOpenCreatePost}
                onClose={toggleClickToCreatePost}
                title="Создание поста"
            >
                <div className="label">
                    <div className="description">Название поста:</div>
                    <Input
                        placeholder="Например: Документация JavaScript"
                        noAnim
                        value={postTitle}
                        setValue={setPostTitle}
                    />
                </div>
                <div className="label">
                    <div className="description">Описание:</div>
                    <Input
                        placeholder="Подумайте о чём-то, прежде чем писать сюда что-либо"
                        textArea
                        noAnim
                        value={postDescription}
                        setValue={setPostDescription}
                    />
                </div>
                <div className="label">
                    <div className="description">Загрузите сюда своё изображение:</div>
                    <input
                        type="file"
                        name="img"
                        onChange={(event) => {
                            console.log(event.target.files[0])
                            setSelectedImage(event.target.files[0])
                        }}
                    />
                </div>
                <Button
                    onClick={handleClickToCreatePost}
                    type={ButtonStyles.Secondary}
                    text="Создать"
                    style={{ marginTop: '40px' }}
                />
            </Modal>
        </>
    )
}

export default Header
