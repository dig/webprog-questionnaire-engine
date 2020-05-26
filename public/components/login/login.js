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
    auth.set(e.Ut.Bd, e.wc.id_token);
    router.push('/');
  }

  handleOnFailure = (e) => console.error(e);
}