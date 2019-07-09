import styled from 'styled-components'
import bgImage from '../../assets/bgImage.jpg'

export const Wrapper = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 10px;
  background-color: transparent;
`

export const LoginContainer = styled.div`
  width: 400px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 0px 238px 14px rgba(5, 5, 5, 1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const InputField = styled.input`
  width: 300px;
  height: 55px;
  border: 1px solid ${props => (props.borderColor ? props.borderColor : '#dce0e0')};
  border-radius: 35px;
  outline: none;
  color: white;
  padding: 10px 30px;
  font-size: 16px;
  background-color: transparent;
  margin-top: 30px;
`

export const Register = styled.div`
  color: white;
  margin-top: 20px;
  font-weight: bold;
  background-color: transparent;
  letter-spacing: 0.7px;
  cursor: pointer;
`

export const InputWrapper = styled.div`
  position: relative;
  background-color: transparent;
`

export const StyledButton = styled.div`
  background: #ff5a5f;
  border-radius: 35px;
  border: 0;
  color: white;
  font-size: 16px;
  height: 48px;
  text-align: center;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 0 30px;
  letter-spacing: 0.7px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.1);
  &:hover {
    cursor: pointer;
  }
`
