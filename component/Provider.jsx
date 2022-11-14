import React, { PureComponent } from 'react'
import StoreContext from '../contexts/StoreContext'

/**
 *  simply implement "Provider" component in react-redux
 */
export class Provider extends PureComponent {
  render() {
    const childrenEls = this.props.children
    return (
      <div>
        <StoreContext.Provider value={this.props.store}>
          { childrenEls }
        </StoreContext.Provider>
      </div>
    )
  }
}

export default Provider
