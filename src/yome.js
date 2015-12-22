(function(){
"use strict";
var Reloader = Reloader || {};

Reloader.reloadFile = (path) => {
  var x = document.createElement("script");
  x.setAttribute("src",path + "?rel=" + (new Date().getTime()));
  document.body.appendChild(x);
  setTimeout(function(){ document.body.removeChild(x);}, 1000);
};

Reloader.startReloading = (files) => {
  setTimeout(function() {
    console.log("--- reloading ---");
    files.map(Reloader.reloadFile);
  }, 1500);
};
Reloader.startReloading(["build/yome.js"]);



function l(x) { console.log(x);  return x; }

var Yome = Yome || {}

Yome.initialState = () => {
  return { sides: [1,2,3,4,5,6,7,8].map( () => {} ) }
}

Yome.state = Yome.state || Yome.initialState();
l(Yome.state);


})();
