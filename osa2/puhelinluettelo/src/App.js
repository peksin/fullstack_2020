import React, { useState } from 'react'


// Yksi yhteystieto
const Person = ({ person }) => {
  return (
    <>
      {person.name} {person.number} <br/>
    </>
  )
}


// Kaikki yhteystiedot
const Numbers = ({ persons, showAll, newFilter }) => {

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <>
      {personsToShow.map((person) => 
        <Person key={person.name} person={person} />)}
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
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

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
    nimet.findIndex((string) => string === newName) === -1
    ? setPersons(persons.concat(nameObject))
    : window.alert(`${newName} is already added to phonebook`)

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

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

      <Numbers persons={persons} showAll={showAll} newFilter={newFilter} />
    </div>
  )
}

export default App