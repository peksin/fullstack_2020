import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from './reducers/anecdoteReducer'


// const NewAnecdote = (props) => {
//   const dispatch = useDispatch()


// }


const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  const vote = (id) => {
    dispatch({
      type: 'ADD_VOTE',
      id: `${id}`
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App