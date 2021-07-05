import React from 'react'
import { Field, Form } from 'react-final-form'
import PropTypes from 'prop-types'
import './Poll.css'

export const Poll = ({ sendAnswer, pollMessage, messages }) => {
  return (
    <div className="Poll">
      <span className="Poll-introduction">I have a question for you:</span>
      <p className="Poll-question">{pollMessage.content}</p>
      <Form
        onSubmit={(values) => {
          sendAnswer({ ...values, questionId: pollMessage.id })
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field type="text" component="input" name="answer" />
            <button>answer</button>
          </form>
        )}
      </Form>
      <ul className="Poll-answers">
        {Array.from(
          messages
            .reduce((acc, message) => {
              if (
                message.type === 'answer' &&
                message.content.questionId === pollMessage.id
              ) {
                acc.set(message.userId, message)
              }
              return acc
            }, new Map())
            .values()
        ).map((answer) => (
          <li key={answer.id}>
            <span className="nick" style={{ color: answer.color }}>
              {answer.nickname}:
            </span>{' '}
            {answer.content.answer}
          </li>
        ))}
      </ul>
    </div>
  )
}

Poll.propTypes = {
  sendAnswer: PropTypes.func,
  pollMessage: PropTypes.object,
  messages: PropTypes.array,
}
