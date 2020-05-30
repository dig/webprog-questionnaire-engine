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
      ${GlobalStyles.componentQuestionnaire}
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
            group.setAttribute('question-type', question.type);

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

        // submit
        const submitBtn = document.createElement('button');
        submitBtn.classList.add('light');
        submitBtn.textContent = 'Submit';
        submitBtn.addEventListener('click', this.handleSubmitClick);

        // error msg
        const errorMsg = document.createElement('small');
        errorMsg.classList.add('errorMsg');
        errorMsg.setAttribute('id', 'errorMsg');

        panel.appendChild(submitBtn);
        panel.appendChild(errorMsg);
      } else {
        router.push('/');
      }
    } catch (error) {
      router.push('/');
    }
  }

  handleSubmitClick = async () => {
    const questions = this.shadowRoot.querySelectorAll('.form-group');
    const data = [];

    let filled = true;
    for (const question of questions) {
      const id = question.getAttribute('question-id');
      const type = question.getAttribute('question-type');

      let value = null;
      if (type === 'single-select') {
        const select = question.getElementsByTagName('select')[0];
        value = select.options[select.selectedIndex].value;
      } else if (type === 'multi-select') {
        const select = question.getElementsByTagName('select')[0];
        value = [];

        for (const option of select.options) {
          if (option.selected) {
            value.push(option.value);
          }
        }

        if (value.length <= 0)
          filled = false;
      } else {
        const input = question.getElementsByTagName('input')[0];

        if (input.value === '') 
          filled = false;

        value = type === 'number' ? Number(input.value) : input.value;
      }

      data.push({
        id: id,
        value: value
      });
    }

    if (!filled) {
      this.handleError('You have not completed all the required questions!');
    } else {
      try {
        const response = await fetch(`/api/questionnaire/${this.getAttribute('uuid')}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${auth.getAccessToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          router.push('/success');
        }
      } catch (error) {
        this.handleError('Unable to save response, please try again.');
      }
    }
  }

  handleError = (message) => {
    const errorMsg = this.shadowRoot.getElementById('errorMsg');
    errorMsg.textContent = message;
    setTimeout(() => errorMsg.textContent = '', 5 * 1000);
  }
}

customElements.define('page-questionnaire', Questionnaire);