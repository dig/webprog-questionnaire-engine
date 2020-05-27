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
    let googleSignIn = this.shadowRoot.querySelector('#google-signin');
    googleSignIn.addEventListener('click', () => auth.requestSignIn(this.handleSignInCallback));
  }

  handleSignInCallback = () => router.push('/');
}

customElements.define('page-login', Login);