'use strict'

export class TimeUtility {

    /**Returns today numerically expressed as the day of the week
     * @returns {number}
     */
    static getToday() {
        let date = new Date();
        return date.getDay();
    }

    //převádí unixový čas na standardní a vrací den v týdnu jako číslo
    /**
     * Converts UNIX timestam into javascript Date object
     * @param {number} unixTimeStamp UNIX timestamps in seconds
     * @returns {number}
     */
    static timeConverter(unixTimeStamp){
        let date = new Date(unixTimeStamp * 1000);
        return date.getDay();
    }

    /**
     * Converts UNIX timestam into javascript Date object
     * @param {number} unixTimeStamp UNIX timestamps in seconds
     * @returns {object}
     */
    static DateObjectFromUTS(unixTimeStamp){
        return new Date(unixTimeStamp * 1000);
    }

    /**
     * Creates today formatted into an abbreviated word form according to the browser language
     * @returns {string}
     */
    static toLocalTodayFormat(){
        let date = new Date();
        return date.toLocaleDateString([], { weekday: 'short' });
    }

    /**
     * Creates fake Date objects to get the specific time of the day formatted according to the browser language
     * @returns {object}
     */
    static fakeTimeObjects(){
        let date=[];
        let localTime=[];
        let number = 1;
        for(let i=0; i<=7; i++){
            
            let h;
            if (number < 7)
                h = '0'+ number;
            else 
                h = number;
            date[i] = new Date(`1970-01-01 ${h}:00`)
            
            number += 3;
            localTime[i] = date[i].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        console.log(localTime);
        return localTime;
    }

}