const mongoose = require('mongoose')
const config = require('./utils/config')

if (process.argv.length<3) {
	console.log('give password as argument')
	process.exit(1)
}

const url = config.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', blogSchema)

if ((process.argv.length) > 3)
{
	const name = process.argv[3]
	const number = process.argv[4]

	const person = new Person({
		name: name,
		number: number,
	})

	person
		.save()
		.then(() => {
			console.log(`added ${name} number ${number} to phonebook`)
			mongoose.connection.close()
		})
}
else
{
	Person
		.find({})
		.then(result => {
			result.forEach(person => {
				console.log(person)
			})
			mongoose.connection.close()
		})
}
