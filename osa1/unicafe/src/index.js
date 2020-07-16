import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        no feedback given<br/>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      good {good}<br/>
      neutral {neutral}<br/>
      bad {bad}<br/>
      all {good + neutral + bad} <br/>
      average {(good + -1 * bad) / all} <br/>
      positive {good / all * 100} %
    </div>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)