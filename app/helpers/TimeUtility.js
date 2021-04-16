'use strict'

export class TimeUtility {

    static get days() {
        return ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
    }

    //změna názvu z loadToday
    //vrací aktuální čas a vrací den v týdnu jako číslo
    static getToday() {
        let date = new Date();
        return date.getDay();
    }

    static dayByWord = (dayOfWeek) =>{
        return this.days[dayOfWeek];
    }

    //převádí unixový čas na standardní a vrací den v týdnu jako číslo
    static timeConverter(unixTimeStamp){
        let date = new Date(unixTimeStamp * 1000);
        return date.getDay();
    }

    static DateObjectFromUTS(unixTimeStamp){
        return new Date(unixTimeStamp * 1000);
    }

    static toLocalTodayFormat(){
        let date = new Date();
        return date.toLocaleDateString([], { weekday: 'short' });
    }

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