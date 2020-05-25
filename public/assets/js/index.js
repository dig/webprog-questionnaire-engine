const router = new Router();

// routes
router.add('/', 'main/main.html', Main);
router.add('*', 'notfound/notfound.html', NotFound);