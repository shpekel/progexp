import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'
import './styles.sass'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { notifiesActions } from '../../reducers/notifyesReducer'
import { SendNotification } from '../../features/types/NotificationType'

const Notify: FC = () => {
    const dispatch = useAppDispatch()
    const notifies = useAppSelector((state) => state.notifiesReducer.list)

    useEffect(() => {
        // @ts-ignore
        window.sendNotify = (notify: SendNotification) => {
            dispatch(notifiesActions.send(notify))
        }

        // @ts-ignore
        window.removeNotify = (id) => {
            dispatch(notifiesActions.remove(id))
        }
    }, [])

    const sortList = notifies.slice(-4)

    return (
        <div className="notify">
            <div className="content">
                <AnimatePresence>
                    {sortList.map((item) => (
                        <motion.div
                            key={item.id}
                            className="item-container"
                            initial={{
                                scale: 0.8,
                                opacity: 0,
                                y: '-100%',
                                height: 0,
                                marginBottom: 0
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                                height: 'auto',
                                marginBottom: '20px'
                            }}
                            exit={{ scale: 0.8, opacity: 0, y: '100%', height: 0, marginBottom: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <div className="item">
                                <div className="icon" />
                                {item.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Notify
