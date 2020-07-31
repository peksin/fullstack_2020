import React, { useState, useEffect } from 'react'
import axios from 'axios'

//
// Yksittainen maa
//
const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      capital {country.capital} <br/>
      population {country.population}
      <h2>languages</h2>
      <div>
        {country.languages.map((language) => 
          <li key={language.iso639_1}>{language.name}</li>)}
      </div>
      <div>
        <img src={country.flag} alt="Flag was supposed to be here" height="100"></img>
      </div>
    </>
  )
}

//
// Lista maista
//
const Countries = ({ countries, newFilter}) => {
  if (newFilter === '') { // ei ole mitaan hakusanaa niin ei nayteta mitaan
    return (
      <div></div>
    )
  } 
  
  const countriesToShow = countries.filter(country => country.name // suoritetaan haku
    .toLowerCase()
    .includes(newFilter
      .toLowerCase()))
  
  if (countriesToShow.length > 10) { // loytyi liikaa
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countriesToShow.length === 1) { // loytyi vain yksi maa
    return (
      <div>
        <Country country={countriesToShow[0]} />
      </div>
    )
  }

  return ( // ei loytynyt vain yhta maata mutta ei loytynyt liikaakaan
    <div>
      {countriesToShow.map(country => <div key={country.name}>{country.name}</div>)}
    </div>
  )
}

//
// Juurikomponentti
//
const App = () => {
  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  // haetaan kaikki maat muistiin
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <form>
        <div>
          find countries: <input
            value={newFilter}
            onChange={handleNewFilter} />
        </div>
      </form>
      <Countries countries={countries} newFilter={newFilter} />
    </div>
  )
}

export default App;
