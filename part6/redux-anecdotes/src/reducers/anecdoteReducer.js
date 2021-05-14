export const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialState = anecdotesAtStart.map(asObject)

export const addOneAction = (id) => {
  return {
    type:'ADD_ONE',
    id
  }
}

export const addAnecdote = (saying) => {
  return {
    type:'ADD_SAYING',
    data: {
      id: getId(),
      content: saying,
      votes: 0
    }
  }
}

const reducer = (state = initialState, action) => {
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
    default: return state
  }
}

export default reducer
