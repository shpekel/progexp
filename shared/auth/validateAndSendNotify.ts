export const validateAndSendNotify = (condition: boolean, message: string): boolean => {
    if (condition) {
        console.log(message)
        return false
    }
    return true
}
