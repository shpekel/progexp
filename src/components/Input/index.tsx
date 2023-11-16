import React, { memo, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { SignInSteps, SignUpSteps } from '../../features/types/AuthType'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppSelector } from '../../hooks/redux'

interface IInput {
    value: string
    setValue: (newValue: string) => void
    type?: 'text' | 'password'
    style?: {
        [key: string]: string
    }
    placeholder?: string
    hasArrow?: boolean
    step?: SignInSteps | SignUpSteps
    setStep?: () => void
    onClickEnter?: () => void
    isActive?: boolean
    state?: SignInSteps | SignUpSteps
    hasEye?: boolean
    signIn?: SignInSteps
    signUp?: SignUpSteps
    roundedBottom?: boolean
}

const Input: React.FC<IInput> = memo(
    ({
        value,
        setValue,
        type,
        style,
        placeholder,
        hasArrow,
        step,
        setStep,
        onClickEnter,
        isActive = true,
        state,
        hasEye,
        signIn,
        signUp,
        roundedBottom
    }) => {
        // const currentSignInStep = useAppSelector((state) => state.authReducer.signInStep)
        // const currentSignUpStep = useAppSelector((state) => state.authReducer.signUpStep)

        const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)

        const inputRef = useRef<HTMLInputElement>(null)

        const styleInput = () => {
            if (roundedBottom) {
                return { borderRadius: '0px 0px 15px 15px' }
            }

            if (signIn in SignInSteps && signIn !== SignInSteps.First) {
                if (state === SignInSteps.Second) {
                    return { borderRadius: '0px 0px 15px 15px' }
                } else {
                    return { borderRadius: '15px 15px 0px 0px' }
                }
            } else if (signUp in SignUpSteps && signUp !== SignUpSteps.First) {
                if (state === SignUpSteps.Second || state === SignUpSteps.Third) {
                    if (signUp === SignUpSteps.Second) {
                        return { borderRadius: '0px 0px 15px 15px' }
                    }
                    return { borderRadius: '0px' }
                } else {
                    return { borderRadius: '15px 15px 0px 0px' }
                }
            }
            return { borderRadius: '15px' }
        }

        const handleClickEye = () => {
            setIsVisiblePassword((prevState) => !prevState)
        }

        const handleReset = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault()
        }

        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' && onClickEnter) {
                onClickEnter()
            }
        }

        useEffect(() => {
            if (signIn !== SignInSteps.Third) return

            inputRef.current.blur()
        }, [signIn])

        return (
            <AnimatePresence initial={false}>
                <motion.div
                    className="input__wrapper"
                    animate={{
                        height: isActive ? 'auto' : 0,
                        overflow: isActive ? 'visible' : 'hidden'
                    }}
                    style={style}
                >
                    <div className="input">
                        <input
                            ref={inputRef}
                            type={type === 'password' && !isVisiblePassword ? 'password' : 'text'}
                            value={value}
                            placeholder=""
                            onChange={(event) => setValue(event.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="placeholder">{placeholder}</div>
                        <div className="bg" style={styleInput()}></div>
                        <div className="border" style={styleInput()}></div>
                        {hasArrow && (
                            <div
                                className={`arrow ${
                                    step === SignUpSteps.Third
                                        ? 'heavy-active'
                                        : step !== SignInSteps.First
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={setStep}
                            ></div>
                        )}
                        {hasEye && (
                            <div
                                className={`eye ${isVisiblePassword ? 'active' : ''}`}
                                onClick={handleClickEye}
                                onMouseDown={handleReset}
                                onMouseUp={handleReset}
                            ></div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        )
    }
)

export default Input
