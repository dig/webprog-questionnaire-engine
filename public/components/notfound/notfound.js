class NotFound extends Component {
  componentDidMount = () => {
    let button = document.getElementById('back');
    button.addEventListener('click', (event) => this.handleBackClick(event));
  }

  handleBackClick = (event) => history.back();
}