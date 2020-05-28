class Create extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('create');
    let templateContent = template.content;

    this.attachShadow({mode: 'open'})
      .appendChild(templateContent.cloneNode(true));

    this.shadowRoot.innerHTML += `
      ${GlobalStyles.main}
      ${GlobalStyles.button}
      ${GlobalStyles.input}
      ${GlobalStyles.componentCreate}
    `;
  }

  connectedCallback() {
    let fileInput = this.shadowRoot.querySelector('#file-input');
    fileInput.addEventListener('change', this.readFile, false);
  }

  readFile(e) {
    let file = e.target.files[0];
    if (!file) return;

    let reader = new FileReader();

    reader.onload = function(e) {
      let contents = e.target.result;
      console.log(contents);
    };
    reader.readAsText(file);
  }
}

customElements.define('page-create', Create);