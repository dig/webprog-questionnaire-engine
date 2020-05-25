class Component {
  constructor(params = []) {
    this._isMounted = false;
    this._params = params;
  }

  componentDidMount = () => {};
  componentDidUnmount = () => {};
}