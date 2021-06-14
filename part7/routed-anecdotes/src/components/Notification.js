import React from "react";

const Notification = ({ notification, setNotification }) => {
  const style = {
    border: "5px solid red",
  };

  setTimeout(() => setNotification(""), 10000);
  return <div style={style}>{notification}</div>;
};

export default Notification;
