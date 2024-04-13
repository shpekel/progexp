import React, { useState } from 'react'
import './styles.sass'
import Input from '../components/Input'
import { Steps } from '../features/enums/AuthType'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { authActions } from '../reducers/authReducer'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { validateAndSendNotify } from '../../shared/auth/validateAndSendNotify'
import { AuthValidationRegExps } from '../../shared/auth/validationRegExps'
import { motion } from 'framer-motion'
import { NotificationTypes } from '../../shared/notify/types'
import { mainActions } from '../reducers/mainReducer'

const SignInPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isRememberMe, setIsRememberMe] = useState<boolean>(true)

    const step = useAppSelector((state) => state.authReducer.step)

    const { loginRegExps, passwordRegExps } = AuthValidationRegExps

    const handleClick = async () => {
        switch (step) {
            case Steps.First: {
                if (
                    !(
                        !validateAndSendNotify(
                            !loginRegExps.Length.test(login),
                            'Слишком короткий логин'
                        ) ||
                        !validateAndSendNotify(
                            !loginRegExps.AllowedChars.test(login),
                            'Какие-то непонятные буквы'
                        )
                    )
                ) {
                    dispatch(authActions.setStep(Steps.Second))
                }
                break
            }
            case Steps.Second: {
                if (
                    validateAndSendNotify(
                        !passwordRegExps.AllowedChars.test(password),
                        'Какой-то маленький и непонятный пароль'
                    )
                ) {
                    try {
                        const response = await fetch('http://localhost:8080/api/users/get', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                login,
                                password
                            })
                        })

                        if (response.ok) {
                            //@ts-ignore
                            window.sendNotify({
                                type: NotificationTypes.Success,
                                text: 'Добро пожаловать!',
                                duration: 5
                            })

                            if (isRememberMe) {
                                localStorage.setItem('rememberMe', 'true')
                                localStorage.setItem('login', login)
                                localStorage.setItem('password', password)
                            } else {
                                localStorage.removeItem('rememberMe')
                                localStorage.removeItem('login')
                                localStorage.removeItem('password')
                            }
                            dispatch(mainActions.setIsAuth(true))

                            navigate('/')
                        } else {
                            //@ts-ignore
                            window.sendNotify({
                                type: NotificationTypes.Error,
                                text: 'Попробуй ещё раз',
                                duration: 5
                            })
                            dispatch(authActions.setStep(Steps.First))
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
                break
            }
        }
    }

    const handleClickToSignUp = () => {
        dispatch(authActions.setStep(Steps.First))

        setLogin('')
        setPassword('')
    }

    return (
        <motion.div
            className="sign-in-page"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="content">
                <div className="title">Войдите в ProgExp</div>
                <Input
                    value={login}
                    setValue={setLogin}
                    placeholder="Введите логин"
                    hasArrow
                    step={step}
                    setStep={handleClick}
                    onClickEnter={handleClick}
                    state={Steps.First}
                    signIn={step}
                />
                <Input
                    value={password}
                    setValue={setPassword}
                    type="password"
                    placeholder="Введите пароль"
                    isActive={step !== Steps.First}
                    onClickEnter={handleClick}
                    state={Steps.Second}
                    hasEye
                    signIn={step}
                />
                <Checkbox
                    text="Запомнить меня"
                    checked={isRememberMe}
                    setChecked={setIsRememberMe}
                    style={{ marginTop: '10px' }}
                />
                <div className="footer">
                    <Link to="/sign-up">
                        <Button
                            text="У меня нет аккаунта"
                            onClick={handleClickToSignUp}
                            style={{ marginTop: '25px' }}
                        />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default SignInPage
