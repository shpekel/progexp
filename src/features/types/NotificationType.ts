import { NotificationTypes } from '../../../shared/notify/types'

export type SendNotification = Omit<Notification, 'id'>

export type Notification = {
    id: number
    type: NotificationTypes
    text: string
    duration: number
}
