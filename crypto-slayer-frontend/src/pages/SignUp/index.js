import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Wrapper, LoginContainer, InputField, Register, StyledButton } from './styles'

class SignUp extends Component {
  state = {
    email: '',
    password: ''
  }

  onEmailChange(e) {
    const email = e.target.value
    this.setState({ email })
  }

  onPasswordChange(e) {
    const password = e.target.value
    this.setState({ password })
  }

  onSubmit() {
    const { email, password } = this.state
    const { history } = this.props

    axios
      .post('http://localhost:4000/signUp', {
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
          <StyledButton onClick={() => this.onSubmit()}>Sign Up</StyledButton>
          <Link to="/signin" style={{ backgroundColor: 'transparent' }}>
            <Register>Sign In</Register>
          </Link>
        </LoginContainer>
      </Wrapper>
    )
  }
}

export default SignUp
