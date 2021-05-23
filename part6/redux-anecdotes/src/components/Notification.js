import React from "react";
import { useSelector } from "react-redux";


const Notification = () => {
  const notification = useSelector((state) => state.notice);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  // move this to action creator
  let message =
    notification.type === "upvote"
      ? "You voted up " +
        notification.content
      : "You added " + notification.content;

  return notification.notice ? (
    <div style={style}>
      {notification.notice ? message : null}
    </div>
  ) : null;
};

export default Notification;
