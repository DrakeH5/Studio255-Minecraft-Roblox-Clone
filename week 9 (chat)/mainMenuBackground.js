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
cube1.position.x = -4
cube1.rotation.y = 45;
scene.add(cube1);


var geometry = new THREE.BoxGeometry(1, 2, 0.5); 
var material = new THREE.MeshLambertMaterial({color: 0xFFCC00}); 
var cube2 = new THREE.Mesh(geometry, material);
cube2.position.x = 7
cube2.position.z = -6
cube2.rotation.y = 0;
scene.add(cube2);


var geometry = new THREE.BoxGeometry(30, 1, 30); 
var material = new THREE.MeshLambertMaterial({color: "green"}); 
var ground = new THREE.Mesh(geometry, material);
ground.position.y = -1
scene.add(ground);


var light = new THREE.PointLight(0xFFFFFF, 1, 500); 
light.position.set(10, 10, 0);
scene.add(light);


var raycaster = new THREE.Raycaster();
var downDirection = new THREE.Vector3( 0, -1, 0)
var gravity = 0.2
var playerHeight = 2

var render = function() {
  raycaster.set(camera.position, downDirection);
          const intersects = raycaster.intersectObjects(scene.children);
          if(intersects.length>0) {
            if(intersects[0].distance>playerHeight-1) {
                camera.position.y-=gravity;
            }
          }
    requestAnimationFrame(render);
    renderer.render(scene, camera); 
}

render();
