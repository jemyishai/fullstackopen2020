import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNoticeAction } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notice);
  const anecdotes = useSelector((state) => state.anecdote);
  const dispatch = useDispatch();
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  const noticeAndClear = () => {
    setTimeout(() => dispatch(clearNoticeAction()), 5000);
  };

  let message =
    notification.type === "upvote"
      ? "You voted up " +
        anecdotes.find((saying) => saying.id === notification.id).content
      : "You added " + notification.content;

  return notification.notice ? (
    <div style={style}>
      {notification && notification.notice ? message : null}
      {!notification.notice ? null : noticeAndClear()}
    </div>
  ) : null;
};

export default Notification;
