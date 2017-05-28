import { Component, isValidElement } from "react"
import PropTypes from "prop-types"
import createHistory from "history/createMemoryHistory"
import isPlainObject from "lodash/isPlainObject"
import has from "lodash/has"

export default class Navigator extends Component {
  static propTypes = {
    initialScene: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    children: PropTypes.func.isRequired
  }

  state = { currentScene: this.props.initialScene }

  history = createHistory({ initialEntries: [`/${this.props.initialScene}`] })

  unlisten = this.history.listen(location => {
    if (this.willUnmount) {
      return
    }
    this.setState({ currentScene: location.pathname.replace("/", "") })
  })

  componentWillUnmount() {
    this.willUnmount = true
    this.unlisten()
  }

  setScene = scene => this.history.push(`/${scene}`)

  getHistory = () =>
    this.history.entries.map(entry => entry.pathname.replace("/", ""))

  canGo = n => this.history.canGo(n)

  go = n => this.history.go(n)

  back = () => this.history.goBack()

  forward = () => this.history.goForward()

  render() {
    const children = this.props.children({
      currentScene: this.state.currentScene,
      setScene: this.setScene,
      getHistory: this.getHistory,
      canGo: this.canGo,
      go: this.go,
      back: this.back,
      forward: this.forward
    })
    if (!isPlainObject(children)) {
      throw new Error("children should return a plain object")
    }
    if (!has(children, this.state.currentScene)) {
      throw new Error(`${this.state.currentScene} is not a valid scene`)
    }
    if (!isValidElement(children[this.state.currentScene])) {
      throw new Error(
        `${this.state.currentScene} should return a valid element`
      )
    }
    return children[this.state.currentScene]
  }
}
