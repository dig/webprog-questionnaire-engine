class Component {
  constructor(props = []) {
    this._isMounted = false;
    this._props = props;
  }

  componentDidMount = () => {};
  componentDidUnmount = () => {};
}