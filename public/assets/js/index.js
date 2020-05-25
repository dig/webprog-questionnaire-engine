const router = new Router();

// routes
router.add('/', 'dashboard.html');
router.add('/test', 'test', '#root', Test);
router.add('*', 'notfound.html');