'use strict'
import { Ajax } from './../helpers/Ajax.js';
import { Autocomplete } from './../helpers/Autocomplete.js';
import { StringUtility } from './../helpers/StringUtility.js';
import { TimeUtility } from './../helpers/TimeUtility.js';
import { DataInputError } from '../helpers/DataInputError.js';


export class WeatherForecast {

    /**
     * Instance initialization
     */
    constructor (){
        this.button = document.getElementById("b-city_name");
        this.myInput = document.getElementById("myInput");
        this.forecast = document.getElementById("forecast");
    }
    /**
     * Performs weather forecast
     */
    getWeatherForecast(){
        this.button.addEventListener("click", () => this._searchCityId(this.myInput.value));
        window.addEventListener('load', ()=> this._randomCity());
        const autocomplete = new Autocomplete();
        autocomplete.getAutocomplete(myInput, "../data/city.list.json");
        
    }

    /**
     * Searches for a string entered from input in JSON file with city names
     * @param {string} searchedText The input value, that is searched for in the file
     */
    _searchCityId(searchedText){
        try{
            if (searchedText == '' || searchedText == null)
                throw new DataInputError("Enter a city name");
        


        let res = Ajax.fetchToJSON("../data/city.list.json");
        res.then( cities => {
            let cityAttr = StringUtility.checkString(searchedText,",");
            let match;
            if (!Array.isArray(cityAttr)){
                match = cities.filter(city => {
                const regex = new RegExp(`^${cityAttr}$`, 'gi');
                return city.name.match(regex)
            });
            }
            else{
                match = cities.filter(city => {
                const regexName = new RegExp(`^${cityAttr[0]}$`, 'gi');
                return city.name.match(regexName);
                });
                cityAttr[1] = cityAttr[1].toUpperCase();
                for (let i=0; i < match.length; i++){
                    if (match[i].country != cityAttr[1])
                    match.splice(i, 1);
                }               
            }
                try{
                if (match.length == 0)
                    throw new DataInputError(`The city name:"${this.myInput.value}" do not exist.`);

                let cityId = match[0].id;

                let lang = StringUtility.checkString(navigator.language,"-");
                this._generateTable(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&lang=${Array.isArray(lang) ? lang[1]: lang}&units=metric&appid=bbc5944f6705eb9cea716ba2477d4b9d`);
                }
                catch(err){ 
                    err.warning(err.message, searchedText);
                }
        });
        }
        catch (err){
            err.warning(err.message, searchedText);
        }
    }

    /**
     *Fetches data from Weather API, creates a table and inserts data in it 
     * @param {string} url The URL address to send the request to
     */
    _generateTable(url){
        let res = Ajax.fetchToJSON(url);
        res.then(data => {
            let today = TimeUtility.getToday();
            this.forecast.innerHTML = '';
            this._getCityHeading(data);
            let tableRows = this._createTable(data, today);
            this.forecast.appendChild(tableRows);
        });
    }

    /**
     * Creates a table for a temperature data from OpenWeather API
     * @param {object} data Weather data that can be listed in a table
     * @param {number} today Today numerically expressed as the day of the week
     * @returns {object}
     */
    _createTable(data, today){
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
        table.setAttribute("class", "center-block ");
        table.setAttribute("id","forecast-table");

        //the row with a time headlines for every column with a temperature
        let time_row = this._getTimeRow();
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

    /**
     * Creates table a row with formatted time data
     * @returns {object}
     */
    _getTimeRow(){
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

    /**
     * Fills heading tag with a city name and country
     * @param {object} data Weather data with the current city name
     */
    _getCityHeading(data){
        let h = document.getElementById("city-heading");
        h.innerText = data.city.name + ", " + data.city.country;
      
        
    }
    /**
     * Searches a random city from a JSON file
     */
    _randomCity(){
        const res = Ajax.fetchToJSON("../data/city.list.json");
        res.then( cities => {
            let number = Math.floor(Math.random() * 209579);
            let city = cities[number];
            let cityNameId = city.name+","+city.country;
            this._searchCityId(cityNameId);
        });
    }

    _getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._showPosition);
          } else {
            throw new DataInputError("Geolocation is not supported by this browser.");
          }
    }

    _showPosition(position) {
        console.log( "Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude);
      }
        
}