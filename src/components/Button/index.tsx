import React from 'react'
import './styles.sass'

interface IButton {
    text?: string
    onClick: () => void
    style?: {
        [key: string]: string
    }
}

const Button: React.FC<IButton> = ({ text, onClick, style }) => {
    return (
        <div className="btn" style={style} onClick={onClick}>
            {text}
        </div>
    )
}

export default Button
