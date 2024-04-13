import React from 'react'
import './styles.sass'
import trash from '../../assets/images/trash.svg'

export enum ButtonStyles {
    Default,
    Primary,
    Secondary,
    Interactive,
    Red
}

interface IButton {
    text?: string
    onClick?: () => void
    type?: ButtonStyles
    style?: {
        [key: string]: string
    }
}

const Button: React.FC<IButton> = ({ text, onClick, type = ButtonStyles.Default, style }) => {
    return (
        <div className={`btn type-${type}`} style={style} onClick={onClick}>
            {text}
            {type === ButtonStyles.Red && <img src={trash} alt="Пропала" className="icon" />}
        </div>
    )
}

export default Button
