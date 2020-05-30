class AccountQuestionnaires extends HTMLElement {
  constructor() {
    super();
    let template = document.getElementById('accountquestionnaires');
    let templateContent = template.content;

    this.attachShadow({mode: 'open'})
      .appendChild(templateContent.cloneNode(true));

    this.shadowRoot.innerHTML += `
      ${GlobalStyles.main}
      ${GlobalStyles.componentAccountQuestionnaires}
    `;
  }

  async connectedCallback() {
    await this.refreshQuestionnaires();
  }

  refreshQuestionnaires = async () => {
    try {
      const response = await fetch(`/api/questionnaire`, {
        headers: {
          'Authorization': `Bearer ${auth.getAccessToken()}`
        },
      });

      if (response.ok) {
        const data = await response.json();

        const row = this.shadowRoot.getElementById('main');
        const questionnaireTemplate = this.shadowRoot.getElementById('questionnaire');

        row.innerHTML = '';

        for (const questionnaire of data) {
          const cloned = questionnaireTemplate.content.cloneNode(true);

          // title
          const title = cloned.getElementById('title');
          title.textContent = questionnaire.name;

          // buttons
          // view
          const viewBtn = cloned.getElementById('view');
          viewBtn.addEventListener('click', () => this.handleViewClick(questionnaire.uuid));

          // download
          const downloadBtn = cloned.getElementById('download');
          downloadBtn.addEventListener('click', () => this.handleDownloadClick(questionnaire.uuid));

          // delete
          const deleteBtn = cloned.getElementById('delete');
          deleteBtn.addEventListener('click', () => this.handleDeleteClick(questionnaire.uuid));

          row.appendChild(cloned);
        }
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      // router.push('/');
    }
  }

  handleViewClick = (uuid) => router.push(`/questionnaire/${uuid}`);
  
  handleDownloadClick = (uuid) => {

  }

  handleDeleteClick = async (uuid) => {
    try {
      const response = await fetch(`/api/questionnaire/${uuid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.getAccessToken()}`
        },
      });

      if (response.ok) {
        await this.refreshQuestionnaires();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

customElements.define('page-accountquestionnaires', AccountQuestionnaires);