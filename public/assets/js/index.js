const auth = new Auth();
const router = new Router();

// routes
router.add('/', 'page-main');
router.add('/login', 'page-login');
router.add('/create', 'page-create');
router.add('/questionnaire/:uuid', 'page-questionnaire');
router.add('*', 'page-notfound');

// header
let accountItem = document.querySelector('header > .item.account');
accountItem.addEventListener('click', () => router.push(auth.isAuthenticated() ? '/questionnaires' : '/login'));