import React, { FC, ReactNode } from 'react'
import './styles.sass'
import { AnimatePresence, motion } from 'framer-motion'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    title: string
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="inner"
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        initial={{ transform: 'rotate(180deg) scale(0)' }}
                        animate={{ transform: 'rotate(0) scale(1)' }}
                        exit={{ transform: 'rotate(180deg) scale(0)' }}
                    >
                        <div className="modal">
                            <div className="line">
                                <div className="title">{title}</div>
                                <div className="modal-close-btn" onClick={onClose}>
                                    <div className="icon"></div>
                                </div>
                            </div>
                            <div className="content">{children}</div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal
