const GlobalStyles = {
  main: `
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        outline: none;
      }
      
      html, body {
        background-color: #2f323b;
        font-family: sans-serif;
        height: 100%;
        width: 100%;
        color: #fff;
      }

      #root {
        height: calc(100vh - 78px);
      }
      
      .col-1 {
        width: 8.33%;
      }
      
      .col-2 {
        width: 16.66%;
      }
      
      .col-3 {
        width: 25%;
      }
      
      .col-4 {
        width: 33.33%;
      }
      
      .col-5 {
        width: 41.66%;
      }
      
      .col-6 {
        width: 50%;
      }
      
      .col-7 {
        width: 58.33%;
      }
      
      .col-8 {
        width: 66.66%;
      }
      
      .col-9 {
        width: 75%;
      }
      
      .col-10 {
        width: 83.33%;
      }
      
      .col-11 {
        width: 91.66%;
      }
      
      .col-12 {
        width: 100%;
      }
      
      [class*="col-"] {
        float: left;
      }
      
      .row::after {
        content: "";
        clear: both;
        display: table;
      }
    </style>
  `,

  button: `
    <style>
      button {
        width: 100px;
        height: 34px;
        background-color: #348aca;
        border: none;
        color: #fff;
        font-weight: 600;
        font-size: .9rem;
        outline: none;
        float: left;
        cursor: pointer;
        border-radius: 0;
        -webkit-appearance: none;
      }

      button.light {
        border: 1px solid #616779;
        background: transparent;
        color: #949ba2;
        padding: 5px 10px;
        cursor: pointer;
      }

      button.light:hover {
        color: #fff;
        background: rgba(97,103,121,.3);
      }

      .button-group {
        float: left;
      }

      .button-group > *:not(:first-child) {
        margin-left: 5px;
      }
    </style>
  `,

  input: `
    <style>
      input, select {
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        background-image: none;
        color: #949ba2;
        border: none;
        box-shadow: none;
        -webkit-transition: none;
        transition: none;
        background-color: #494b54;
        border-radius: 0 !important;
      }

      select[multiple] {
        height: 100px;
      }
    </style>
  `,

  componentMain: `
    <style>
      section {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      section > * {
        margin-bottom: 10px;
      }

      section > img {
        height: 100px;
      }
    </style>
  `,

  componentNotFound: `
    <style>
      section {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      
      section > button {
        margin-top: 10px;
      }
    </style>
  `,

  componentLogin: `
    <style>
      section {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      section > .panel > *:not(:last-child) {
        margin-bottom: 15px;
      }
      
      section > .panel {
        background-color: rgba(68,70,79,.5);
        padding: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      
      img {
        height: 50px;
        cursor: pointer;
      }
    </style>
  `,

  componentCreate: `
    <style>
      section {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
      }
      
      section > .panel {
        width: 970px;
        background-color: rgba(68,70,79,.5);
        padding: 20px;
      }

      .panel > *:not(:first-child) {
        margin-top: 15px;
      }

      .form-group > input, .form-group > select {
        margin-top: 3px;
      }
    </style>
  `,

  componentQuestionnaire: `
    <style>
      .errorMsg {
        float: left;
        clear: left;
        display: inline;
        color: #cb2d3e;
      }
    </style>
  `
}