import {sendNotification} from "../services/notificationServices"

export const useSendNotification = async () => {
    const sendNotificationHandler = async(notificationData) => await sendNotification(notificationData)

    return {sendNotificationHandler}
}