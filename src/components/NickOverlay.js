import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NickOverlay.css'

export const NickOverlay = ({ setNick }) => {
  const [name, setName] = useState('')
  return (
    <div className="NickOverlay-wrapper">
      <h2>Pick a nick</h2>
      <form
        onSubmit={(ev) => {
          ev.preventDefault()
          setNick({
            name,
            color: `hsl(${(Math.random() * 360).toFixed(0)}, 100%, 50%)`,
          })
        }}
        method=""
      >
        <label htmlFor="name">Nickname:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <span></span>
        <button>done</button>
      </form>
    </div>
  )
}

NickOverlay.propTypes = {
  setNick: PropTypes.func,
}
