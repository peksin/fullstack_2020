import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Notification = ({message, color}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification" style={{color:`${color}`}}>
      {message}
    </div>
  )
}

// Yksi yhteystieto
const Person = ({ person, handleDeletePerson }) => {
  return (
    <>
      {person.name} {person.number} <button type="delete"
                                            onClick={() => {handleDeletePerson(person.id, person.name)}}
                                            >delete</button> <br/>
    </>
  )
}


// Kaikki yhteystiedot
const Numbers = ({ persons, showAll, newFilter, handleDeletePerson }) => {

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <>
      {personsToShow.map((person) => 
        <Person key={person.name} person={person} handleDeletePerson={handleDeletePerson}/>)}
    </>
  )
}


// Filtteri
const Filter = ({ handleNewFilter, newFilter }) => (
    <form>
    <div>
      filter shown with <input
        value={newFilter}
        onChange={handleNewFilter} />
    </div>
  </form>
)


// Henkilon lisays
const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <div>
      <form onSubmit={addName}>
      <div>
        name: <input 
          value={newName}
          onChange={handleNameChange}/>
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </div>
  )
}


// Juurikomponentti
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ notificationColor, setNotificationColor] = useState(null)

  const updateFromDatabase = () => {
    personService
      .getAll()
      .then(allPersons => {
        console.log('Hakee tietokannasta...')
        console.log(allPersons)
        setPersons(allPersons)
      })
  }

  useEffect(updateFromDatabase, [])



  // kasittelee vain lomakkeen kentan muutosta
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setShowAll(false)
    setNewFilter(event.target.value)
  }

  /* taitaa olla makuasia etta poistaako suoraan tietokannasta ja hakee tuoreen version vanhan
  STATEn paalle vai poistaako nykyisesta ja POSTaa uuden version tietokantaan vanhan paalle? */
  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(response => {
        updateFromDatabase()
        setNotificationMessage(`Deleted ${name}`)
        setNotificationColor('green')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationMessage(`Information of ${name} has already been removed from server`)
        setNotificationColor('red')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        updateFromDatabase()
      })
    }
  }

  // hoitaa puhelinnumeron lisayksen
  const addName = (event) => {
    event.preventDefault()
    // luodaan olio uutta puhelinnumeroa varten
    const nameObject = {
      name: newName,
      number: newNumber
    }

    // etsitaan annettua nimea jo tallennetuista
    const nimet = persons.map(person => person.name)
    if (nimet.findIndex((string) => string === newName) === -1) {
      // tietokannasta ei loytynyt annetun nimista
      personService.create(nameObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNotificationMessage(`Added ${newName}`)
      setNotificationColor('green')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      })
      .catch(error => {
        // mongoosen validointierrori ruutuun
        console.log(`${error.response.data}`)
        const errorMsg = error.response.data.error.toString()
        setNotificationMessage(`${errorMsg}`)
        setNotificationColor('red')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    } else if (window.confirm(`${nameObject.name} is already added to phonebook, replace
    the old number with a new one?`)) {
      personService
      .update(persons[nimet.findIndex((string) => string === newName)].id, nameObject)
      .then(() => { 
        updateFromDatabase()
      setNotificationMessage(`Updated ${newName}`)
      setNotificationColor('green')
      setTimeout(() => {
        setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        const errorMsg = error.response.data.error.toString()
        setNotificationMessage(`${errorMsg}`)
        setNotificationColor('red')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        updateFromDatabase()
      })
    }
    
    
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} color={notificationColor}/>

      <Filter 
        newFilter={newFilter} 
        handleNewFilter={handleNewFilter} />

      <h2>Add a new</h2>

      <PersonForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />

      <h2>Numbers</h2>

      <Numbers persons={persons} showAll={showAll} 
                newFilter={newFilter} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App