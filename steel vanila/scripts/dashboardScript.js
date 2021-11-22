import Renderer from "../engines/renderer.js";
import Router from '../engines/router.js';


const renderer = new Renderer();
const router = new Router();

router.init();
router.setRoute('#profile', () => renderer.renderHTML('../components/profile.html','container'));
router.setRoute('#post', () => renderer.renderHTML('../components/post.html','container'));
router.setRoute('#dashboard', () => renderer.renderHTML('../components/dashboard.html','container'));
router.listen();

//Not needed -> let profile = document.getElementById("profile");
profile.addEventListener("click", ev => {
  ev.preventDefault();
  window.history.pushState({}, null, "index.html#profile");
});

dashboard.addEventListener("click", ev => {
  ev.preventDefault();
  window.history.pushState({}, null, "index.html#dashboard");
})

post.addEventListener("click", ev => {
  ev.preventDefault();
  window.history.pushState({}, null, "index.html#post");
})

/*
11/15/2021
The URL must be the same origin as the current URL or the method will throw an exception.
info found in: https://www.javascripttutorial.net/web-apis/javascript-history-pushstate/ */
window.history.pushState(null, null, "index.html#dashboard");

