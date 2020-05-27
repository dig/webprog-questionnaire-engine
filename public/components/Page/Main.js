class Main extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('main');
    let templateContent = template.content;

    this.attachShadow({mode: 'open'})
      .appendChild(templateContent.cloneNode(true));

    this.shadowRoot.innerHTML += `
      ${GlobalStyles.main}
      ${GlobalStyles.button}
      ${GlobalStyles.componentMain}
    `;
  }

  connectedCallback() {
    let button = this.shadowRoot.getElementById('login');
    button.addEventListener('click', (event) => this.handleLoginClick(event));

    if (auth.isAuthenticated())
      button.textContent = 'Create';
  }

  handleLoginClick = () => router.push(auth.isAuthenticated() ? '/create' : '/login');
}

customElements.define('page-main', Main);