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

  readFile = (e) => {
    let file = e.target.files[0];
    if (!file) return;

    let reader = new FileReader();

    reader.onload = (e) => this.createJSON(JSON.parse(e.target.result));
    reader.readAsText(file);
  }

  createJSON = async (object) => {
    if (object.name && object.questions) {
      try {
        const response = await fetch('/api/questionnaire/json', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${auth.getAccessToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(object)
        });

        if (response.ok)
          router.push('/questionnaires');
      } catch (error) {
        console.error(error);
      }
    }
  }
}

customElements.define('page-create', Create);