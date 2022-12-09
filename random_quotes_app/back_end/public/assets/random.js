import fs from 'fs';
import { quotesJackHandey } from '../quotes.js'


export function randomQuote(){
    console.log("newQuote was run form frontEnd.js");
    // const randomNumber = 5;
    // const randomNumber = Math.floor(Math.random());
    // const randomNumber = Math.floor(Math.random() * 10);
    const randomNumber = Math.floor(Math.random() * quotesJackHandey.length);
    console.log(randomNumber);
    document.getElementById('quoteDisplayField').innerHTML = quotesJackHandey[randomNumber]
};