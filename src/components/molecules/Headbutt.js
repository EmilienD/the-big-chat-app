import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './Headbutt.css'

export const Headbutt = ({ messages }) => {
  const [{ status, data }, setAnimationState] = useState({ status: 'WAITING' })
  const lastMessage = messages[messages.length - 1]
  useEffect(() => {
    if (lastMessage) {
      switch (status) {
        case 'WAITING':
          if (lastMessage.type === 'headbutt') {
            setAnimationState({ status: 'STARTED', data: lastMessage })
          }
          break
        case 'DONE':
          if (lastMessage.id !== data.id) {
            setAnimationState({ status: 'WAITING' })
          }
      }
    }
  }, [lastMessage, status])
  return status === 'STARTED' ? (
    <div className={cx('Headbutt', { active: status === 'STARTED' })}>
      <div className="Headbutt-container">
        <div className="player Materazzi">
          <img src="/animation/headbutt/Marco.png" />
          <p>{lastMessage && lastMessage.content}</p>
        </div>
        <div
          className="player Zidane"
          onAnimationEnd={() => setAnimationState({ status: 'DONE', data })}
        >
          <img src="/animation/headbutt/Zinedine.png" />
          <p>{lastMessage && lastMessage.nickname}</p>
        </div>
      </div>
    </div>
  ) : null
}

Headbutt.propTypes = {
  messages: PropTypes.array,
}
