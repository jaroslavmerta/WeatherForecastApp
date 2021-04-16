'use strict'

export class DataInputError extends Error{
    constructor (message) {
        super(message);
        this.name = "DataInputError";

    }

    warning(errorMessage, searchText){
        console.log(typeof searchText);
        if ( !document.getElementById('error')){
        let newE = document.createElement("H4");
        newE.setAttribute('id', 'error');
        newE.setAttribute('class', "error-warning")
        newE.innerText = errorMessage;
        let myInput = document.getElementById('myInput');
        myInput.parentElement.insertBefore(newE, myInput);
        myInput.value ='';
        }
    }
}