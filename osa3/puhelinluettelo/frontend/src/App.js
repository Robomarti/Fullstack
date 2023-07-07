import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Content = ({parts, notif}) => {
  return (
    <>
      {parts.map(part =>
        <Person key={part.name} parts={part} notif={notif}  />
      )}
    </>
  )
}

const Person = ({parts, notif}) => {
  const delPerson = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete '${parts.name}' ?`))
    {
      personService
        .delPerson(parts.id)
        .then(() => {
          notif( `Deleted '${parts.name}'`)
          setTimeout(() => {
            notif(null)
          }, 2000)
        }
          
        )
        .catch(error => {
          console.log("fail", error)
        })
    }
    window.location.reload()
  }
  
  return (
    <>
      <form onSubmit={delPerson}>
        <>{parts.name} {parts.number} </>
        <button type="submit">delete</button>
      </form>
    </>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log("fail", error)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(persons => persons.name === newName) === undefined) {
      const personObject = {
        name: newName,
        number: newNumber,
      }
    
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage( `Added '${newName}'`)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
        .catch(error => {
          console.log("fail", error)
        })
    }
    else
    {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <>name: <input value={newName} onChange={handlePersonChange} /></><br></br>
        <>number: <input value={newNumber} onChange={handleNumberChange} /></><br></br>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <Content parts={persons} notif={setErrorMessage} />
    </div>
  )

}

export default App