import React from 'react'
import PropTypes from 'prop-types'

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
}

const Emote = ({ name }) => {
  const emote = emotes[name]
  return emote ? (
    <img className="Emote" src={`/emotes/${name}.${emote.mimetype}`} />
  ) : null
}

Emote.propTypes = { name: PropTypes.string }

export default Emote
