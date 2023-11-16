import React, { memo } from 'react'
import './styles.sass'

interface ICheckbox {
    text: string
    checked: boolean
    setChecked: (newValue: boolean) => void
    style?: {
        [key: string]: string
    }
}

const Checkbox: React.FC<ICheckbox> = memo(({ text, checked, setChecked, style }) => {
    const handleClick = () => {
        setChecked(!checked)
    }

    return (
        <div className={`checkbox ${checked ? 'active' : ''}`} style={style} onClick={handleClick}>
            <div className="checkbox-box">
                <div className="checkbox-box-background" />
                <div className="checkbox-box-border" />
                <svg
                    className="tick"
                    xmlns="http://www.w3.org/2000/svg"
                    // width="20%"
                    // height="20%"
                    viewBox="0 0 49.96 37.33"
                >
                    <polyline points="4 17.49 18.11 33.33 45.96 4" />
                </svg>
            </div>
            <div className="text">{text}</div>
        </div>
    )
})

export default Checkbox
