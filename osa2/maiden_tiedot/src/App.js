import React, { useState, useEffect } from 'react'
import axios from 'axios'

//
// Yksittainen maa
//
const Country = ({ country, props }) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const get_request = "http://api.weatherstack.com/current?access_key=" 
    + api_key 
    + "&query="
    + country.capital

  // en osannut ilman tammoista laittaa sivua renderoimaan vasta kun requesti on valmis...
  const [isLoaded, setLoaded] = useState(false)


   // haetaan saatiedot
   const hook = () => {
    console.log('effect')
    axios
      .get(get_request)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
        setLoaded(!isLoaded)
      })
  }

  useEffect(hook, [])

  return (
    <>
      <h1>{country.name}</h1>

      capital {country.capital} <br/>
      population {country.population}

      <h2>Languages</h2>
      <div>
        {country.languages.map((language) => 
          <li key={language.iso639_1}>{language.name}</li>)}
      </div>

      <div>
        <img src={country.flag} alt="Flag was supposed to be here" height="100"></img>
      </div>

      <h2>Weather in {country.capital}</h2>
      <div>
        <b>temperature:</b> {isLoaded && weather.current.temperature} Celsius<br/>
        <img src={isLoaded ? weather.current.weather_icons : undefined} alt="flag" height="50"></img> <br/>
        <b>wind:</b> {isLoaded && weather.current.wind_speed} mph 
        direction {isLoaded && weather.current.wind_dir}
      </div>

    </>
  )
}


//
// Maan nimi show-napin kanssa
//
const CountryShow = ({ country }) => {
  const [showCountryInfo, setCountryInfo] = useState(false)

  return (
    <>
     <div key={country.name}>{country.name}
     <button onClick={() => setCountryInfo(!showCountryInfo)}>
       show 
     </button>
     {showCountryInfo ? <Country country={country} /> : <></>}
     </div>
    </>
  )
}


//
// Lista maista
//
const Countries = ({ countries, newFilter }) => {
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
      {countriesToShow.map(country => <CountryShow key={country.name} country={country} />)}
    </div>
  )
}

//
// Juurikomponentti
//
const App = () => {
  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ showCountryInfo, setCountryInfo ] = useState(false)

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
      <Countries countries={countries} newFilter={newFilter} showCountryInfo={showCountryInfo}
                 setCountryInfo={setCountryInfo} />
    </div>
  )
}

export default App;
