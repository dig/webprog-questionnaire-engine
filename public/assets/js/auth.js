const GOOGLE_CLIENT_ID = '527156018024-2nt5kuj4jqsrie7r4dhnrdjn6d239bor.apps.googleusercontent.com',
      userKey = '__user';

class Auth {
  constructor() {
    this.auth2 = null;
    this.user = this.getLocalStorage();
    this.authenticated = this.user != null;
    this.signInCB = null;

    window.addEventListener('load', () => gapi.load('auth2', this.initOAuth));
  }

  initOAuth = () => {
    this.auth2 = gapi.auth2.init({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'profile'
    });

    this.auth2.isSignedIn.listen(this.signinChanged);
    this.auth2.currentUser.listen(this.userChanged);

    if (this.auth2.isSignedIn.get()) {
      this.auth2.signIn();
    }
  }

  setLocalStorage = (user) => localStorage.setItem(userKey, JSON.stringify(user));
  getLocalStorage = () => {
    const user = localStorage.getItem(userKey);
    if (user)
      return JSON.parse(user);
    return null;
  }

  signinChanged = (val) => {
    if (!val) {
      localStorage.removeItem(userKey);
    } else {
      this.setLocalStorage(this.user);
    }
  }

  userChanged = (user) => {
    this.user = user;
    this.setLocalStorage(this.user);

    if (this.user) {
      this.authenticated = true;
  
      let accountItem = document.querySelector('header > .item.account');
      accountItem.textContent = this.getUsername();
  
      if (this.signInCB != null) {
        this.signInCB();
      }
    }
  }

  requestSignIn = (signInCB = null) => {
    this.signInCB = signInCB;
    this.auth2.signIn();
  }

  isAuthenticated = () => this.authenticated;
  getUsername = () => this.user.Ut.Bd;
  getAccessToken = () => this.user.wc.id_token;
}