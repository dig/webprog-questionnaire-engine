const auth = new Auth();
const router = new Router();

// routes
router.add('/', 'main/main.html', Main);
router.add('/login', 'login/login.html', Login);
router.add('/create', 'create/create.html', Create);
router.add('*', 'notfound/notfound.html', NotFound);

// main
let accountItem = document.querySelector('header > .item.account');
accountItem.addEventListener('click', () => router.push(auth.isAuthenticated() ? '/questionnaires' : '/login'));