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


var geometry = new THREE.BoxGeometry(30, 1, 30); 
var material = new THREE.MeshLambertMaterial({color: 0xFFCC00}); 
var ground = new THREE.Mesh(geometry, material);
ground.position.y = -1
scene.add(ground);


var light = new THREE.PointLight(0xFFFFFF, 1, 500); 
light.position.set(10, 10, 0);
scene.add(light);


var raycaster = new THREE.Raycaster();
var downDirection = new THREE.Vector3( 0, -1, 0 )
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








document.body.requestPointerLock = document.body.requestPointerLock ||
                                    document.body.mozRequestPointerLock;
        document.exitPointerLock = document.exitPointerLock ||
                                   document.mozExitPointerLock;
        document.body.onclick = function() {
          document.body.requestPointerLock();
        };
        


document.body.onmousemove = function(evt) {
    camera.rotation.y-=evt.movementX/65;
    //if(Math.abs(camera.rotation.x)<1){camera.rotation.x-=evt.movementY/65;}else{camera.rotation.x-=(camera.rotation.x/Math.abs(camera.rotation.x))/100}
  };

  document.body.onkeydown = function (evt) {
    if(evt.keyCode==38||evt.keyCode==87) { //forwards
      var direction = new THREE.Vector3();
      camera.getWorldDirection( direction );
      camera.position.add( direction );
    }
    if(evt.keyCode==40||evt.keyCode==83) { //backwards
      var direction = new THREE.Vector3();
      camera.getWorldDirection( direction );
      camera.position.sub( direction );
    }
    if(evt.keyCode==32) { //jump
      this.camera = camera;
      this.camera.position.y+=1;
    }
    if(evt.keyCode==17) { //go down //control key
      this.camera = camera;
      this.camera.position.y-=1;
    }
  };
