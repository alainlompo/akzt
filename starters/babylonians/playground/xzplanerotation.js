// Rotating a sphere on the xz plane
// see also: http://www.babylonjs-playground.com/#40U7AQ#2
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

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 2;
    sphere.position.x = 5;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    var r = 5;
    var theta = 0;
    scene.beforeRender = function () {
        theta =theta + 0.01;
        var newX = r * Math.cos(theta);
        var newZ = r * Math.sin(theta);
        sphere.position.x =  newX;
        sphere.position.z =  newZ;
       
    };

    return scene;

};