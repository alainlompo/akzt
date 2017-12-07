// See also: http://www.babylonjs-playground.com/#KV3MLK#4
var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Setup camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(-10, 10, 0));
    camera.attachControl(canvas, true);

    var sunLight = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(1, -1, 0), scene);

    var sunMater = new BABYLON.StandardMaterial("sunMater", scene);
    var sun = BABYLON.Mesh.CreateSphere("sun", 16, 8, scene);

    var dereMater = new BABYLON.PBRBaseMaterial("dere", scene);
    var dere = BABYLON.Mesh.CreateSphere("dere", 10, 1.6 );

    // dere's initial position
    dere.position.x = 6;
    dere.position.y = 3;
    dere.position.z = -5;

    dereMater.specular = new BABYLON.Color3(0,1,0);
    dere.material = dereMater;
 
    // sun material
    sunMater.diffuseColor = new BABYLON.Color3(1, 0, 0);
    sun.material = sunMater;

    
    sunLight.diffuse = new BABYLON.Color3(1, 0, 0);
    sunLight.specular = new BABYLON.Color3(233, 189, 21);

    // Animations
    var alpha = 0;
    var theta = Math.PI/4;
    var dereRadius = 6;
    scene.beforeRender = function () {
        var newY = dereRadius * Math.cos(alpha);
        var newZ = dereRadius * Math.sin(alpha);
        var newX = dereRadius * Math.sin(alpha)* Math.cos(theta);
        dere.position.x = newX;
        dere.position.y = newY;
        dere.position.z = newZ;

        alpha += 0.005;
    };

    return scene;
}