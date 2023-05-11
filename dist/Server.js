"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
let count = 0;
app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});
`/?minus=2`; //programma che conta gli accessi a meno che non scriviamo un minus=2 che andrà a decrementarlo
app.get('/', (req, res) => {
    const minus = Number(req.query.minus);
    console.log(minus);
    if (Number.isInteger(minus)) {
        count = count - Number(minus);
    }
    else {
        count++;
    }
    return res.send(`<h1>Ciao! Questa è la HOME PAGE!</h1>
  <p>Numero di accessi ${count}</p>`);
});
`/stats?num=2`; //Programma che fa la somma dei numeri passati e ne fa la media
app.get('/stats', (req, res) => {
    console.log("req.query.num", req.query.num);
    const Numbers = req.query.num;
    console.log("Numbers", Numbers);
    let sum = 0;
    for (const element of Numbers) {
        sum = sum + Number(element);
        console.log("sum", sum);
    }
    return res.send(`<h1>Ciao! Questa è la HOME PAGE!</h1>
  <p>La somma totale degli elementi ${Numbers} è ${sum}</p>
  <p>Il valor medio degli elementi ${Numbers} è ${sum / Numbers.length}</p>`);
});
app.get('/ciao', (req, res) => {
    return res.send("Ciao! questo è il tuo primo server!");
});
app.get('/greetings/:nome', (req, res) => {
    console.log(req.params);
    const nome = req.params.nome;
    return res.send(`<h1>Ciao ${nome}! Come va?</h1>`);
});
app.get('/sum/:number1/:number2', (req, res) => {
    const Number1 = Number(req.params.number1);
    const Number2 = Number(req.params.number2);
    if (!isNaN(Number1) && !isNaN(Number2)) {
        return res.send(`<h1>La Somma tra ${Number1} e ${Number2} è uguale a ${Number(Number1 + Number2)}</h1>`);
    }
});
app.get('/diff/:number1/:number2', (req, res) => {
    const Number1 = Number(req.params.number1);
    const Number2 = Number(req.params.number2);
    if (!isNaN(Number1) && !isNaN(Number2)) {
        return res.send(`<h1>La Differenza tra ${Number1} e ${Number2} è uguale a ${Number1 - Number2}</h1>`);
    }
});
app.get("/b", (req, res) => {
    console.log(req.query);
});
`?/num`;
app.get('/', (req, res) => {
    console.log(req.query);
    const numbers = Number(req.query.num);
    console.log(numbers);
});
app.get('*', (req, res) => {
    return res.status(404).send("<h1>ERROR 404: Page not Found</h1>");
});
