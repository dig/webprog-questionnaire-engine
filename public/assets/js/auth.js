const accessTokenKey = '__accessToken',
      usernameKey = '__username';

class Auth {
  constructor() {
    this.authenticated = false;

    this.username = null;
    this.accessToken = null;

    this.loadStorage();
  }

  loadStorage() {
    const username = localStorage.getItem(usernameKey);
    const accessToken = localStorage.getItem(accessTokenKey);

    if (username && accessToken) {
      this.set(username, accessToken);
    }
  }

  set(username, accessToken) {
    this.username = username;
    this.accessToken = accessToken;

    localStorage.setItem(usernameKey, username);
    localStorage.setItem(accessTokenKey, accessToken);

    this.authenticated = true;
    this.onAuth();
  }

  onAuth() {
    // header
    let accountItem = document.querySelector('header > .item.account');
    if (this.isAuthenticated()) {
      accountItem.textContent = this.username;
    }
  }

  isAuthenticated() {
    return this.accessToken != null && this.authenticated;
  }

  getUsername() {
    return this.username;
  }

  getAccessToken() {
    return this.accessToken;
  }
}