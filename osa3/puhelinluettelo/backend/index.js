const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
	Person.find({})
		.then(persons => {
			response.json(persons)
		})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person)
			{
				response.json(person)
			}
			else
			{
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

const generateId = () => {
	return Math.floor(Math.random() * 1000000000000)
}

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	/*const alreadyExists = persons.find(person => person.name === body.name)
  if (alreadyExists) {
    return response.status(400).json({ error: 'name is already in phonebook' })
  }
  */

	const person = new Person({
		name: body.name,
		number: body.number,
		id: generateId(),
	})

	person.save()
		.then(savedPerson => {
			response.json(savedPerson)
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})