import React, { useRef, useState } from 'react'
import './styles.sass'
import Input from '../../components/Input'
import { Steps } from '../../features/types/AuthType'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { authActions } from '../../reducers/authReducer'
import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { validateAndSendNotify } from '../../../shared/auth/validateAndSendNotify'
import { AuthValidationRegExps } from '../../../shared/auth/validationRegExps'
import { AuthApiClient } from '../../../shared/auth/api'

const SignInPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const nodeRef = useRef<HTMLDivElement>(null)

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isRememberMe, setIsRememberMe] = useState<boolean>(true)

    const step = useAppSelector((state) => state.authReducer.step)

    const { loginRegExps, passwordRegExps } = AuthValidationRegExps

    const handleClick = () => {
        console.log(login)
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
                    validateAndSendNotify(
                        !passwordRegExps.AllowedChars.test(password),
                        'Invalid Chars'
                    )
                ) {
                    dispatch(authActions.setStep(Steps.Third))
                    AuthApiClient.getUser(login, password)
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
        <SwitchTransition>
            <CSSTransition
                key="sign-in"
                nodeRef={nodeRef}
                timeout={250}
                classNames="sign-in-page"
                mountOnEnter
                unmountOnExit
            >
                {/*<AnimatePresence>*/}
                {/*    {step === Steps.Third && (*/}
                {/*        <motion.div*/}
                {/*            className="loading"*/}
                {/*            initial={{ opacity: 0, transform: 'scale(0.1)', borderRadius: '50%' }}*/}
                {/*            animate={{ opacity: 1, transform: 'scale(1)', borderRadius: 0 }}*/}
                {/*            exit={{ opacity: 0, transform: 'scale(0.1)', borderRadius: '50%' }}*/}
                {/*            transition={{ duration: 0.5, ease: 'easeInOut' }}*/}
                {/*        >*/}
                {/*            <div className="circle"></div>*/}
                {/*            <div className="text">Загрузка...</div>*/}
                {/*        </motion.div>*/}
                {/*    )}*/}
                {/*</AnimatePresence>*/}
                <div className="sign-in-page" ref={nodeRef}>
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
                            <Button text="У меня нет аккаунта" onClick={handleClickToSignUp} />
                        </Link>
                    </div>
                </div>
            </CSSTransition>
        </SwitchTransition>
    )
}

export default SignInPage
