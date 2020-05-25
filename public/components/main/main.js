class Main extends Component {
  componentDidMount = () => {
    let button = document.getElementById('login');
    button.addEventListener('click', (event) => this.handleLoginClick(event));
  }

  handleLoginClick = (event) => router.push('/login');
}