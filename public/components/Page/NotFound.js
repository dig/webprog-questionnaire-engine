class NotFound extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('notfound');
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
    let button = this.shadowRoot.getElementById('back');
    button.addEventListener('click', (event) => this.handleLoginClick(event));
  }

  handleLoginClick = () => history.back();
}

customElements.define('page-notfound', NotFound);