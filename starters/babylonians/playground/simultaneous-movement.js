// Simultaneous movement in various planes
// One in xz plane
// One in yz plane
// two in PI/4 - bent xz planes
// see also: http://www.babylonjs-playground.com/#GA4N8J#1
var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // 4 sphere to illustrate simultaneous movement in various planes
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);
    var sphere2 = BABYLON.Mesh.CreateSphere("sphere2", 16, 1, scene);

    var sphere3 = BABYLON.Mesh.CreateSphere("sphere3", 16, 1, scene);

    var sphere4 = BABYLON.Mesh.CreateSphere("sphere4", 16, 1, scene);

    // Creating materials with diffuse colors
    var material = new BABYLON.StandardMaterial("material01", scene);
    material.diffuseColor = new BABYLON.Color3(1, 0, 0);

    var material2 = new BABYLON.StandardMaterial("material02", scene);
    material2.diffuseColor = new BABYLON.Color3(0, 1, 0);

    var material3 = new BABYLON.StandardMaterial("material03", scene);
    material3.diffuseColor = new BABYLON.Color3(0, 0, 1);

    var material4 = new BABYLON.StandardMaterial("material04", scene);
    material4.diffuseColor = new BABYLON.Color3(0.75, 0.5, 0.25);

    // Shifting the sphere from default initial positions
    sphere.position.y = 2;
    sphere.position.x = 5;
    sphere2.position.z = 5;
    sphere3.position.z = -5;
    sphere4.position.z = -5;

    // Applying materials
    sphere.material = material;
    sphere2.material = material2;
    sphere3.material = material3;
    sphere4.material = material4;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    var r = 5;
    var theta = 0;
    var alpha = Math.PI / 4;
    scene.beforeRender = function () {
        theta =theta + 0.01;
        
        var newX = r * Math.cos(theta);
        var newZ = r * Math.sin(theta);
        sphere.position.x =  newX;
        sphere.position.z =  newZ;

        var newZ2 = r * Math.cos(theta);
        var newY2 = r * Math.sin(theta);

        // We bend the zy plane by a PI/4 angle
        var newX2 = r*Math.sin(theta)* Math.cos(alpha);

        sphere2.position.z = newZ2;
        sphere2.position.y = newY2;
        sphere2.position.x = newX2;

        var newZ3 = r * Math.cos(theta);
        var newY3 = r * Math.sin(theta);
        var newX3 = -r*Math.sin(theta)* Math.cos(alpha); 

        sphere3.position.z = newZ3;
        sphere3.position.y = newY3;
        sphere3.position.x = newX3;
       
        var newZ4 = r * Math.cos(theta);
        var newY4 = r * Math.sin(theta);
        
        sphere4.position.z = -newZ4;
        sphere4.position.y = newY4;
        
    };

    return scene;
};