import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Records, StyledButton, DropDown, MyAssets, TextInput, Name, Pointer, Popup, Overlay } from './styles'
import assetsBg from '../../assets/assetsBg.jpg'

class SignIn extends Component {
  state = {
    assetsPage: 1,
    instrumentsPage: 1,
    selectedAsset: null,
    currentAssets: [],
    instruments: [],
    adding: false,
    showingInstruments: false,
    newAsset: null,
    assetAmount: null,
    changedAmount: null,
    editing: null
  }

  componentDidMount() {
    this.retreiveMyAssets()
    this.getAssets()
  }

  getAssets = () => {
    const { instrumentsPage, instruments } = this.state
    axios
      .get(`http://localhost:4000/getInstruments/${instrumentsPage}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(response => {
        console.log(response.data.instruments)
        this.setState({
          instruments: [...instruments, ...response.data.instruments],
          instrumentsPage: instrumentsPage + 1
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  retreiveMyAssets = () => {
    const { assetsPage, currentAssets } = this.state

    axios
      .get(`http://localhost:4000/getAssets/${assetsPage}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(response => {
        console.log(response.data.results.docs)
        this.setState({ currentAssets: [...currentAssets, ...response.data.results.docs], assetsPage: assetsPage + 1 })
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteAsset = id => {
    axios({
      method: 'delete',
      url: 'http://localhost:4000/removeAsset',
      headers: { authorization: localStorage.getItem('token') },
      data: { assetId: id }
    })
      .then(() => {
        const assets = this.state.currentAssets
        const removeIndex = assets
          .map(item => {
            return item._id
          })
          .indexOf(id)
        assets.splice(removeIndex, 1)
        this.setState({ currentAssets: assets })
      })
      .catch(error => {
        console.log(error)
      })
  }

  editAsset = () => {
    const { name, amount, id } = this.state.editing
    console.log(name, amount, id)
    axios({
      method: 'put',
      url: 'http://localhost:4000/editAsset',
      headers: { authorization: localStorage.getItem('token') },
      data: { assetId: id, name, amount }
    })
      .then(() => {
        this.setState({ editing: null })
      })
      .catch(error => {
        console.log(error)
      })
  }

  addAsset = () => {
    const { currentAssets, selectedAsset, assetAmount } = this.state
    const asset = { name: selectedAsset, amount: assetAmount }

    axios({
      method: 'post',
      url: 'http://localhost:4000/addAsset',
      headers: { authorization: localStorage.getItem('token') },
      data: asset
    })
      .then(response => {
        asset._id = response.data.id
        this.setState({
          currentAssets: [asset, ...currentAssets],
          adding: false,
          selectedAsset: null,
          assetAmount: null
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { currentAssets, instruments, adding, showingInstruments, selectedAsset, changedAmount } = this.state

    return (
      <div
        style={{
          position: 'relative',
          backgroundImage: `url(${assetsBg})`,
          backgroundSize: 'cover',
          minHeight: '100vh',
          paddingBottom: 40
        }}
      >
        {adding && (
          <Overlay>
            <Popup>
              <Pointer onClick={() => this.setState({ showingInstruments: true })}>
                {selectedAsset || 'Select Asset'}
              </Pointer>
              <input
                style={{ marginTop: 15 }}
                placeholder="Amount"
                type="number"
                onChange={e => this.setState({ assetAmount: e.target.value })}
              />
              {showingInstruments && (
                <DropDown>
                  {instruments.map(instrument => {
                    return (
                      <Pointer
                        key={instrument}
                        onClick={() => this.setState({ selectedAsset: instrument, showingInstruments: false })}
                      >
                        {instrument}
                      </Pointer>
                    )
                  })}
                </DropDown>
              )}
              <div style={{ marginTop: 15, cursor: 'pointer' }} onClick={() => this.addAsset()}>
                Add
              </div>
            </Popup>
          </Overlay>
        )}
        <div onClick={() => this.setState({ adding: true })}>Add</div>
        <div>
          <Records>
            <div onClick={() => this.setState({ adding: true })}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                style={{ color: 'limegreen', cursor: 'pointer', width: 25, height: 25, marginLeft: 35 }}
              />
            </div>
            {currentAssets.map(asset => {
              const editing = asset._id === (this.state.editing && this.state.editing.id)

              return (
                <MyAssets key={asset._id}>
                  <Name>{asset.name}</Name>
                  <TextInput
                    type="number"
                    defaultValue={asset.amount}
                    onChange={e =>
                      this.setState({ editing: { name: asset.name, amount: e.target.value, id: asset._id } })
                    }
                  />
                  <div
                    style={{ flex: 1, cursor: editing && 'pointer', color: editing ? 'green' : 'grey' }}
                    onClick={() => (editing ? this.editAsset(asset._id, asset.name, changedAmount) : null)}
                  >
                    Save
                  </div>
                  <div style={{ flex: 1 }} onClick={() => this.deleteAsset(asset._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} style={{ color: 'red', cursor: 'pointer' }} />
                  </div>
                </MyAssets>
              )
            })}
            <StyledButton onClick={() => this.retreiveMyAssets()}>Load More</StyledButton>
          </Records>
        </div>
      </div>
    )
  }
}

export default SignIn
