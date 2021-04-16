'use strict'

import { Ajax } from "./Ajax.js";



export class Autocomplete {
    
  
  getAutocomplete(inp, resourceJSON) {
    inp.addEventListener("input", ()=> this.generateList(inp, resourceJSON));
    inp.addEventListener("keydown", (e) => this.keyReaction(e, inp));
  }

    /*If the arrow DOWN, UP key is pressed,
    increase the currentFocus variable and and make the current item more visible
    If the ENTER is pressed, get value from autocomplete list into input, or proccess the data in input*/
  keyReaction(e){
      let item = document.getElementsByClassName("autocomplete-item");
      if (e.keyCode == 40 && (!this.currentFocus > -1 || this.currentFocus != undefined)) {
        this.currentFocus++;
        this.addActive(item);
      } else if (e.keyCode == 38 && (!this.currentFocus > -1 || this.currentFocus != undefined)) { //up
        this.currentFocus--;
        this.addActive(item);
      } else if (e.keyCode == 13) {
        e.preventDefault();       
        if (this.currentFocus > -1) {
          if (item) item[this.currentFocus].click();
          this.currentFocus= -1;
          console.log(this.currentFocus);
        }
        else{
          let button = document.getElementById('b-city_name');
          button.click();
        }
      }
  }
  
  generateList(inp, resourceJSON){
      const res = Ajax.fetchToJSON(resourceJSON);
      res.then( cities => {
      this.closeAllLists();
      
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
              div = this.generateListItem(match);
              frag.appendChild(div);
              i++;
            }
          };
          
          frag.querySelectorAll(".autocomplete-item").forEach( item =>{ 
            item.addEventListener("click", (e)=> {

              inp.value = item.getElementsByTagName("input")[0].value;
              this.closeAllLists();
            })
          });
        divList = document.createElement("DIV");
        divList.setAttribute("id", inp.id + "autocomplete-list");
        divList.setAttribute("class", "autocomplete-items");
        divList.appendChild(frag);
        
        let firstItem = divList.getElementsByTagName("div");
        this.addActive(firstItem);

        inp.parentNode.appendChild(divList);
        };
      });
  }

  generateListItem(item){

    let div;
    div = document.createElement("DIV");
    div.setAttribute('class', "autocomplete-item")
    div.innerHTML = `<strong> ${item.name}, ${item.country} </strong>`;
    div.innerHTML += "<input type='hidden' value='" + item.name + 
    ", " + item.country + "'>";
    return div;
  }

  closeAllLists() {
    let list = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < list.length; i++) {
        list[i].parentNode.removeChild(list[i]);
    }
  }

    /*a function to classify an item as "active":*/
  addActive(item) {
    if (!item) return false;
    this.removeActive(item);
    if (this.currentFocus >= item.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (item.length - 1);
    item[this.currentFocus].classList.add("autocomplete-active");
  }

    /*a function to remove the "active" class from all autocomplete items:*/
  removeActive(item) {
    for (let i = 0; i < item.length; i++) {
      item[i].classList.remove("autocomplete-active");
    }
  }
}