'use strict'
import { Autocomplete } from '../Autocomplete/Autocomplete.js';

export class CityAutocomplete extends Autocomplete {

  /**
   * Creates item list with a city name and country
   * @param {object} city City data
   * @returns {object}
   */
  _generateListItem(city){
    let div;
    div = document.createElement("DIV");
    div.setAttribute('class', "autocomplete-item")
    div.innerHTML = `<strong> ${city.name}, ${city.country} </strong>`;
    div.innerHTML += "<input type='hidden' value='" + city.name + 
    ", " + city.country + "'>";
    return div;
  }    
}