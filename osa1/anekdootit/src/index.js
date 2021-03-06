import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const MostVotes = ({ anecdotes, votes }) => {
  // etsii suurimman aanimaaran sijainnin
  const mostVotes = votes.indexOf(Math.max(...votes))

  return (
    <>
      <h1>
        Anecdote with most votes
      </h1>
      {anecdotes[mostVotes]} <br/>
      has {votes[mostVotes]} votes
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length))
        .map(Number.prototype.valueOf,0))

  const handleNext = () => {
    setSelected (Math.floor(Math.random() * Math.floor(anecdotes.length)))
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      {props.anecdotes[selected]} <br/>
      has {votes[selected]} votes <br/>
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleNext} text='next anecdote' />
      <MostVotes anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)