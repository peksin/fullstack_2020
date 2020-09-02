import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
  }

  return (
    <div key={anecdote.id}>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote.id)}>vote</button>
    </div>
  </div>
  )
}


const Anecdotes = () => {

  const anecdotes = useSelector(state => state.anecdotes)

  return (
    <div>
      {anecdotes.sort((a, b) => {
        return b.votes - a.votes
      })
      .map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
    )}
    </div>

  )
}

export default Anecdotes