class Main extends Component {
  componentDidMount = () => {
    let button = document.getElementById('login');
    button.addEventListener('click', (event) => this.handleLoginClick(event));

    if (auth.isAuthenticated())
      button.textContent = 'Create';
  }

  handleLoginClick = (event) => router.push(auth.isAuthenticated ? '/create' : '/login');
}