class Create extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('create');
    let templateContent = template.content;

    this.attachShadow({mode: 'open'})
      .appendChild(templateContent.cloneNode(true));

    this.shadowRoot.innerHTML += `
      ${GlobalStyles.main}
      ${GlobalStyles.componentCreate}
    `;
  }

  connectedCallback() {
  }
}

customElements.define('page-create', Create);