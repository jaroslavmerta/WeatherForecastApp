'use strict'

import { Ajax } from "./Ajax.js";



export class Autocomplete {
    
  /**
   * Performs autocomplete
   * @param {string} inp The input value
   * @param {string} url The URL address to send the request to
   */
  getAutocomplete(inp, url) {
    inp.addEventListener("input", ()=> this._generateList(inp, url));
    inp.addEventListener("keydown", (e) => this._keyReaction(e, inp));
  }

    /**
     * If the arrow DOWN, UP key is pressed,
     * increase the currentFocus variable and and make the current item more visible
     * If the ENTER is pressed, get value from autocomplete list into input, or proccess the data in input
     * @param {object} e Event object
     */
  _keyReaction(e){
      let items = document.getElementsByClassName("autocomplete-item");
      if (e.keyCode == 40 && (!this.currentFocus > -1 || this.currentFocus != undefined)) {
        this.currentFocus++;
        this._addActive(items);
      } else if (e.keyCode == 38 && (!this.currentFocus > -1 || this.currentFocus != undefined)) { //up
        this.currentFocus--;
        this._addActive(items);
      } else if (e.keyCode == 13) {
        e.preventDefault();       
        if (this.currentFocus > -1) {
          if (items) items[this.currentFocus].click();
          this.currentFocus= -1;
          console.log(this.currentFocus);
        }
        else{
          let button = document.getElementById('b-city_name');
          button.click();
        }
      }
  }
  
  /**
   * Creates list of possible city names as a autocomplete
   * @param {string} inp The input value 
   * @param {string} url The URL address to send the request to
   */
  _generateList(inp, url){
      const res = Ajax.fetchToJSON(url);
      res.then( cities => {
      this._closeAllLists();
      
      let divList, div, val = inp.value;
      if (!val) return false;
      this.currentFocus=-1;
      let matches = cities.filter(city => {
          const regex = new RegExp(`^${val}`, 'gi');
          return city.name.match(regex);
      });

        if(matches.length > 0){
          this.currentFocus = 0;
          let frag = document.createDocumentFragment();
          let i=0;
          for(let match of matches){
            if(i < 7){             
              div = this._generateListItem(match);
              frag.appendChild(div);
              i++;
            }
          };
          
          frag.querySelectorAll(".autocomplete-item").forEach( item =>{ 
            item.addEventListener("click", (e)=> {

              inp.value = item.getElementsByTagName("input")[0].value;
              this._closeAllLists();
            })
          });
        divList = document.createElement("DIV");
        divList.setAttribute("id", inp.id + "autocomplete-list");
        divList.setAttribute("class", "autocomplete-items");
        divList.appendChild(frag);
        
        let listItems = divList.getElementsByTagName("div");
        this._addActive(listItems);

        inp.parentNode.appendChild(divList);
        };
      });
  }
  /**
   * Creates list item with a city name and country
   * @param {object} item City data
   * @returns {object}
   */
  _generateListItem(item){
    console.log(typeof item); 
    let div;
    div = document.createElement("DIV");
    div.setAttribute('class', "autocomplete-item")
    div.innerHTML = `<strong> ${item.name}, ${item.country} </strong>`;
    div.innerHTML += "<input type='hidden' value='" + item.name + 
    ", " + item.country + "'>";
    return div;
  }

  /**
   * Close autocomplete list
   */
  _closeAllLists() {
    let list = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < list.length; i++) {
        list[i].parentNode.removeChild(list[i]);
    }
  }

  /**
   * Classify an item as "active"
   * @param {object} items HTML collection of autocomplete list
   * @returns {boolean} If item is not present
   */
  _addActive(items) {
    if (!items) return false;
    this._removeActive(items);
    if (this.currentFocus >= items.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (items.length - 1);
    items[this.currentFocus].classList.add("autocomplete-active");
  }

    /**
     * Removes the "active" class from all autocomplete items
     * @param {object} item HTML collection of autocomplete list
     */
  _removeActive(items) {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("autocomplete-active");
    }
  }
}