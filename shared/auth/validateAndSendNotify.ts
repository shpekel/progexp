import { NotificationTypes } from '../notify/types'

export const validateAndSendNotify = (condition: boolean, message: string): boolean => {
    if (condition) {
        // @ts-ignore
        window.sendNotify({
            type: NotificationTypes.Error,
            text: message,
            duration: 5
        })
        return false
    }
    return true
}
