// should I call this entire action or just dispatch what I have? Delete it?
export const clearNoticeAction = () => {
  return {
    type: "CLEAR",
  };
};

// restructure this? use await somehow?
export const setNotification = (anecObj, type, sec) => {
  return async (dispatch) => {
    dispatch({
      type: "NOTICE",
      anecObj: { ...anecObj, type },
    });
    setTimeout(() => dispatch({ type: "CLEAR" }), sec * 1000);
  };
};

const notificationReducer = (state = { notice: false }, action) => {
  switch (action.type) {
    case "NOTICE":
      return { ...action.anecObj, notice: true };
    case "CLEAR":
      return { type: "clear", id: null, notice: false, content: null };
    default:
      return state;
  }
};

export default notificationReducer;
