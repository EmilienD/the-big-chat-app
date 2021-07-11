import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './VictorySlide.css'

const headList = [
  '/animation/victory-slide/01-head.png',
  '/animation/victory-slide/02-head.png',
  '/animation/victory-slide/03-head.png',
  '/animation/victory-slide/04-head.png',
  '/animation/victory-slide/05-head.png',
  '/animation/victory-slide/06-head.png',
  '/animation/victory-slide/07-head.png',
  '/animation/victory-slide/08-head.png',
]

const jerseys = {
  england: {
    src: '/animation/victory-slide/england-jersey.png',
    headStyle: {
      position: 'absolute',
      top: '0',
      height: '3.7em',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
  italy: {
    src: '/animation/victory-slide/italy-jersey.png',
    headStyle: {
      position: 'absolute',
      top: '2em',
      height: '3.7em',
      left: '50%',
      transform: 'translateX(-70%)',
    },
  },
}

export const VictorySlide = ({ messages }) => {
  const [{ status, head, jersey }, setCoronationState] = useState({
    status: 'WAITING',
  })
  useEffect(() => {
    const slideCommand = messages.reduce(
      (acc, m) => (m.type === 'slide' ? m : acc),
      null
    )
    console.log(slideCommand)
    switch (status) {
      case 'WAITING':
        if (
          messages[messages.length - 1] === slideCommand &&
          jerseys[slideCommand.content]
        ) {
          setCoronationState({
            status: 'IN_PROGRESS',
            head: headList[(Math.random() * headList.length).toFixed(0)],
            jersey: jerseys[slideCommand.content],
          })
        }
        break
      case 'DONE':
        if (messages[messages.length - 1] !== slideCommand) {
          setCoronationState({ status: 'WAITING' })
        }
        break
    }
  }, [messages, status])
  return status === 'IN_PROGRESS' ? (
    <div className="VictorySlide container">
      <div
        className="VictorySlide slider"
        onAnimationEnd={() => setCoronationState({ status: 'DONE' })}
      >
        <img
          src={head}
          style={jersey.headStyle}
          className="VictorySlide head"
          alt=""
        />
        <img src={jersey.src} className="VictorySlide jersey" alt="" />
      </div>
    </div>
  ) : null
}

VictorySlide.propTypes = {
  messages: PropTypes.array,
  setCrown: PropTypes.func,
  user: PropTypes.object,
}
