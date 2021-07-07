import React from 'react'
import Emote, { emotes } from '../organisms/Emote'
import PropTypes from 'prop-types'
import './Nickname.css'

export const Nickname = ({ decorate, color, nickname }) => {
  return (
    <span className="Nickname" style={{ color: color }}>
      {(decorate || []).map((item) =>
        emotes[item] ? <Emote name={item} key={item} /> : item
      )}
      {nickname}:
    </span>
  )
}

Nickname.propTypes = {
  decorate: PropTypes.string,
  color: PropTypes.string,
  nickname: PropTypes.string,
}
