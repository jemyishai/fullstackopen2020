const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
    notice: false
  }
}

// export const initialState = anecdotesAtStart.map(asObject)

export const addOneAction = (id) => {
  return {
    type:'ADD_ONE',
    id
  }
}

export const addAnecdote = (data) => {
  return {
    type:'ADD_SAYING',
    data
  }
}

export const initializeAnecdotes = (data) => {
  return {
    type: 'INIT_ANEC',
    data
  }
}

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log({action})
  switch (action.type) {
    case 'ADD_ONE':
      return [...state.map(anecdote => {
        if (anecdote.id === action.id){
          return {...anecdote, votes: anecdote.votes+1}
        } else{
          return anecdote
        }
      })]
    case 'ADD_SAYING':
       return [...state,action.data]
    case 'INIT_ANEC':
      return action.data
    default: return state
  }
}

export default anecdoteReducer
