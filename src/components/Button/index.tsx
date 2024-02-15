import React from 'react'
import './styles.sass'

export enum ButtonStyles {
    Default,
    Primary,
    Secondary
}

interface IButton {
    text?: string
    onClick: () => void
    type?: ButtonStyles
    style?: {
        [key: string]: string
    }
}

const Button: React.FC<IButton> = ({ text, onClick, type = ButtonStyles.Default, style }) => {
    return (
        <div className={`btn type-${type}`} style={style} onClick={onClick}>
            {text}
        </div>
    )
}

export default Button
