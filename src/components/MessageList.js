import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'markdown-to-jsx'
import cx from 'classnames'
import Emote, { emotes } from './Emote'
import './MessageList.css'

const noRenderOverride = { component: () => null }

const MessageList = ({ messages, user }) => {
  var emoteRegexp = new RegExp(
    `(${Object.keys(emotes)
      .map((name) => `${name}`)
      .join('|')})`,
    'g'
  )
  return (
    <ol className="MessageList">
      {messages.map(({ id, content, name, userId, color }) => (
        <li
          key={id}
          className={cx('MessageList-item', {
            self: user && user.id === userId,
          })}
        >
          <span className="nick" style={{ color }}>
            {name}:
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
      ))}
    </ol>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
}

export default MessageList
