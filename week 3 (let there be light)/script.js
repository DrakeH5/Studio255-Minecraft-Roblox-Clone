var scene = new THREE.Scene(); //created a three.js scene

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000) //create a camera
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true}); 
renderer.setClearColor("lightblue"); 
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement); 


var geometry = new THREE.BoxGeometry(1, 1, 1); 
var material = new THREE.MeshLambertMaterial({color: 0xFFCC00}); 
var cube1 = new THREE.Mesh(geometry, material);

cube1.rotation.y = 45;
scene.add(cube1);


var light = new THREE.PointLight(0xFFFFFF, 1, 500); 
light.position.set(10, 0, 25);
scene.add(light);


var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera); 
}

render();