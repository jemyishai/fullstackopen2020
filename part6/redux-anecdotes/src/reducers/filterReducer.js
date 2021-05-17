export const newInputAction = (input) => {
  return {
    type: "TEXT_TO_FILTER",
    input
  };
};


const filterReducer = (state = '', action) => {
  switch (action.type) {
    case "TEXT_TO_FILTER":
      return action.input
    default: return state
  }
};

export default filterReducer;
