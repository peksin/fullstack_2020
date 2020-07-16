import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  // hyva palaute
  const handleGoodClick = () => { 
    setGood(good + 1)
  }

  // neutraali palaute
  const handleNeutralClick = () => { 
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  // huono palaute
  const handleBadClick = () => { 
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      good {good}<br/>
      neutral {neutral}<br/>
      bad {bad}<br/>
      all {good + neutral + bad}<br/>
      average {(good + -1 * bad) / (good + neutral + bad)}<br/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)