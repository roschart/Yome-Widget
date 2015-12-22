(function() {
  "use strict";
  var Reloader = Reloader || {};

  Reloader.reloadFile = (path) => {
    var x = document.createElement("script");
    x.setAttribute("src", path + "?rel=" + (new Date().getTime()));
    document.body.appendChild(x);
    setTimeout(function() {
      document.body.removeChild(x);
    }, 1000);
  };

  Reloader.startReloading = (files) => {
    setTimeout(function() {
      console.log("--- reloading ---", new Date().getTime());
      files.map(Reloader.reloadFile);
    }, 2000);
  };
  Reloader.startReloading(["build/yome.js"]);



  function l(x) {
    console.log(x);
    return x;
  }

  var Yome = Yome || {}

  Yome.initialState = () => {
    return {
      sides: [1, 2, 3, 4, 5, 6, 7, 8].map(() => {})
    }
  }

  Yome.state = Yome.state || Yome.initialState();
  Yome.sideCount = (st) => st.sides.length;
  Yome.sliceTheta = (st) => 2 * Math.PI / Yome.sideCount(st)

  Yome.rotate = (theta, point) => {
    const sint = Math.sin(theta),
      cost = Math.cos(theta);
    return {
      x: (point.x * cost) - (point.y * sint),
      y: (point.x * sint) + (point.y * cost)
    };
  }

  Yome.radialPoint = (radius, theta) =>
    Yome.rotate(theta, {
      x: 0,
      y: radius
    })

  Yome.sidePoints = (st) => {
    return st.sides.map((_, i) => Yome.radialPoint(180, i * Yome.sliceTheta(st)))
  }

  Yome.pointsToPointsString = (points) =>
  points.map(p => p.x + "," + p.y).join(" ")

  Yome.drawWalls = (state) =>
  <polygon points={Yome.pointsToPointsString(Yome.sidePoints(state))}>
  </polygon>

  //l(Yome.state);
  //l(Yome.sideCount(Yome.state));
  //l(Yome.sliceTheta(Yome.state));
  //l(Yome.rotate(Math.PI, {x: 0, y: 1}));
  //l(Yome.radialPoint(100, Math.PI));
  //l(Yome.rotate(Math.PI, {x: 0, y: 1}));
  //l(Yome.sidePoints(Yome.initialState()))
  l(Yome.pointsToPointsString(Yome.sidePoints(Yome.initialState())))

})();
