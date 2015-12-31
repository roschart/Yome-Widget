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
        sides: [1, 2, 3, 4, 5, 6, 7 ,8].map(() => {})
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
      <polygon points = {
        Yome.pointsToPointsString(Yome.sidePoints(state))
      } >
      </polygon>

    //l(Yome.state);
    //l(Yome.sideCount(Yome.state));
    //l(Yome.sliceTheta(Yome.state));
    //l(Yome.rotate(Math.PI, {x: 0, y: 1}));
    //l(Yome.radialPoint(100, Math.PI));
    //l(Yome.rotate(Math.PI, {x: 0, y: 1}));
    //l(Yome.sidePoints(Yome.initialState()))
    //l(Yome.pointsToPointsString(Yome.sidePoints(Yome.initialState())))
    Yome.svgWorld = (children) =>
      <svg height = "500"
  width = "500"
  viewBox = "-250 -250 500 500"
  preserveAspectRatio = "xMidYMid meet" > {
    children
  } </svg>

  Yome.windowPoints = (st) => {
  const theta = Yome.sliceTheta(st),
        indent = theta / 6;
  return [Yome.radialPoint(160, indent),
          Yome.radialPoint(160, theta - indent),
          Yome.radialPoint(100, theta / 2)];
}

  Yome.playArea = (children) =>
    React.render(Yome.svgWorld(children), document.getElementById("playarea"))

  Yome.clearPlayArea = () =>
    React.unmountComponentAtNode(document.getElementById("playarea"))

  Yome.playArea(Yome.drawWalls({sides: [1,2,3,4,5,6,7,8]}))

  Yome.drawWindow = (st) =>
    <polygon points={ Yome.pointsToPointsString(Yome.windowPoints(st)) }>
    </polygon>

  Yome.doorPoints = (st) => {
    const indent = Yome.sliceTheta(st) / 8;
    return [Yome.radialPoint(165, indent ),
            Yome.radialPoint(165, -indent),
            Yome.radialPoint(90,  -indent),
            Yome.radialPoint(90, indent)];
  }

  Yome.drawDoor = (st) =>
    <polygon points={ Yome.pointsToPointsString(Yome.doorPoints(st)) }>
    </polygon>

  Yome.drawLine = (line) =>
    <line x1={line.start.x} y1={line.start.y}
          x2={line.end.x} y2={line.end.y}>
    </line>

  Yome.drawZipDoor = (st) => {
    const theta   = Yome.sliceTheta(st),
          indent  = 0.15 * (theta / 6),
          lines   = [0,1,2,3,4,5,6,7,8].map((x) => {
            const dist = 170 - (10 * x);
            return {start: Yome.radialPoint(dist, -indent),
                    end:   Yome.radialPoint(dist, indent)}});
    lines.push({start: Yome.radialPoint(180, 0),
                end: Yome.radialPoint(90, 0)});
    return <g>{lines.map(Yome.drawLine)}</g>;
  }

  Yome.drawStoveVent = (st) => {
    const theta = Yome.sliceTheta(st),
      point = Yome.radialPoint(155, 0);
    return <ellipse cx={point.x} cy={point.y} rx="14" ry="8"
                    key="stove-vent"></ellipse>
  }

  Yome.playArea(<g>{Yome.drawWindow(Yome.state)}
                  {Yome.drawWalls(Yome.state)}
                  {Yome.drawDoor(Yome.state)}
                  {Yome.drawZipDoor(Yome.state)}
                  {Yome.drawStoveVent(Yome.state)}

                  </g>)


  //Yome.playArea(Yome.drawWalls({sides: [1,2,3,4,5,6,7]}))
  //Yome.playArea(Yome.drawWalls({sides: [1,2,3,4,5,6,7,8]}))

  //Yome.clearPlayArea()
})();
