const router = new Router();

// routes
router.add('/', 'dashboard.html');
router.add('*', 'notfound/notfound.html', NotFound);