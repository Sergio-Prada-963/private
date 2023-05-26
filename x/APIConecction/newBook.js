import {url, createBook, readBook} from './data.js';

import {parametrosAll} from '../js/script.js';

//selectores

const sendBookButton = document.querySelector('#sendBook');

sendBookButton.addEventListener('click', (e)=>{
    e.preventDefault();

    createBook(parametrosAll)
    readBook()
    console.log(parametrosAll)
})