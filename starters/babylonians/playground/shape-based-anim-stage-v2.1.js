// In previous stage we have drawn the shape and the car
// In this stage we add trees all around
// See also: http://www.babylonjs-playground.com/#MKKNIS#4

var createScene = function() {
	var scene = new BABYLON.Scene(engine);
	// camera
 	var camera = new BABYLON.ArcRotateCamera("camera1",  0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  	camera.setPosition(new BABYLON.Vector3(-12, 10, -24));
	camera.attachControl(canvas, true);

    // lights
  	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 0.5, 0), scene);

    var bodyMaterial = new BABYLON.StandardMaterial("body_mat", scene);
    bodyMaterial.diffuseColor = new BABYLON.Color3(3.25, 2.50, 0.35);
    bodyMaterial.backFaceCulling = false;

    var side = [new BABYLON.Vector3(-4, 2, -2),
                new BABYLON.Vector3(4, 2, -2),
                new BABYLON.Vector3(5, -2, -2),
                new BABYLON.Vector3(-7, -2, -2)
    ];

    side.push(side[0]);    //close trapezium

    var extrudePath = [new BABYLON.Vector3(0, 0, -2),     new BABYLON.Vector3(0, 0, 2)];

    var carBody = BABYLON.MeshBuilder.ExtrudeShape("body", {shape: side, path: extrudePath, cap : BABYLON.Mesh.CAP_ALL}, scene);
    carBody.material = bodyMaterial;

    /*-----------------------Wheel------------------------------------------*/

	//Wheel Material
	var wheelMaterial = new BABYLON.StandardMaterial("wheel_mat", scene);
  	var wheelTexture = new BABYLON.Texture("http://i.imgur.com/ZUWbT6L.png", scene);
	wheelMaterial.diffuseTexture = wheelTexture;

	//Set color for wheel tread as black
	var faceColors=[];
	faceColors[1] = new BABYLON.Color3(0,0,0);

	//set texture for flat face of wheel
	var faceUV =[];
	faceUV[0] = new BABYLON.Vector4(0,0,1,1);
	faceUV[2] = new BABYLON.Vector4(0,0,1,1);

	//create wheel front inside and apply material
	var wheelFI = BABYLON.MeshBuilder.CreateCylinder("wheelFI", {diameter: 3, height: 1, tessellation: 24, faceColors:faceColors, faceUV:faceUV}, scene);
  	wheelFI.material = wheelMaterial;

	//rotate wheel so tread in xz plane
  	wheelFI.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
	wheelFI.parent = carBody;


    /*-----------------------End Wheel------------------------------------------*/

    /*------------Create other Wheels as Instances, Parent and Position----------*/
    var wheelFO = wheelFI.createInstance("FO");
    wheelFO.parent = carBody;
    wheelFO.position = new BABYLON.Vector3(-4.5, -2, 0.8);

    var wheelRI = wheelFI.createInstance("RI");
    wheelRI.parent = carBody;
    wheelRI.position = new BABYLON.Vector3(2.5, -2, -4.8);

    var wheelRO = wheelFI.createInstance("RO");
    wheelRO.parent = carBody;
    wheelRO.position = new BABYLON.Vector3(2.5, -2, 0.8);

    wheelFI.position = new BABYLON.Vector3(-4.5, -2, -4.8);

    /*------------End Create other Wheels as Instances, Parent and Position----------*/

    /*-----------------------Path------------------------------------------*/

	// Create array of points to describe the curve
    var points = [];
    var a = 90;
    var k = 3;

    // Trees positioning path constant
    var a2 = 95;

    // A sprite manager for trees
    var spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "textures/palm.png", 150, { width: 768, height: 1024 }, scene);

    var angularSlice = Math.PI * 2 / 120;
    for (var theta = 0; theta <= Math.PI * 2; theta = theta + angularSlice  ) {
        var r = a * Math.cos(k * theta);
        var x = r * Math.cos(theta);
        var z = r * Math.sin(theta);
        points.push(new BABYLON.Vector3(x, -3.5, z));

        // Trees curve
        // Change the radius formulae by uncommenting the
        // last part to put the tres around the shape
        var rT = a2 ; //* Math.cos(k * theta);
        var xT = rT * Math.cos(theta);
        var zT = rT * Math.sin(theta);

        // We do not want a tree at the intersection
        if (theta != 0 & theta != Math.PI * 2) {
            var tree = new BABYLON.Sprite("tree", spriteManagerTrees);
            tree.position.x = xT;
            tree.position.z = zT;
            tree.height = 12* 1024/768;
            tree.isPickable = true;
        }


    }

  //Draw the curve
	var track = BABYLON.MeshBuilder.CreateLines('track', {points: points}, scene);
	track.color = new BABYLON.Color3(0.75, 0, 0.5);
    /*-----------------------End Path------------------------------------------*/

    /*-----------------------Ground------------------------------------------*/
    var groundSize = 100;
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 3*groundSize, height: 3*groundSize}, scene);
    ground.position.y = -3.5;
    /*-----------------------End Ground------------------------------------------*/

    /*----------------Position and Rotate Car at Start---------------------------*/
    carBody.position.y = 1.0;
    carBody.position.z = 0;

	return scene;
}
