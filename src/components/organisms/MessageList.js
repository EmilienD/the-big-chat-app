import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'markdown-to-jsx'
import Emote, { emotes } from './Emote'
import { Nickname } from '../molecules/Nickname'
import './MessageList.css'
import { Poll } from '../molecules/Poll'
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
      {messages.map(({ type, ...message }) => {
        switch (type) {
          case 'message':
            return (
              <li key={message.id} className="MessageList-item">
                <Nickname {...message} />
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
                  {message.content.replaceAll(
                    emoteRegexp,
                    (name) => `<Emote name="${name.trim()}"/>`
                  )}
                </Markdown>
              </li>
            )
          case 'poll':
            return (
              <li key={message.id}>
                <Poll
                  sendAnswer={sendAnswer}
                  pollMessage={message}
                  messages={messages}
                />
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
