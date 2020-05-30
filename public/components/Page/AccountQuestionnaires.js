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
          downloadBtn.addEventListener('click', (e) => this.handleDownloadClick(questionnaire.uuid, e.srcElement));

          // delete
          const deleteBtn = cloned.getElementById('delete');
          deleteBtn.addEventListener('click', () => this.handleDeleteClick(questionnaire.uuid));

          row.appendChild(cloned);
        }
      } else {
        router.push('/');
      }
    } catch (error) {
      router.push('/');
    }
  }

  handleViewClick = (uuid) => router.push(`/questionnaire/${uuid}`);
  
  handleDownloadClick = async (uuid, element) => {
    const response = await fetch(`/api/questionnaire/${uuid}/response`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${auth.getAccessToken()}`
      },
    });

    if (response.ok) {
      const data = await response.json();

      const fileData = [];
      for (const response of data) {
        fileData.push(JSON.parse(response.response));
      }

      let file = new Blob([JSON.stringify(fileData)], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = 'response.json';
    }
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