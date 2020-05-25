class Login extends Component {
  componentDidMount = () => {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.handleOnSuccess,
      'onfailure': this.handleOnFailure
    });
  }

  handleOnSuccess = (e) => {
    console.log(e);
  }

  handleOnFailure = (e) => {
    console.error(e);
  }
}