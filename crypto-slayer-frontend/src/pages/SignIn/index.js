import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { Wrapper, LoginContainer, InputField, Register, StyledButton } from './styles'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  onEmailChange = e => {
    const email = e.target.value
    this.setState({ email })
  }

  onPasswordChange = e => {
    const password = e.target.value
    this.setState({ password })
  }

  onSubmit = () => {
    const { email, password } = this.state
    const { history } = this.props

    axios
      .post('http://localhost:4000/signIn', {
        email,
        password
      })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        history.push('/assets')
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    return (
      <Wrapper>
        <LoginContainer>
          <InputField onChange={e => this.onEmailChange(e)} placeholder="E-Mail" />

          <InputField onChange={e => this.onPasswordChange(e)} type="password" placeholder="Password" />
          <StyledButton onClick={() => this.onSubmit()}>Sign In</StyledButton>
          <Link to="/signup" style={{ backgroundColor: 'transparent' }}>
            <Register>Sign Up</Register>
          </Link>
        </LoginContainer>
      </Wrapper>
    )
  }
}

export default SignIn
