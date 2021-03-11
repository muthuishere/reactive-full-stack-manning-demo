import {loadingIndicator} from "./loader/loading-indicator";
import {appNotification} from "./notification/app-notification";

export function padAsTwoDigit(input){

    const val = "" + input;

    return val.length == 2 ? val : ("0"+val)
}
export function  isDateGreaterThanToday(input){

    const now = new Date().getTime();
    const receivedDate =new Date(input).getTime();
    return receivedDate > now;
}

export function  getFormattedTime(input){

    const receivedDate =new Date(input)
    const hours = receivedDate.getHours();
    const minutes = receivedDate.getMinutes();

    return  `${getChangedHours(hours)}:${padAsTwoDigit(minutes)} ${getAMOrPM(hours)}`

}

export function  getAMOrPM(hours){

    return  hours > 11 ? "PM":"AM"

}
export function  getChangedHours(hours){

    return  hours > 12 ? padAsTwoDigit(hours-12) : padAsTwoDigit(hours)

}
export function  getMonth(monthIndex){
    return padAsTwoDigit(monthIndex +1);
}
export function  getTomorrow(){

    const now = new Date();

    return  now.getFullYear() + "-" + getMonth(now.getMonth()) + "-" + padAsTwoDigit(now.getDate()+1)

}


function truncateString(str, num) {
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
}


export function handleErrors(response) {
    return new Promise((resolve, reject) => {


        if (!response.ok) {



            getErrorText(response).then(res => {

                reject(res);

            })


       } else {
            resolve(response);
        }


    });
}







const getErrorText = async (response) => {



    let result= null;
    try {

        result = await response.json()
    }catch (e) {

    }

    if(result && result["message"])
        return  result["message"]
    return  JSON.stringify(result);;
};



export function handleReactiveError(errorMessage) {
    loadingIndicator.hide();
    appNotification.showError(errorMessage)
    throw errorMessage;
}
