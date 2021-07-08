import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Room.css'
import { v4 } from 'uuid'

import { useEffect } from 'react'
import MessageList from '../organisms/MessageList'
import ChatInputForm from '../organisms/ChatInputForm'
import { conf } from '../../config'
import { Ola } from '../molecules/Ola'
import { Crown } from '../molecules/Crown'
import useWebSocket from 'react-use-websocket'

const fifo = (limit) => (array) => (item) =>
  array.length === limit ? array.slice(1).concat(item) : array.concat(item)
const fifo500 = fifo(500)

export const Room = ({ roomName = 'main', user, setCrown }) => {
  const incomingMessages = useWebSocket(
    `${conf.reactAppIncomingDataUrl}/${roomName}`
  )
  const outgoingMessages = useWebSocket(
    `${conf.reactAppOutgoingDataUrl}/${roomName}`
  )
  const [messages, setMessages] = useState([])
  const addMessage = fifo500(messages)
  useEffect(() => {
    const lastMessage = JSON.parse(
      incomingMessages.lastMessage && incomingMessages.lastMessage.data
    )
    if (
      lastMessage &&
      lastMessage.id !==
        (messages[messages.length - 1] && messages[messages.length - 1].id)
    ) {
      setMessages(addMessage(lastMessage))
    }
  }, [messages, incomingMessages.lastMessage])
  useEffect(() => {
    fetch(`${conf.reactAppUserServiceUrl}/messages/${roomName}`)
      .then((response) => response.json())
      .then((body) => {
        const bodyMessagesIdMap = body.messages.reduce((acc, { message }) => {
          acc[message.id] = message
          return acc
        }, {})
        setMessages([
          ...body.messages.reverse().map(({ message }) => message),
          ...messages.filter((message) => !bodyMessagesIdMap[message.id]),
        ])
      })
  }, [])
  return (
    <div className="Room-container">
      <div className="Room-messagelistcontainer">
        <MessageList
          messages={messages}
          user={user}
          sendAnswer={(content) => {
            outgoingMessages.sendMessage(
              JSON.stringify({
                ...user,
                userId: user.id,
                id: v4(),
                datetime: new Date(),
                content,
                type: 'answer',
              })
            )
          }}
        />
      </div>
      <Ola messages={messages} />
      <Crown messages={messages} setCrown={setCrown} user={user} />
      <ChatInputForm
        postMessage={(message) => {
          if (!message) {
            return
          } else if (user) {
            const [hasCommand, command, content] =
              /\/(poll|crown) (.+)/.exec(message) || []
            // User has a crown since less than 30 minutes
            const isKing =
              user.crown && Date.now() - 1800000 < new Date(user.crown.datetime)
            outgoingMessages.sendMessage(
              JSON.stringify({
                nickname: user.nickname,
                color: user.color,
                decorate: isKing ? ['theking'] : [],
                userId: user.id,
                id: v4(),
                datetime: new Date(),
                content: hasCommand ? content : message,
                type: hasCommand ? command : 'message',
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
  setCrown: PropTypes.func,
}
