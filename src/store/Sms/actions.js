import * as actionTypes from "./actionTypes";

export const sendSMS = (data) => {
    return {
        type: actionTypes.SMS_INITIATE_SEND,
        data
    }
}

