import React, { memo, useEffect, useRef, useState } from 'react'
import './styles.sass'
import { Steps } from '../../features/enums/AuthType'
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
    step?: Steps
    setStep?: () => void
    onClickEnter?: () => void
    isActive?: boolean
    state?: Steps
    hasEye?: boolean
    rollingEye?: boolean
    signIn?: Steps
    signUp?: Steps
    roundedBottom?: boolean
    search?: boolean
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
        rollingEye,
        signIn,
        signUp,
        roundedBottom,
        search
    }) => {
        const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false)

        const inputRef = useRef<HTMLInputElement>(null)

        const styleInput = () => {
            if (!(signIn || signUp)) return

            if (roundedBottom) {
                return { borderRadius: '0px 0px 15px 15px' }
            }

            if (signIn in Steps && signIn !== Steps.First) {
                if (state === Steps.Second) {
                    return { borderRadius: '0px 0px 15px 15px' }
                } else {
                    return { borderRadius: '15px 15px 0px 0px' }
                }
            } else if (signUp in Steps && signUp !== Steps.First) {
                if (state === Steps.Second || state === Steps.Third) {
                    if (signUp === Steps.Second) {
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
            if (signIn !== Steps.Third) return

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
                    <div className={`input ${search ? 'search' : ''}`}>
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
                        {search && (
                            <div className="search-container">
                                <div className="search" />
                            </div>
                        )}
                        {hasArrow && (
                            <div
                                className={`arrow ${
                                    (step === Steps.Third || step === Steps.Fourth) && signUp
                                        ? 'heavy-active'
                                        : step !== Steps.First
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={setStep}
                            ></div>
                        )}
                        {hasEye && (
                            <div
                                className={`eye ${isVisiblePassword ? 'active' : ''} ${
                                    rollingEye ? 'rolling' : ''
                                }`}
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
