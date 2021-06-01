import anecdoteService from "../services/anecdotes";


//is this OK - do I need to use the return object?
export const addOneAction = (id, anecdoteToBeUpdated) => {
  return async (dispatch) => {
    let tempVotes = anecdoteToBeUpdated.votes;
    const updatedObject = { ...anecdoteToBeUpdated, votes: tempVotes + 1 };
    const update = await anecdoteService.update(id, updatedObject);
    dispatch({
      type: "ADD_ONE",
      id,
    });
  };
};

export const addAnecdote = (saying) => {
  return async (dispatch) => {
    const data = await anecdoteService.create(saying);
    dispatch({
      type: "ADD_SAYING",
      data,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANEC",
      data,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ONE":
      return [
        ...state.map((anecdote) => {
          if (anecdote.id === action.id) {
            return { ...anecdote, votes: anecdote.votes + 1 };
          } else {
            return anecdote;
          }
        }),
      ];
    case "ADD_SAYING":
      return [...state, action.data];
    case "INIT_ANEC":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
