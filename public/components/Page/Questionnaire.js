class Questionnaire extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('questionnaire');
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

  async connectedCallback() {
    let panel = this.shadowRoot.querySelectorAll('.panel');
    panel = panel[0];

    try {
      const response = await fetch(`/api/questionnaire/${this.getAttribute('uuid')}`, {
        headers: {
          'Authorization': `Bearer ${auth.getAccessToken()}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // name
        let nameElem = this.shadowRoot.getElementById('name');
        nameElem.textContent = data.name;

        // questions
        for (const question of JSON.parse(data.questions)) {
          const template = this.shadowRoot.getElementById(`questionnaire-${question.type}`);
          if (template != null) {
            const cloned = template.content.cloneNode(true);

            // id
            let group = cloned.querySelectorAll('.form-group');
            group = group[0];
            group.setAttribute('question-id', question.id);

            // title
            const title = cloned.getElementById('title');
            title.textContent = question.text;

            if (question.type === 'single-select' || question.type === 'multi-select') {
              let select = cloned.querySelectorAll('select');
              select = select[0];

              for (const option of question.options) {
                const optionElem = document.createElement('option');
                optionElem.setAttribute('value', option);
                optionElem.textContent = option;

                select.appendChild(optionElem);
              }
            }

            panel.appendChild(cloned);
          }
        }
      }
    } catch (error) {
      // router.push('/');
      console.error(error);
    }
  }
}

customElements.define('page-questionnaire', Questionnaire);