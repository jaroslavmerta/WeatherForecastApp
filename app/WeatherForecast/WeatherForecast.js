'use strict'
import { TimeUtility } from './../helpers/TimeUtility.js';

export class WeatherForecast {

    constructor (){
        this.button = document.getElementById("b-city_name");
        this.myInput = document.getElementById("myInput");
    }

    createTable(data, today){
        let dayParts = 0;
        //cycle: if the data are linked to today make a number record about it
        for( let list of data.list){
        let day = TimeUtility.timeConverter(list.dt);

            if (day == today)
                dayParts++;
            else
            break;
        }
        let table = document.createElement("table");
        table.setAttribute("class", "center-block rwd-table");
        table.setAttribute("id","forecast-table");
        //řádek s orientačním časem pro data v tabulce
        //the row with a time headlines for every column with a temperature
        let time_row = this.getTimeRow();
        table.appendChild(time_row);

        //new row and a cell with name of the day for a first day of forecast
        let new_row = document.createElement("tr");
        let new_th = document.createElement("th");
        new_th.innerText = TimeUtility.toLocalTodayFormat();
        new_row.appendChild(new_th);

        //notice: the day in the incoming weather data  is divided into 8 parts
        //        and is generated after every 3 hours from 1:00 to 22:00 for every day
        //cycle:  creates an empty cells for first day if app does not start at begining of the day
        let missingDayParts = 8 - dayParts;
        for(let i=0; i < missingDayParts; i++){
            let new_td = document.createElement("td");
            new_td.innerText= "-";
            new_row.appendChild(new_td);
        }
        let previousDay;
        let count=0;
        let countColumns=0;
        let frag = document.createDocumentFragment();
        for (let list of data.list) {
            

            let day = TimeUtility.timeConverter(list.dt);
        
            //creates a cell and adds a temperature in it
            let new_td = document.createElement("td");
            new_td.innerText = Math.round(list.main.temp)+" " + "°C" ;

            
            // if it is the next day's turn, create another row
            // and first cell with a name of the day 
            if (day!==previousDay && day!==today) {
                count++;
                
                new_row = document.createElement("tr");
                new_th = document.createElement("th");
                new_th.innerText = TimeUtility.DateObjectFromUTS(list.dt).toLocaleDateString([], { weekday: 'short' });
                new_row.appendChild(new_th);
            }

            if (missingDayParts != 8 && count==5) countColumns++;
            

            if (missingDayParts != 8 && count == 5){
                if(countColumns == missingDayParts){
                    let emptyTd;
                    
                    for(let i=0; i<dayParts; i++){
                        emptyTd = document.createElement("td");
                        emptyTd.innerText = "-";
                        frag.appendChild(emptyTd);
                    }
                }
            }
            
            
            new_row.appendChild(new_td);
            if(countColumns == missingDayParts) new_row.appendChild(frag);
            table.appendChild(new_row);
            previousDay = day;
            
        }
        return table;
    }

    getTimeRow(){
        let tHead = document.createElement("thead");
        let time_row = document.createElement("tr");
        let time_th = document.createElement("th");
        time_row.appendChild(time_th);
        let fakeTimeObjects = TimeUtility.fakeTimeObjects();
        fakeTimeObjects.forEach(time => {
            time_th = document.createElement("th");
            time_th.innerText = time;
            time_row.appendChild(time_th);
        });
        tHead.appendChild(time_row);
        return tHead;
        }
}