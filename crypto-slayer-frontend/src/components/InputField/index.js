import React, { Component } from 'react'

class InputField extends Component {
  render() {
    const { changeHandler, value, identifier } = this.props

    return (
      <div>
        <input value={value} onChange={e => changeHandler(identifier, e.target.value)} />
      </div>
    )
  }
}

export default InputField
