const express = require('express');
const app = express();

const persons = [
    {
        name : "Matteo",
        number : "095-522-0026",
        id : 1
    },
    {
        name : "Ada Lovelace",
        number : "39-44-5323523",
        id : 2
    },
    {
        name : "Dan Abramov",
        number : "12-43-234345",
        id : 3
    }
]

app.get('/info', (req, res) => {
    let date = Date();
    let length = persons.length;
    res.send(`
        <p>Phonebook has info for ${length} people.</p>
        <p>${date}</p>
    `);
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(el => el.id === id);
    if(person){
        res.json(person);
    }else{
        res.status(404).end();
    }
    
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(el => el.id !== id);
    res.status(204).end();
});

const port = 3030;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
})