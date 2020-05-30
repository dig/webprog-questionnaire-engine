class Success extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('success');
    let templateContent = template.content;

    this.attachShadow({mode: 'open'})
      .appendChild(templateContent.cloneNode(true));

    this.shadowRoot.innerHTML += `
      ${GlobalStyles.main}
      ${GlobalStyles.button}
      ${GlobalStyles.componentNotFound}
    `;
  }

  connectedCallback() {
    let button = this.shadowRoot.getElementById('home');
    button.addEventListener('click', (event) => this.handleHomeClick(event));
  }

  handleHomeClick = () => router.push('/');
}

customElements.define('page-success', Success);