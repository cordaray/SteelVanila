
/*
HOW TO USE THIS CLASS
1. init() so the custom events are dispatched
2. set the Routes
3. listen() so the event listener is activated
*/
export default class Router {

  constructor() {
    this.routes = [];
    this.currentRoute = '';
  }

  /*
  11/15/2021
  Solution for reading URL changes
  Found in: https://dirask.com/posts/JavaScript-on-location-changed-event-on-url-changed-event-DKeyZj
  */
  init() {

    let pushState = history.pushState;
    let replaceState = history.replaceState;

    /* 
    the 'apply' method is explained in the following article:
    https://www.w3schools.com/js/js_function_apply.asp
  
    ---------------------------------------------------------------------------------------------------

    From what I understand, basically what it is going on is that it is embedding the pushState function 
    to itself, except this time it dispatches an event manually
    */

    history.pushState = function () {
      pushState.apply(history, arguments);
      window.dispatchEvent(new Event("locationchange"));
    };

    history.replaceState = function () {
      replaceState.apply(history, arguments);
      window.dispatchEvent(new Event("locationchange"));
    };

    window.addEventListener("popstate", function () {
      window.dispatchEvent(new Event("locationchange"));
    });
    console.log('init');
  }

  setRoute(url, callback){
    this.routes.push({
      url: url,
      callback: callback
    });
  }

  listen(){
    window.addEventListener("locationchange", () => {
      this.routes.forEach( route => {
        if(route.url === window.location.hash){
          if(this.currentRoute !== route.url){
            this.currentRoute = route.url;
            route.callback();
          }
        }
      })
    })
  }

}

/* EXAMPLE OF USE
  const router = new Router();
  router.init();
  router.setRoute('#profile', () => console.log('gotcha profile'));
  router.setRoute('#post', () => console.log('gotcha post'));
  router.setRoute('#dashboard', () => console.log('gotcha dashboard'));
  router.listen();
*/

