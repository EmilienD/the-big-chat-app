import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './Ola.css'

const hasHandsUp = (string) => /.*🙌.*/.test(string)

export const Ola = ({ messages = [] }) => {
  const [olaCounter, setOlaCounter] = useState(0)
  const [interactionState, setInteractionState] = useState('WAITING')
  const [startMessageId, setStartMessageId] = useState(null)
  console.log(interactionState)
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
        <img
          className="ola-person"
          src="/animation/ola/204742826_2318162064983834_737642773754099933_n.png"
        />
        <img
          className="ola-person"
          src="/animation/ola/205334907_796845241007537_8171067347928755157_n.png"
        />
        <img
          className="ola-person"
          src="/animation/ola/206227299_184371836862265_6087678422532458795_n.png"
        />
        <img
          onAnimationIteration={() => {
            if (interactionState === 'ONGOING') {
              setOlaCounter(olaCounter + 1)
            }
          }}
          className="ola-person"
          src="/animation/ola/206729434_1007151996697007_855251974426690369_n.png"
        />
      </div>
    </div>
  )
}

Ola.propTypes = {
  messages: PropTypes.array,
}
