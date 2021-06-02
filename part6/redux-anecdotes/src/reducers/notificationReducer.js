export const clearNoticeAction = () => {
  return {
    type: "CLEAR",
  };
};

const noticeTimeout = {
  notice(callback, dispatch) {
    dispatch(callback());
    this.timeoutID = undefined;
  },

  setup(sec, func, dispatch) {
    if (typeof this.timeoutID === "number") {
      this.cancel();
    }
    this.timeoutID = window.setTimeout(
      () => this.notice(func, dispatch),
      1000 * sec
    );
  },

  cancel() {
    window.clearTimeout(this.timeoutID);
  },
};

const callNoticeTimeout = (time, callback, dispatch) =>
  noticeTimeout.setup(time, callback, dispatch);

// restructure this? use await somehow?
export const setNotification = (anecObj, type, sec) => {
  let message =
    anecObj.type === "upvote"
      ? "You voted up " + anecObj.content
      : "You added " + anecObj.content;

  return async (dispatch) => {
    dispatch({
      type: "NOTICE",
      anecObj: { ...anecObj, message, type },
    });
    callNoticeTimeout(sec, clearNoticeAction, dispatch);
    // setTimeout(() => dispatch(clearNoticeAction()), sec * 1000);
  };
};

const notificationReducer = (state = { notice: false }, action) => {
  switch (action.type) {
    case "NOTICE":
      console.log(action.anecObj);
      return { ...action.anecObj, notice: true };
    case "CLEAR":
      return { type: "clear", id: null, notice: false, content: null };
    default:
      return state;
  }
};

export default notificationReducer;
