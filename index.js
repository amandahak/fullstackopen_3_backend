require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

// Luo morganille uuden tokenin 'body'
morgan.token('body', (request) => JSON.stringify(request.body))

// Morgan käyttöön --> lokitus jokaiselle pyynnölle
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  response.send('<h1>Puhelinluettelo</h1>')
})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    const text = `Puhelinluettelossa on tietoa ${count} kontaktista`
    const date = new Date().toString()
    response.send(
      `<p>${text}<br><br>${date}</p>`
    )
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => {
      console.error('Error fetching persons:', error.message)
      response.status(500).send('Error fetching persons')
    })
})

// Hae henkilö id:n perusteella
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).json({ error: 'Person not found' })
    }
  })
})

// Poista henkilö id:n perusteella
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end()
  })
})

const generateId = () => {
  let newId
  do {
    newId = Math.floor(Math.random() * 1000000)
  } while (persons.some(person => person.id === newId))
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

  Person.findOne({ name: body.name }).then(existingPerson => {
    if (existingPerson) {
      return response.status(400).json({
        error: 'Nimi löytyy jo listalta'
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
