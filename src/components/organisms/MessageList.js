import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'markdown-to-jsx'
import Emote, { emotes } from './Emote'
import './MessageList.css'
import { Form, Field } from 'react-final-form'
const noRenderOverride = { component: () => null }

const MessageList = ({ messages, sendAnswer }) => {
  var emoteRegexp = new RegExp(
    `(${Object.keys(emotes)
      .map((name) => `${name}`)
      .join('|')})`,
    'g'
  )
  return (
    <ol className="MessageList">
      {messages.map(({ id, content, nickname, color, type }) => {
        switch (type) {
          case 'message':
            return (
              <li key={id} className="MessageList-item">
                <span className="nick" style={{ color }}>
                  {nickname}:
                </span>
                <Markdown
                  options={{
                    forceInline: true,
                    overrides: {
                      Emote: { component: Emote },
                      script: noRenderOverride,
                      img: noRenderOverride,
                      image: noRenderOverride,
                      video: noRenderOverride,
                    },
                  }}
                >
                  {content.replaceAll(
                    emoteRegexp,
                    (name) => `<Emote name="${name.trim()}"/>`
                  )}
                </Markdown>
              </li>
            )
          case 'poll':
            return (
              <li
                key={id}
                style={{
                  border: '1px solid orange',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255,255, 0, 0.2)',
                  padding: '0.5em 1em',
                  margin: '1em',
                }}
              >
                <span style={{ fontStyle: 'italic', fontSize: '0.7em' }}>
                  I have a question for you:
                </span>
                <p style={{ padding: '0.5em 0 0', margin: 0 }}>{content}</p>
                <Form
                  onSubmit={(values) => {
                    sendAnswer({ ...values, questionId: id })
                  }}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Field type="text" component="input" name="answer" />
                      <button>answer</button>
                    </form>
                  )}
                </Form>
                <ul style={{ padding: '0.5em 0', listStyleType: 'none' }}>
                  {Array.from(
                    messages
                      .reduce((acc, message) => {
                        if (
                          message.type === 'answer' &&
                          message.content.questionId === id
                        ) {
                          acc.set(message.userId, message)
                        }
                        return acc
                      }, new Map())
                      .values()
                  ).map((answer) => (
                    <li key={answer.id}>
                      <span className="nick" style={{ color: answer.color }}>
                        {answer.nickname}:
                      </span>{' '}
                      {answer.content.answer}
                    </li>
                  ))}
                </ul>
              </li>
            )
          default:
            return null
        }
      })}
    </ol>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
  sendAnswer: PropTypes.func,
}

export default MessageList
