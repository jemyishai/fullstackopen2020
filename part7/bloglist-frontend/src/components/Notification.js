import React from 'react'

const Notification = ({ notification, notificationType }) => {
  if (notification === null) {
    return null
  }

  return <div className={notificationType} data-cy="notification">{notification}</div>
}

export default Notification
