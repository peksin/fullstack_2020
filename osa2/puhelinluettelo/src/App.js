import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <>
      {person.name} <br/>
    </>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  // kasittelee vain lomakkeen kentan muutosta
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // hoitaa puhelinnumeorn lisayksen
  const addName = (event) => {
    event.preventDefault()
    // luodaan olio uutta puhelinnumeroa varten
    const nameObject = {
      name: newName
    }

    // etsitaan annettua nimea jo tallennetuista
    const nimet = persons.map(person => person.name)
    nimet.findIndex((string) => string === newName) === -1
    ? setPersons(persons.concat(nameObject))
    : window.alert(`${newName} is already added to phonebook`)

    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person) => 
          <Person key={person.name} person={person} />)}
    </div>
  )

}

export default App