// An attempt to mock physical rebounds with loss of energy (Work in progress)
// See also: http://www.babylonjs-playground.com/#TPLB4R#8
var createScene = function() {
	var scene = new BABYLON.Scene(engine);
	    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, Math.PI / 2.5, 200, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);
    camera.minZ = 0.1;

    // Environment Texture
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);

    var woodPlank = BABYLON.MeshBuilder.CreateBox("plane", { width: 650, height: 1, depth: 650 }, scene);
    woodPlank.position.y = -150;

    var wood = new BABYLON.PBRMaterial("wood", scene);
    wood.reflectionTexture = hdrTexture;
    wood.environmentIntensity = 1;
    wood.specularIntensity = 0.3;

    wood.reflectivityTexture = new BABYLON.Texture("textures/reflectivity.png", scene);
    wood.useMicroSurfaceFromReflectivityMapAlpha = true;

    wood.albedoColor = BABYLON.Color3.White();
    wood.albedoTexture = new BABYLON.Texture("textures/albedo.png", scene);
    woodPlank.material = wood;

    // Create a sphere high in the air
    var bioSphere = BABYLON.Mesh.CreateSphere("bioSphere", 48, 20.0, scene);
    bioSphere.translate(new BABYLON.Vector3(0, 1, 0), 50);
    bioSphere.translate(new BABYLON.Vector3(1,0,0), 50);
    
    // Material
    var material = new BABYLON.StandardMaterial("kosh", scene);
    material.bumpTexture = new BABYLON.Texture("normalMap.jpg", scene);
    material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    material.reflectionTexture = new BABYLON.Texture("Tree.png", scene);
    material.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
    bioSphere.material = material;

    // Animations
    var t = 0;
    var vx = 1.5;
    var h0 = 50;
    var g =  9.80665;
    scene.beforeRender = function () {
        t = t + 0.01;
        var newX = bioSphere.position.x - (vx * t);
        if (newX >= -10) {
            bioSphere.position.x = newX;
        }

        var newY = h0 - (0.5 * g * t * t);
        if (newY >= -140) {
            bioSphere.position.y = newY;
        }

        var newZ = bioSphere.position.z + 2 * t;
        if (newZ <= 10) {
            bioSphere.position.z = newZ;
        }
    };
    
	return scene;
};