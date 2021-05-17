export const setNoticeAction = (id) => {
  return {
    type: "VOTED_UP",
    id,
  };
};

export const clearNoticeAction = () => {
  return {
    type: "CLEAR"
  };
};


export const newSayingAction = (saying) => {
  return {
    type: "ADDED_NEW",
    saying
  };
};


const notificationReducer = (state = {type: null, content:null, id: null, notice: false}, action) => {
  switch (action.type) {
    case "VOTED_UP":
      return {type:'upvote', id: action.id,notice:true, content: null}
    case "CLEAR":
      return {type:'clear', id: null,notice:false,content: null}
    case "ADDED_NEW":
      return {type:'added_new', id: action.id,notice:true,content: action.saying}
    default: return state
  }
};

export default notificationReducer;
