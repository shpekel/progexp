import React, { FC, ReactNode } from 'react'
import './styles.sass'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    title: string
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="line">
                    <div className="title">{title}</div>
                    <div className="modal-close-btn" onClick={onClose}>
                        <div className="icon"></div>
                    </div>
                </div>
                <div className="content">{children}</div>
            </div>
        </div>
    )
}

export default Modal
