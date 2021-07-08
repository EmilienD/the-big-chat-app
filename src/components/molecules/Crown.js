import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Crown.css'

export const Crown = ({ messages, setCrown, user }) => {
  const [{ status, crownCommand }, setCoronationState] = useState({
    status: 'WAITING',
  })
  useEffect(() => {
    const crownCommand = messages.reduce(
      (acc, m) => (m.type === 'crown' ? m : acc),
      null
    )
    if (crownCommand && crownCommand.content === user.nickname) {
      setCrown(crownCommand)
    }
    switch (status) {
      case 'WAITING':
        if (messages[messages.length - 1] === crownCommand) {
          setCoronationState({ status: 'IN_PROGRESS', crownCommand })
        }
        break
      case 'DONE':
        if (messages[messages.length - 1] !== crownCommand) {
          setCoronationState({ status: 'WAITING' })
        }
        break
    }
  }, [messages, status])
  return status === 'IN_PROGRESS' ? (
    <div className="Crown">
      {user.nickname === crownCommand.content ? (
        <p>You are now king of the chat! Good job!</p>
      ) : (
        <p>
          <em>{crownCommand.content}</em> is now king of the chat! Bow, you
          peasant!
        </p>
      )}
      <img
        src="/emotes/theking.png"
        onAnimationEnd={() => setCoronationState({ status: 'DONE' })}
      />
    </div>
  ) : null
}

Crown.propTypes = {
  messages: PropTypes.array,
  setCrown: PropTypes.func,
  user: PropTypes.object,
}
