const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

// Luo morganille uuden tokenin 'body'
morgan.token('body', (request) => JSON.stringify(request.body))

// Morgan käyttöön --> lokitus jokaiselle pyynnölle
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"    
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"    
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"    
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122" 
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Puhelinluettelo</h1>')
})

app.get('/info', (request, response) => {
    const count = persons.length
    const text = `Puhelinluettelossa on tietoa ${count} kontaktista`
    const date = new Date().toString()
    response.send(
      `<p>${text}<br><br>${date}</p>`
    )
  })
  

app.get('/api/persons', (request, response) => {
  response.json(persons)
})
// Hae henkilö id:n perusteella
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).json({ error: 'Person not found' })
    }
  })
// Poista henkilö id:n perusteella
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    let newId
    do {
        newId = Math.floor(Math.random() * 1000000)
    } while (persons.some(peson => persons.id === newId))
    return newId
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'Nimi puuttuu' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'Numero puuttuu' 
    })
  }  

  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
        error: 'Nimi löytyy jo listalta'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)