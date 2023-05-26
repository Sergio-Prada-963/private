//import {url, createBook} from './data.js'; 

export const url = 'https://647001ce3de51400f723c52e.mockapi.io/books';

export const createBook = async (parametros) => {
    try{
        const url = 'https://647001ce3de51400f723c52e.mockapi.io/books';
        await fetch(url, {method:'POST', body: JSON.stringify(parametros), headers: {
            'Content-Type':'application/json'
        }})
    }
    catch(error){
        console.log(error);
    };
}

export const readBook = async (url) => {
    try{
        const url = 'https://647001ce3de51400f723c52e.mockapi.io/books';
        const result = await fetch(url);
        const resultados = result.json();
        return resultados;
    }
    catch(error){
        console.log(error);
    };
}

