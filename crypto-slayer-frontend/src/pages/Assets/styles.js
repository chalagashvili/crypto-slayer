import styled from 'styled-components'

export const Records = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);
  margin: auto;
  margin-top: 70px;
  padding: 15px 0;
  width: 650px;
`

export const StyledButton = styled.div`
  background: #ff5a5f;
  border-radius: 35px;
  border: 0;
  color: white;
  height: 32px;
  text-align: center;
  width: 140px;
  margin-left: 430px;
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

export const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
`

export const Popup = styled.div`
  background-color: white;
  width: 400px;
  margin: auto;
  margin-top: 150px;
  border-radius: 5px;
  padding: 30px;
`

export const Pointer = styled.div`
  cursor: pointer;
`

export const DropDown = styled.div`
  width: 350px;
  height: 300px;
  border: 1px solid grey;
  overflow: scroll;
  margin-top: 10px;
`

export const MyAssets = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  width: 100%;
`

export const Name = styled.div`
  flex: 2;
  margin-left: 25px;
`

export const TextInput = styled.input`
  flex: 2;
  margin-right: 45px;
  outline: none;
  max-width: 200px;
`
