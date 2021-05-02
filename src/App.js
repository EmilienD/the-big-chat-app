import Markdown from 'markdown-to-jsx'
import React, { useState } from 'react'
import './App.css'
import cx from 'classnames'
import { v4 } from 'uuid'

import { useEffect } from 'react'

const incomingMessages = new WebSocket(process.env.REACT_APP_INCOMING_DATA_URL)
const outgoingMessages = new WebSocket(process.env.REACT_APP_OUTGOING_DATA_URL)
const fifo = (limit) => (array) => (item) =>
  array.length === limit ? array.slice(1).concat(item) : array.concat(item)
const fifo500 = fifo(500)
const user = { userId: v4(), userName: 'Emil' }

function App() {
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')
  const addMessage = fifo500(messages)
  useEffect(() => {
    const onMessage = (message) =>
      setMessages(addMessage(JSON.parse(message.data)))

    incomingMessages.addEventListener('message', onMessage)
    return () => incomingMessages.removeEventListener('message', onMessage)
  }, [messages])
  return (
    <>
      <div className="App-messagelistcontainer">
        <ol className="App-messagelist">
          {messages.map(({ id, content, userName, userId }) => (
            <li
              key={id}
              className={cx('App-messagelistitem', {
                self: user.userId === userId,
              })}
              data-username={userName}
            >
              <Markdown>{content}</Markdown>
            </li>
          ))}
        </ol>
      </div>
      <form
        className="App-textinput"
        method=""
        onSubmit={(e) => {
          e.preventDefault()
          outgoingMessages.send(
            JSON.stringify({
              ...user,
              id: v4(),
              datetime: new Date(),
              content: currentMessage,
            })
          )
          setCurrentMessage('')
        }}
      >
        <input
          value={currentMessage}
          type="text"
          onChange={(e) => {
            e.preventDefault()
            setCurrentMessage(e.target.value)
          }}
        />
        <button>send</button>
      </form>
    </>
  )
}

export default App
