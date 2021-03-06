const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body) 
    ].join(' ')
  }))

let persons = [
    {
        name : "Matteo",
        number : "095-225-883",
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

const getId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(el => el.id)) : 0;
    return maxId + 1;
}

app.post('/api/persons', (req,res) => {
    const body = req.body;
    if(!body.name){
        return res.status(400).json({
            error: 'content missing'
        })
    }else if (persons.find(el => el.name === body.name)){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: getId()
    }
    console.log(person);
    persons = persons.concat(person);

    res.json(person);
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
    console.log(persons);
    res.status(204).end();
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})