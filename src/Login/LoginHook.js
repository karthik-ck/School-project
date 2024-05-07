import { useState } from 'react'
import AuthService from '../Services/AuthService'
import { useNavigate } from 'react-router-dom'

function LoginHook() {
  const navigate = useNavigate()

  const [instId, setInstId] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [emailValid, setEmailValid] = useState(false)

  const handleChange = (e) => {
    if (e.target.name === 'instId') {
      setInstId(e.target.value)
    }
    if (e.target.name === 'username') {
      setUsername(e.target.value)
      let pattern = /\S+@\S+\.\S+/;
      if (username && pattern.test(username)) {
        setEmailValid(true)
      } else {
        setEmailValid(false)
      }
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const submit = (e) => {
    setSubmitted(true)
    if (instId && username && password) {
      setSubmitted(false)
      AuthService.login(instId, username, password)
        .then((response) => {
          if (response.status === 200) {
            alert('Login successful', 'success');
            localStorage.setItem("token", response.data.data.access_token)
            navigate('home')
          } else {
            alert('Invalid Credentials', 'error');
          }
        })
        .catch((error) => {
          alert('Invalid Credentials.', 'error');
        });
    }
  }

  return {
    instId,
    username,
    password,
    handleChange,
    submit,
    submitted,
    emailValid
  }
}

export default LoginHook
