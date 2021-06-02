import React from "react";
// import { useSelector } from "react-redux";
import { connect } from "react-redux";

const Notification = ({ notification }) => {
  // const notification = useSelector((state) => state.notice);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return notification.notice ? (
    <div style={style}>{notification.notice ? notification.message : null}</div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notice,
  };
};

export default connect(mapStateToProps, null)(Notification);
