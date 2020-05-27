class Login extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('login');
    let templateContent = template.content;

    this.attachShadow({mode: 'open'})
      .appendChild(templateContent.cloneNode(true));

    this.shadowRoot.innerHTML += `
      ${GlobalStyles.main}
      ${GlobalStyles.componentLogin}
    `;
  }

  connectedCallback() {
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

customElements.define('page-login', Login);