const ROUTE_PARAM_REGEX = /:(\w+)(?!\w)/g;
const ROUTE_SLASH_REGEX = /\/(\w+)(?!\w)/g;
const ROUTE_STRUCTURE_REGEX = /(\/|:)(\w+)(?!\w)/g;

class Router {
  constructor() {
    this._routes = [];
    this._cache = [];
    this._components = [];

    // window events
    window.addEventListener('load', event => this.handleRouteChange(event.currentTarget.location.pathname));
    window.addEventListener('popstate', event => this.handleRouteChange(event.target.location.pathname));
  }

  add = (url, component = null, query = '#root') => {
    this._routes.push({
      url: url,
      query: query,
      component: component
    });
  };

  push = async (route) => {
    history.pushState({}, '', route);
    await this.handleRouteChange(route);
  };

  refresh = async () => this.push(window.location.pathname);

  handleRouteChange = async (route) => {
    // find correct route for our pathname
    const nextRoute = this._routes.find(x => {
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

    // if we found a route
    if (nextRoute) {
      let newDiv = document.createElement(nextRoute.component); 

      // replace with new component html
      const root = document.querySelector(nextRoute.query);
      root.innerHTML = newDiv.outerHTML;
    } else {
      console.error(`Unable to find route for ${route}.`);
    }
  };
}