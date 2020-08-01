import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  


  // tapahtumankasittelija onSubmitille
  const addNote = (event) => {
    event.preventDefault()
    // luodaan olio uutta muistiinpanoa varten
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  // tapahtumankasittelija lomakkeen input-komponentin
  // muutokselle
  const handleNoteChange = (event) => {
    console.log(event.target.value) // viittaa syotekentan arvoon
    setNewNote(event.target.value)
  }


  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id) // etsitaan muutettava muistiinpano

    /* 
    - maaritellaan uusi olio, jonka sisalto sama kuin vanhan note-olion poislukien
      important-kentta
    - ...note luo olion jolla on kenttinaan kopiot note-olion kenttien arvoista
    - sitten important-kenttaan tulee vanhan kaanteisarvo
    - suositeltavaa on nimenomaan tehda oliosta kopio sita muokattaessa, koska muuten
      muokataan notesia joka on TILA, eli sita ei saa muuttaa suoraan */
    const changedNote = { ...note, important: !note.important }

    /* PUT-pyynnolla korvataan vanha muistiinpano palvelimella */
    noteService
      .update(id, changedNote)
      .then(returnedNote => {

      /* luodaan uusi taulukko vanhan taulukon perusteella
         Jos note.id !== id on tosi, otetaan uuteen taulukkoon suoraan vanhan
         taulukon kyseinen alkio. Jos epatosi, eli kyseessa on muutettu muistiinpano,
         otetaan uuteen taulukkoon palvelimen palauttama olio (joka on tassa tapauksessa
         muutettu, koska PUT-metodi on juuri muutoksen tehnyt) */
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      /* Olematon muistiinpano poistetaan filterilla, jonka luoman uuden taulukon
         sisalloksi tulee alkuperaisen taulukon sisallosta ne alkiot, joille
         parametrina oleva funktio palauttaa arvon true 
         ...kaytannossa hylkaa vain sen jonka id on tama kasittelyssa oleva id */
      setNotes(notes.filter(n => n.id !== id))
    })
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
          <Note 
            key={i} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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