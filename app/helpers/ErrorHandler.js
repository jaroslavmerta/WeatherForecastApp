'use strict'

export class ErrorHandler extends Error{

    /**
     * Instance initialization
     * @param {string} message 
     */
    constructor (message) {
        super(message);
        this.name = "ErrorHandler";

    }
    /**
     * Creates error message above input if an error occurs
     * @param {string} errorMessage 
     * @param {string} searchText 
     */
    warning(errorMessage, searchText){
        if (document.getElementById('error')){
            let error = document.getElementById('error');
            error.parentElement.removeChild(error);
        }
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