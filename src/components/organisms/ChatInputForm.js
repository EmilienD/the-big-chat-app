import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import EmojiPicker from 'emoji-picker-react'
import './ChatInputForm.css'
import { SendIcon } from '../molecules/SendIcon'
import { SmileyIcon } from '../molecules/SmileyIcon'

const placeholders = [
  'Talk to the plebes, my lord...',
  `They're wrong, and you should tell them...`,
  `The problem is communication...`,
  `Confide your darkest secret to the cloud...`,
  `Speak freely, everyone else on here is a bot...`,
  `They're all waiting for you to talk...`,
]
const placeholder =
  placeholders[(Math.random() * (placeholders.length - 1)).toFixed(0)]

const ChatInputForm = ({ postMessage }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const textareaRef = useRef(null)
  const handleSubmit = (ev) => {
    ev.preventDefault()
    postMessage(currentMessage)
    setCurrentMessage('')
    textareaRef.current.focus()
  }
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [textAreaSelection, setTextAreaSelection] = useState([0, 0])
  return (
    <form className="ChatInputForm" method="" onSubmit={handleSubmit}>
      <textarea
        placeholder={placeholder}
        ref={textareaRef}
        className="ChatInputForm-input"
        name="messageInput"
        value={currentMessage}
        type="text"
        onFocus={() => setShowEmojiPicker(false)}
        onBlur={() => {
          const textarea = textareaRef.current
          setTextAreaSelection([textarea.selectionStart, textarea.selectionEnd])
        }}
        onChange={(ev) => {
          ev.preventDefault()
          const val = ev.target.value
          if (/(\n|\r)/.test(val)) {
            handleSubmit(ev)
          } else {
            setCurrentMessage(val)
          }
        }}
      ></textarea>
      <div>
        <button
          type="button"
          className="ChatInputForm-button toggle-emoji-picker-button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <SmileyIcon />
        </button>
      </div>
      <button className="ChatInputForm-button">
        <SendIcon />
      </button>

      {showEmojiPicker && (
        <EmojiPicker
          pickerStyle={{
            width: 'calc(100% - 3em)',
            position: 'absolute',
            bottom: '100%',
            boxShadow: 'none',
          }}
          onEmojiClick={(ev, { emoji }) => {
            setCurrentMessage(
              `${currentMessage.slice(
                0,
                textAreaSelection[0]
              )}${emoji}${currentMessage.slice(textAreaSelection[1])}`
            )
            const newSelectionIndex = textAreaSelection[0] + emoji.length
            setTextAreaSelection([newSelectionIndex, newSelectionIndex])
          }}
          disableSkinTonePicker
          native
        />
      )}
    </form>
  )
}

ChatInputForm.propTypes = {
  postMessage: PropTypes.func,
}

export default ChatInputForm
