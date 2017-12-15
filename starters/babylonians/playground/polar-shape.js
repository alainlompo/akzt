// Draws a ground and a polar equation based curve on ground level.
// It will be used for a path based animation:
// See also: http://www.babylonjs-playground.com/#WBUEEH#4
var createScene = function() {
   var scene = new BABYLON.Scene(engine);

   // camera
 	 var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  	camera.setPosition(new BABYLON.Vector3(-12, 50, -124));
  	camera.attachControl(canvas, true);

  	// lights
  	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);

	/*-----------------------Path------------------------------------------*/

	// Create array of points to describe the curve
    var points = [];
    var a = 90;
    var k = 3;
    var angularSlice = Math.PI * 2 / 120;
    for (var theta = 0; theta <= Math.PI * 2; theta = theta + angularSlice  ) {
        var r = a * Math.cos(k * theta);
        var x = r * Math.cos(theta);
        var z = r * Math.sin(theta);
        points.push(new BABYLON.Vector3(x, 0, z));
    }

  //Draw the curve
	  var track = BABYLON.MeshBuilder.CreateLines('track', {points: points}, scene);
	  track.color = new BABYLON.Color3(0.75, 0, 0.5);
  /*-----------------------End Path------------------------------------------*/

  /*-----------------------Ground------------------------------------------*/
    var groundSize = 100;
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 3*groundSize, height: 3*groundSize}, scene);
  /*-----------------------End Ground------------------------------------------*/

  return scene;
}
