// See also: http://www.babylonjs-playground.com/#XVFCH2#1

var createScene = function() {
	var scene = new BABYLON.Scene(engine);

	// Setup environment
	var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 90, BABYLON.Vector3.Zero(), scene);
	camera.lowerBetaLimit = 0.1;
	camera.upperBetaLimit = (Math.PI / 2) * 0.9;
	camera.lowerRadiusLimit = 30;
	camera.upperRadiusLimit = 150;
	camera.attachControl(canvas, true);

    // light1
	var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	light.position = new BABYLON.Vector3(20, 40, 20);
	light.intensity = 0.5;

    var lightSphere = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
	lightSphere.position = light.position;
	lightSphere.material = new BABYLON.StandardMaterial("light", scene);
	lightSphere.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

    // light2
	var light2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(30, 40, 20),
												new BABYLON.Vector3(-1, -2, -1), 1.1, 16, scene);
	light2.intensity = 0.5;

    var lightSphere2 = BABYLON.Mesh.CreateSphere("sphere", 10, 2, scene);
	lightSphere2.position = light2.position;
	lightSphere2.material = new BABYLON.StandardMaterial("light", scene);
	lightSphere2.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

    // Ground
	var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/heightMap.png", 100, 100, 100, 0, 10, scene, false);
	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	groundMaterial.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
	groundMaterial.diffuseTexture.uScale = 6;
	groundMaterial.diffuseTexture.vScale = 6;
	groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.position.y = -2.05;
	ground.material = groundMaterial;

    // Cylinder
	var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 20, 10, 10, 10, scene);

	// Box
    var sphere1 = BABYLON.Mesh.CreateSphere("sphere1", 15,10, scene, false );
    var sphere2 = BABYLON.Mesh.CreateSphere("sphere2", 15,10, scene, false );
    sphere1.parent = cylinder;
    sphere2.parent = cylinder;

    sphere1.position.x = cylinder.position.x - 5;
    sphere1.position.z = cylinder.position.z + 5;
    sphere1.position.y = cylinder.position.y + 10;

    sphere2.position.x = cylinder.position.x + 5;
    sphere2.position.z = cylinder.position.z - 5;
    sphere2.position.y = cylinder.position.y - 10;

    // Shadows
	var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
	shadowGenerator.addShadowCaster(cylinder);
	shadowGenerator.useExponentialShadowMap = true;

	var shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light2);
	shadowGenerator2.addShadowCaster(cylinder);
	shadowGenerator2.usePoissonSampling = true;

	ground.receiveShadows = true;

    // Animations
	var alpha = 0;
	scene.registerBeforeRender(function () {
		cylinder.rotation.x += 0.01;
		cylinder.rotation.z += 0.02;

		cylinder.position = new BABYLON.Vector3(Math.cos(alpha) * 30, 30, Math.sin(alpha) * 30);
		alpha += 0.01;

	});

	return scene;
};
