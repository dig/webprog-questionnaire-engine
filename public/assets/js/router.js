const ROUTE = [
  {
    url: '/',
    template: 'dashboard',
    query: '#root',
  },
  {
    url: '/test/:id',
    template: 'test',
    query: '#root',
  },
  {
    url: '*',
    template: 'notfound',
    query: '#root',
  }
];

const ROUTE_PARAM_REGEX = /:(\w+)(?!\w)/g;
const ROUTE_SLASH_REGEX = /\/(\w+)(?!\w)/g;
const ROUTE_STRUCTURE_REGEX = /(\/|:)(\w+)(?!\w)/g;

const pushRoute = async (route) => {
  history.pushState({}, '', route);
  await handleRouteChange(route);
};

const handleRouteChange = async (route) => {
  const nextRoute = ROUTE.find(x => {
    if (x.url === route || x.url === '*') return true;

    const urlStructure = x.url.match(ROUTE_STRUCTURE_REGEX);
    const routeStructure = route.match(ROUTE_STRUCTURE_REGEX);
    if (urlStructure == null || urlStructure.length !== routeStructure.length) return false;

    let isValidRoute = true;
    for (const i in urlStructure) {
      const urlParam = urlStructure[i];
      const routeParam = routeStructure[i];

      if (!urlParam.startsWith(':')) {
        if (urlParam !== routeParam) {
          isValidRoute = false;
        }
      }
    }

    return isValidRoute;
  });

  if (nextRoute) {
    const response = await fetch(`/templates/${nextRoute.template}.html`);
    const data = await response.text();

    const root = document.querySelector(nextRoute.query);
    root.innerHTML = data;
  }
};
window.addEventListener('load', event => handleRouteChange(event.currentTarget.location.pathname));
window.addEventListener('popstate', event => handleRouteChange(event.target.location.pathname));