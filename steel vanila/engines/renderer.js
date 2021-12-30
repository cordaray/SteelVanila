export default class Renderer {

  //Takes the html as a string and appends it to the target
  appendHTML(payload) {
    const { type, target, innerHTML } = payload;
    let element = document.createElement(type);
    element.innerHTML = innerHTML;
    let result = document.getElementById(target);
    result.appendChild(element);
  }
  
  //Fetches the HTML from another file and appends it to the target
  renderHTML(route, target) {
    fetch(route)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        let body = doc.querySelector("body");
        let result = body.querySelector("div");
        //Adds init class for smooth transitions
        result.classList.add('init')
        document.getElementById(target).replaceChildren(result);
        //This sentence allows us to execute the javascript in the script tag if there is one
        new Function(body.querySelector("script")?.innerHTML)();
      })
      .catch((error) => {
        console.warning("[Unable to mount HTML Component]: ", error);
      });
  }

}

/*
EXAMPLE OF appendHTML

const payload = {
  type: "div",
  target: "container",
  innerHTML: `
    <div class='post'>
    <img src='https://m.media-amazon.com/images/I/81onZ+H4lUL._SL1500_.jpg'/>
        <div>
            <h1 style='margin:0px;'> Hello World </h1>
            <p> Description of the post. Description of the post. Description of the post. Description of the post. </p>
            <span style='font-style: italic;'>Made by Dacord97</span>
        </div>
    </div> 
    `,
};

const renderer = new Renderer();
for (let a = 0; a <= 10; a++) {
  renderer.appendHTML(payload);
};

*/
