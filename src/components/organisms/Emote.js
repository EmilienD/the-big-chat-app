import React from 'react'
import PropTypes from 'prop-types'
import './Emote.css'

export const emotes = {
  dovy: {
    mimetype: 'png',
  },
  bobmoeilijk: {
    mimetype: 'png',
  },
  frankoh: {
    mimetype: 'png',
  },
  frankworstelen: {
    mimetype: 'png',
  },
  hazardburger: {
    mimetype: 'png',
  },
  theking: {
    mimetype: 'png',
  },
  sweetcaroline: {
    mimetype: 'png',
  },
  cominghome: {
    mimetype: 'png',
  },
}

const Emote = ({ name }) => {
  const emote = emotes[name]
  return emote ? (
    <img className="Emote" src={`/emotes/${name}.${emote.mimetype}`} />
  ) : null
}

Emote.propTypes = { name: PropTypes.string }

export const EmotePicker = ({ onPick }) => {
  return (
    <div className="EmotePicker">
      {Object.keys(emotes).map((key) => (
        <button type="button" key={key} onClick={() => onPick(key)}>
          <Emote name={key} />
        </button>
      ))}
      <button
        style={{ textShadow: '0 0 5px var(--outer-space-crayola)' }}
        type="button"
        onClick={() => onPick('🙌')}
      >
        🙌
      </button>
    </div>
  )
}
EmotePicker.propTypes = { onPick: PropTypes.func }

export default Emote
