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

  add = (url, template, query = '#root', component = null) => {
    this._routes.push({
      url: url,
      template: template,
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
      // attempt to get template html
      let data = '';
      if (this._cache.includes(nextRoute.template)) {
        data = this._cache[nextRoute.template];
      } else {
        let url = `/components/${nextRoute.template}`;
        if (nextRoute.component != null)
          url = `${url}/${nextRoute.template}.html`;

        const response = await fetch(url);
        data = await response.text();

        // cache result for faster loading
        this._cache[nextRoute.template] = data;
      }

      // unmount old components
      if (this._components[nextRoute.query]) {
        for (const com of this._components[nextRoute.query]) {
          if (com._isMounted) {
            com.componentDidUnmount();
            com._isMounted = false;
          }
        }

        this._components[nextRoute.query] = [];
      }

      // replace with new component html
      const root = document.querySelector(nextRoute.query);
      root.innerHTML = data;

      // mount
      if (nextRoute.component != null) {
        const urlStructure = nextRoute.url.match(ROUTE_STRUCTURE_REGEX);
        const routeStructure = route.match(ROUTE_STRUCTURE_REGEX);

        const props = {};
        if (urlStructure != null && routeStructure != null) {
          for (const i in urlStructure) {
            const urlParam = urlStructure[i];
            const routeParam = routeStructure[i];
    
            if (urlParam.startsWith(':')) {
              props[urlParam.replace(':', '')] = routeParam.replace('/', '');
            }
          }
        }

        if (!this._components[nextRoute.query])
          this._components[nextRoute.query] = [];

        // create new component
        let newCom = new nextRoute.component(props);
        newCom.componentDidMount();
        newCom._isMounted = true;

        this._components[nextRoute.query].push(newCom);
      }
    }
  };
}