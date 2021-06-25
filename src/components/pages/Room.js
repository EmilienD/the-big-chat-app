import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './Room.css'
import { v4 } from 'uuid'

import { useEffect } from 'react'
import MessageList from '../organisms/MessageList'
import ChatInputForm from '../organisms/ChatInputForm'
import { conf } from '../../config'
import { Ola } from '../molecules/Ola'

const fifo = (limit) => (array) => (item) =>
  array.length === limit ? array.slice(1).concat(item) : array.concat(item)
const fifo500 = fifo(500)

export const Room = ({ roomName = 'main', user }) => {
  const incomingMessages = useRef(null)
  const outgoingMessages = useRef(null)
  const [messages, setMessages] = useState([])
  const addMessage = fifo500(messages)
  useEffect(() => {
    incomingMessages.current = new WebSocket(
      `${conf.reactAppIncomingDataUrl}/${roomName}`
    )
    outgoingMessages.current = new WebSocket(
      `${conf.reactAppOutgoingDataUrl}/${roomName}`
    )
    return () => {
      incomingMessages.current.close()
      outgoingMessages.current.close()
    }
  }, [])
  useEffect(() => {
    const onMessage = (message) =>
      setMessages(addMessage(JSON.parse(message.data)))
    if (incomingMessages.current) {
      incomingMessages.current.addEventListener('message', onMessage)
      return () =>
        incomingMessages.current.removeEventListener('message', onMessage)
    }
  }, [messages, incomingMessages])
  return (
    <div className="Room-container">
      <div className="Room-messagelistcontainer">
        <MessageList messages={messages} user={user} />
      </div>
      <Ola messages={messages} />
      <ChatInputForm
        postMessage={(message) => {
          if (!message) {
            return
          } else if (user) {
            outgoingMessages.current.send(
              JSON.stringify({
                ...user,
                userId: user.id,
                id: v4(),
                datetime: new Date(),
                content: message,
              })
            )
          }
        }}
      />
    </div>
  )
}
Room.propTypes = {
  roomName: PropTypes.string,
  user: PropTypes.object,
}
