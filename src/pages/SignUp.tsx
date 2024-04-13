import React, { useEffect, useRef, useState } from 'react'
import './styles.sass'
import Input from '../components/Input'
import { Steps } from '../features/enums/AuthType'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { authActions } from '../reducers/authReducer'
import { AuthValidationRegExps } from '../../shared/auth/validationRegExps'
import Button from '../components/Button'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Link } from 'react-router-dom'
import { validateAndSendNotify } from '../../shared/auth/validateAndSendNotify'
import { AuthApiClient } from '../../shared/auth/api'
import { notifiesActions } from '../reducers/notifyesReducer'
import { motion } from 'framer-motion'

const SignInPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const nodeRef = useRef<HTMLDivElement>(null)

    const [login, setLogin] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rePassword, setRePassword] = useState<string>('')
    const [rollingEye, setRollingEye] = useState<boolean>(false)

    const step = useAppSelector((state) => state.authReducer.step)

    const isActiveEmail = step === Steps.Second || step === Steps.Third || step === Steps.Fourth
    const isActivePassword = step === Steps.Third || step === Steps.Fourth

    const { loginRegExps, passwordRegExps, emailRegExps } = AuthValidationRegExps

    const handleClick = () => {
        switch (step) {
            case Steps.First: {
                if (
                    !(
                        !validateAndSendNotify(!loginRegExps.Length.test(login), 'Invalid Error') ||
                        !validateAndSendNotify(
                            !loginRegExps.AllowedChars.test(login),
                            'Invalid Chars'
                        )
                    )
                ) {
                    dispatch(authActions.setStep(Steps.Second))
                }
                break
            }
            case Steps.Second: {
                if (
                    validateAndSendNotify(!emailRegExps.AllowedChars.test(email), 'Invalid Chars')
                ) {
                    dispatch(authActions.setStep(Steps.Third))
                }
                break
            }
            case Steps.Third: {
                if (
                    !(
                        !validateAndSendNotify(
                            !passwordRegExps.Length.test(password),
                            'Invalid Error'
                        ) ||
                        !validateAndSendNotify(
                            !passwordRegExps.AllowedChars.test(password),
                            'Invalid Chars'
                        ) ||
                        !validateAndSendNotify(password !== rePassword, 'Invalid Chars')
                    )
                ) {
                    dispatch(authActions.setStep(Steps.Fourth))
                    AuthApiClient.addUser(login, password, email)
                }
                break
            }
        }
    }

    const handleClickToSignIn = () => {
        dispatch(authActions.setStep(Steps.First))

        setLogin('')
        setPassword('')
        setRePassword('')
        setEmail('')
    }

    useEffect(() => {
        if (step === Steps.Third) {
            setTimeout(() => {
                setRollingEye(true)
            }, 500)
        }
    }, [step])

    return (
        <motion.div
            className="sign-up-page"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="content">
                <div className="title">Регистрация в ProgExp</div>
                <Input
                    value={login}
                    setValue={setLogin}
                    placeholder="Придумайте логин"
                    hasArrow
                    step={step}
                    setStep={handleClick}
                    onClickEnter={handleClick}
                    state={Steps.First}
                    signUp={step}
                />
                <Input
                    value={email}
                    setValue={setEmail}
                    placeholder="Введите свой E-mail"
                    isActive={isActiveEmail}
                    onClickEnter={handleClick}
                    state={Steps.Second}
                    signUp={step}
                />
                <Input
                    value={password}
                    setValue={setPassword}
                    type="password"
                    placeholder="Придумайте пароль"
                    isActive={isActivePassword}
                    onClickEnter={handleClick}
                    state={Steps.Third}
                    hasEye
                    rollingEye={rollingEye}
                    signUp={step}
                />
                <Input
                    value={rePassword}
                    setValue={setRePassword}
                    type="password"
                    placeholder="Повторите пароль"
                    isActive={isActivePassword}
                    onClickEnter={handleClick}
                    state={Steps.Third}
                    hasEye
                    signUp={step}
                    roundedBottom
                />

                <div className="footer">
                    <Link to="/sign-in">
                        <Button
                            text="У меня уже есть аккаунт"
                            onClick={handleClickToSignIn}
                            style={{ marginTop: '45px' }}
                        />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default SignInPage
