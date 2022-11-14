import { PureComponent } from "react"
import StoreContext from "../contexts/StoreContext"

/**
 * simply implement "connect" function in react-redux
 * @param { Function } mapStateToProps 
 * @param { Function } mapDispatchToProps 
 * @returns high-order-component
 */
const connect = (mapStateToProps, mapDispatchToProps) => {
  return function(OriginalComponent) {
    // high-order-component
    class EnhancedComponent extends PureComponent {
      constructor(props, context) {
        super(props)
        this.state = mapStateToProps(context.getState())
      }
      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          this.setState(mapDispatchToProps(this.context.getState())) 
        })
      }
      componentWillUnmount() {
        this.unsubscribe()
      }
      render() {
        const stateObj = mapStateToProps(this.context.getState())
        const dispatchObj = mapDispatchToProps(this.context.dispatch)
        return (
          <OriginalComponent { ...this.props } { ...stateObj } { ...dispatchObj } />
        )
      }
    }
    EnhancedComponent.contextType = StoreContext

    return EnhancedComponent
  }
}


export default connect