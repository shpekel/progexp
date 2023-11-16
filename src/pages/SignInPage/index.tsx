import React, { useState } from 'react'
import './styles.sass'
import Input from '../../components/Input'
import { SignInSteps } from '../../features/types/AuthType'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { authActions } from '../../reducers/authReducer'
import Checkbox from '../../components/Checkbox'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../../components/Button'

const SignInPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isRememberMe, setIsRememberMe] = useState<boolean>(true)

    const step = useAppSelector((state) => state.authReducer.signInStep)

    const handleClickArrow = () => {
        if (step === SignInSteps.First) {
            dispatch(authActions.setSignInStep(SignInSteps.Second))
        } else if (step === SignInSteps.Second) {
            dispatch(authActions.setSignInStep(SignInSteps.Third))
        }
    }

    return (
        <>
            <AnimatePresence>
                {step === SignInSteps.Third && (
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
                <div className="title">Войдите в ProgExp</div>
                <Input
                    value={username}
                    setValue={setUsername}
                    placeholder="Введите логин"
                    hasArrow
                    step={step}
                    setStep={handleClickArrow}
                    onClickEnter={handleClickArrow}
                    state={SignInSteps.First}
                    signIn={step}
                />
                <Input
                    value={password}
                    setValue={setPassword}
                    type="password"
                    placeholder="Введите пароль"
                    isActive={step !== SignInSteps.First}
                    onClickEnter={handleClickArrow}
                    state={SignInSteps.Second}
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
                    <Button text="У меня уже есть аккаунт" />
                </div>
            </div>
        </>
    )
}

export default SignInPage
