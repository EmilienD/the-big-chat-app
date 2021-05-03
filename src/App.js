import React, { useState, useRef } from 'react'
import './App.css'
import { v4 } from 'uuid'
import { NickOverlay } from './components/NickOverlay'

import { useEffect } from 'react'
import MessageList from './components/MessageList'
import ChatInputForm from './components/ChatInputForm'
import { conf } from './config'

const fifo = (limit) => (array) => (item) =>
  array.length === limit ? array.slice(1).concat(item) : array.concat(item)
const fifo500 = fifo(500)

function App() {
  const room = location.pathname.split('/')[1] || ''
  const incomingMessages = useRef(null)
  const outgoingMessages = useRef(null)
  const [messages, setMessages] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [isNickOverlayOpen, setNickOverlayOpen] = useState(false)
  const addMessage = fifo500(messages)
  useEffect(() => {
    incomingMessages.current = new WebSocket(
      `${conf.reactAppIncomingDataUrl}/${room}`
    )
    outgoingMessages.current = new WebSocket(
      `${conf.reactAppOutgoingDataUrl}/${room}`
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
    <>
      <div className="App-messagelistcontainer">
        <MessageList messages={messages} user={user} />
      </div>
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
          } else {
            setNickOverlayOpen(true)
          }
        }}
      />
      {isNickOverlayOpen && (
        <NickOverlay
          setNick={(nick) => {
            const createdUser = {
              id: user ? user.id : v4(),
              ...nick,
            }
            localStorage.setItem('user', JSON.stringify(createdUser))
            setUser(createdUser)
            setNickOverlayOpen(false)
          }}
        />
      )}
    </>
  )
}

export default App
