import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // tapahtumankasittelija onSubmitille
  const addNote = (event) => {
    event.preventDefault()
    // luodaan olio uutta muistiinpanoa varten
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    // lisataan oikeaoppisesti taulukon jatkoksi
    setNotes(notes.concat(noteObject))
    // tyhjentaa syotekenttaa kontrolloivan tilan
    setNewNote('')
  }

  // tapahtumankasittelija lomakkeen input-komponentin
  // muutokselle
  const handleNoteChange = (event) => {
    console.log(event.target.value) // viittaa syotekentan arvoon
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => 
          <Note key={i} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App