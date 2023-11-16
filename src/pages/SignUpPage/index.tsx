import React, { useState } from 'react'
import './styles.sass'
import Input from '../../components/Input'
import { SignUpSteps } from '../../features/types/AuthType'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { authActions } from '../../reducers/authReducer'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../../components/Button'

const SignInPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rePassword, setRePassword] = useState<string>('')

    const step = useAppSelector((state) => state.authReducer.signUpStep)

    const isActiveEmail = step === SignUpSteps.Second || step === SignUpSteps.Third
    const isActivePassword = step === SignUpSteps.Third || step === SignUpSteps.Fourth

    const handleClickArrow = () => {
        if (step === SignUpSteps.First) {
            dispatch(authActions.setSignUpStep(SignUpSteps.Second))
        } else if (step === SignUpSteps.Second) {
            dispatch(authActions.setSignUpStep(SignUpSteps.Third))
        } else if (step === SignUpSteps.Third) {
            dispatch(authActions.setSignUpStep(SignUpSteps.Fourth))
        }
    }

    return (
        <>
            <AnimatePresence>
                {step === SignUpSteps.Fourth && (
                    <motion.div
                        className="loading"
                        initial={{ opacity: 0, transform: 'scale(0.1)', borderRadius: '50%' }}
                        animate={{ opacity: 1, transform: 'scale(1)', borderRadius: 0 }}
                        exit={{ opacity: 0, transform: 'scale(0.1)', borderRadius: '50%' }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        <div className="circle"></div>
                        <div className="text">Загрузка...</div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="sign-in-page">
                <div className="title">Регистрация в ProgExp</div>
                <Input
                    value={username}
                    setValue={setUsername}
                    placeholder="Придумайте логин"
                    hasArrow
                    step={step}
                    setStep={handleClickArrow}
                    onClickEnter={handleClickArrow}
                    state={SignUpSteps.First}
                    signUp={step}
                />
                <Input
                    value={email}
                    setValue={setEmail}
                    placeholder="Введите свой E-mail"
                    isActive={isActiveEmail}
                    onClickEnter={handleClickArrow}
                    state={SignUpSteps.Second}
                    signUp={step}
                />
                <Input
                    value={password}
                    setValue={setPassword}
                    type="password"
                    placeholder="Придумайте пароль"
                    isActive={isActivePassword}
                    onClickEnter={handleClickArrow}
                    state={SignUpSteps.Third}
                    hasEye
                    signUp={step}
                />
                <Input
                    value={rePassword}
                    setValue={setRePassword}
                    type="password"
                    placeholder="Повторите пароль"
                    isActive={isActivePassword}
                    onClickEnter={handleClickArrow}
                    state={SignUpSteps.Third}
                    hasEye
                    signUp={step}
                    roundedBottom
                />

                <div className="footer">
                    <Button text="У меня уже есть аккаунт" />
                </div>
            </div>
        </>
    )
}

export default SignInPage
