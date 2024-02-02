import React, { FC } from 'react'
import './styles.sass'
import Input from '../Input'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { mainActions } from '../../reducers/mainReducer'
import { ThemeType } from '../../features/enums/ThemeType'
import { Link, useLocation } from 'react-router-dom'

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.mainReducer.theme)

    let location = useLocation()

    const handleToggleTheme = () => {
        const newTheme = theme === ThemeType.Dark ? ThemeType.White : ThemeType.Dark
        dispatch(mainActions.setTheme(newTheme))

        if (newTheme === ThemeType.White) {
            document.documentElement.setAttribute('white-theme', '')
        } else document.documentElement.removeAttribute('white-theme')
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
                <Input style={{ width: '300px' }} search placeholder="Поиск..." />
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
                <Link to="messages">
                    <span>Сообщения</span>
                </Link>
                <Link to="">
                    <span>Случайная статья</span>
                </Link>
            </div>
        </>
    )
}

export default Header
