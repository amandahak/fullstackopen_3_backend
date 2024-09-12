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
  Person.countDocuments({})
    .then(count => {
      const text = `Puhelinluettelossa on tietoa ${count} kontaktista`
      const date = new Date().toString()
      response.send(
        `<p>${text}<br><br>${date}</p>`
      )
    })
    .catch(error => {
      console.error('Error fetching count:', error.message)
      response.status(500).send('Error fetching count')
    })
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => {
      console.error('Error fetching persons:', error.message)
      next(error)
    })
})

// Hae henkilö id:n perusteella
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).json({ error: 'Person not found' })
      }
    })
    .catch(error => next(error))
})

// Poista henkilö id:n perusteella
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'Person not found' })
      }
    })
    .catch(error => next(error))
})
/*
const generateId = () => {
  let newId
  do {
    newId = Math.floor(Math.random() * 1000000)
  } while (persons.some(person => person.id === newId))
  return newId
}
*/

//lisää tai päivitä henkilö
// Lisää tai päivitä henkilö
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  Person.findOne({ name: body.name }).then(existingPerson => {
    if (existingPerson) {
      return Person.findByIdAndUpdate(
        existingPerson._id,
        { number: body.number },
        { new: true, runValidators: true }
      ).then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    }).catch(error => next(error))
  }).catch(error => next(error))
})

// Virheiden käsittelymiddleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
