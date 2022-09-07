import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
    return fetch('http://127.0.0.1:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

const Login = ({setToken}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await loginUser({
            email,
            password
        });

        console.log(token);

        setToken(token.token);
    }

  return (
    <div className='login-wrapper'>
        <p>Please Log In</p>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Email</p>
                <input type="text" name="email" onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login;

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}