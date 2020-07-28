import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <>
      {person.name} {person.number} <br/>
    </>
  )
}

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

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input
            value={newFilter}
            onChange={handleNewFilter} />
        </div>
      </form>

      <h2>add a new</h2>
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
      <h2>Numbers</h2>
        {personsToShow.map((person) => 
          <Person key={person.name} person={person} />)}
    </div>
  )

}

export default App