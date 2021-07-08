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
  return (
    <div className={cx('Headbutt', { active: status === 'STARTED' })}>
      <div className="Headbutt-container">
        <div className="player Materazzi">
          <img src="/animation/headbutt/Marco.png" />
          <br />
          {lastMessage && lastMessage.content}
        </div>
        <div
          className="player Zidane"
          onAnimationEnd={() => setAnimationState({ status: 'DONE', data })}
        >
          <img src="/animation/headbutt/Zinedine.png" />
          <br />
          {lastMessage && lastMessage.nickname}
        </div>
      </div>
    </div>
  )
}

Headbutt.propTypes = {
  messages: PropTypes.array,
}
