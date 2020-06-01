const auth = new Auth();
const router = new Router();

// routes
router.add('/', 'page-main');
router.add('/login', 'page-login');
router.add('/create', 'page-create');
router.add('/questionnaire/:uuid', 'page-questionnaire');
router.add('/success', 'page-success');
router.add('/questionnaires', 'page-accountquestionnaires');
router.add('*', 'page-notfound');

// header
let accountItem = document.querySelector('header > .item.account');
accountItem.addEventListener('click', () => router.push(auth.isAuthenticated() ? '/questionnaires' : '/login'));

let titleItem = document.querySelector('header > .item.title');
let logoItem = document.querySelector('header > .item.logo');
titleItem.addEventListener('click', () => router.push('/'));
logoItem.addEventListener('click', () => router.push('/'));