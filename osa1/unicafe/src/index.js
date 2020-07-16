import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // hyva palaute
  const handleGoodClick = () => { 
    setGood(good + 1)
  }

  // neutraali palaute
  const handleNeutralClick = () => { 
    setNeutral(neutral + 1)
  }

  // huono palaute
  const handleBadClick = () => { 
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
)