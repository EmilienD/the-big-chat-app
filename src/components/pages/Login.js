import './Login.css'
import { conf } from '../../config'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import { v4 } from 'uuid'

export const Login = ({ onLogin }) => {
  const [error, setError] = useState(null)
  return (
    <>
      <h1>Welcome to Rakabo!</h1>
      <Form
        onSubmit={async (values) => {
          const res = await fetch(`${conf.reactAppUserServiceUrl}/users`, {
            method: 'POST',
            body: JSON.stringify({ user: { ...values, id: v4() } }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
          })
          const body = await res.json()
          if (res.ok) {
            console.log(body)
            onLogin(body.user)
          } else {
            setError('Could not login, try again')
          }
        }}
      >
        {({ handleSubmit }) => (
          <form className="login-form" onSubmit={handleSubmit}>
            <Field type="text" component="input" name="nickname" />
            <button>Join chat</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        )}
      </Form>
    </>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func,
}
