import { Notification, SendNotification } from '../features/types/NotificationType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type NotifiesState = {
    iterator: number
    list: Notification[]
}

const initialState: NotifiesState = {
    iterator: 0,
    list: []
}

export const notifiesSlice = createSlice({
    name: 'notifies',
    initialState,
    reducers: {
        send(state, action: PayloadAction<SendNotification>) {
            const { type, text, duration } = action.payload
            const id: number = state.iterator++

            state.list.push({ id, type, text, duration })

            setTimeout((): void => {
                // @ts-ignore
                window.removeNotify(id)
            }, duration * 1000)
        },
        remove(state, action: PayloadAction<number>) {
            const id: number = action.payload
            const index: number = state.list.findIndex(
                (notify: Notification): boolean => notify.id === id
            )

            if (~index) {
                state.list.splice(index, 1)
            }
        }
    }
})

export const notifiesReducer = notifiesSlice.reducer
export const notifiesActions = notifiesSlice.actions
