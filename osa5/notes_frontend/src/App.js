import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note application, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  
  // toisena parametrina oleva tyhja taulukko varmistaa etta efekti
  // suoritetaan vain renderoitaessa ensimmaista kertaa
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
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
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      // tallennetaan kayttajan tiedot local storageen
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )


  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
        {noteForm()}
        </div>
      }

      <h2>Notes</h2>

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

      <Footer />
    </div>
  )
}

export default App