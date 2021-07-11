import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './Ola.css'

const hasHandsUp = (string) => /.*🙌.*/.test(string)
const waverList = [
  'ola0.png',
  'ola1.png',
  'ola2.png',
  'ola3.png',
  'ola4.png',
  'ola5.png',
  'ola6.png',
  'ola7.png',
]

export const Ola = ({ messages = [] }) => {
  const [olaCounter, setOlaCounter] = useState(0)
  const [interactionState, setInteractionState] = useState('WAITING')
  const [startMessageId, setStartMessageId] = useState(null)
  const [wavers, setWavers] = useState(waverList.slice(0, 4))
  useEffect(() => {
    const newestToOldestMessages = [...messages].reverse()
    switch (interactionState) {
      case 'WAITING':
        {
          const triggerMessageIndex =
            newestToOldestMessages.findIndex(
              ({ content }) => !hasHandsUp(content)
            ) - 1
          if (triggerMessageIndex >= 2) {
            setInteractionState('ONGOING')
            setWavers(
              [...waverList].sort(() => 0.5 - Math.random()).slice(0, 4)
            )
            setStartMessageId(newestToOldestMessages[triggerMessageIndex].id)
          }
        }
        break

      case 'ONGOING':
        {
          let handsUp = 0
          for (const { content, id } of newestToOldestMessages) {
            if (hasHandsUp(content)) {
              handsUp += 1
            }
            if (id === startMessageId) {
              break
            }
          }
          if (olaCounter >= handsUp) {
            setInteractionState('STOPPED')
            setOlaCounter(0)
          }
        }
        break
      case 'STOPPED':
        if (!hasHandsUp(newestToOldestMessages[0].content)) {
          setInteractionState('WAITING')
        }
    }
  }, [olaCounter, messages, interactionState])

  return (
    <div
      className={cx(
        { active: interactionState === 'ONGOING' },
        'ola-container'
      )}
    >
      <div>
        <img className="ola-person" src={`/animation/ola/${wavers[0]}`} />
        <img className="ola-person" src={`/animation/ola/${wavers[1]}`} />
        <img className="ola-person" src={`/animation/ola/${wavers[2]}`} />
        <img
          onAnimationIteration={() => {
            if (interactionState === 'ONGOING') {
              setOlaCounter(olaCounter + 1)
            }
          }}
          className="ola-person"
          src={`/animation/ola/${wavers[3]}`}
        />
      </div>
    </div>
  )
}

Ola.propTypes = {
  messages: PropTypes.array,
}
