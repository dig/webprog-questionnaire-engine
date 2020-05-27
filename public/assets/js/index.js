const auth = new Auth();
const router = new Router();

// global styles
let body = document.querySelector('body');
for (const style of ['main', 'header']) {
  body.innerHTML += GlobalStyles[style];
}

// routes
router.add('/', 'page-main');
router.add('/login', 'page-login');
router.add('/create', 'page-create');
router.add('*', 'page-notfound');

// header
let accountItem = document.querySelector('header > .item.account');
accountItem.addEventListener('click', () => router.push(auth.isAuthenticated() ? '/questionnaires' : '/login'));