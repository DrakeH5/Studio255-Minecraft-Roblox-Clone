const socket = io("ws://localhost:8080");


var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000) //create a camera
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true}); 
renderer.setClearColor("lightblue"); 
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement); 



var raycaster = new THREE.Raycaster();
var downDirection = new THREE.Vector3( 0, -1, 0)
var gravity = 0.2
var playerHeight = 0.5


var scene = new THREE.Scene()

  socket.on("gameDataToClient", data => {
    //console.log(data[0])
    scene = new THREE.ObjectLoader().parse( JSON.parse( data ) );
    //scene.children = data
    /*for(var i=0; i<data.length; i++){
      if(data[i].object.type == "Mesh" && data[i].object.geometry && data[i].object.material){
        var geometry = data[i].object.geometry; 
        var material = data[i].object.material; 
        scene.add(new THREE.Mesh(geometry, material))
      }
    }*/
    /*raycaster.set(camera.position, downDirection);
            const intersects = raycaster.intersectObjects(scene.children);
            if(intersects.length>0) {
              if(intersects[0].distance>playerHeight-1) {
                  camera.position.y-=gravity;
              }
            }*/
      //renderer.render(scene, camera); 
  })


  var render = function() {
    raycaster.set(camera.position, downDirection);
            const intersects = raycaster.intersectObjects(scene.children);
            if(intersects.length>1) {
              if(intersects[2].distance>playerHeight) {
                  camera.position.y-=gravity;
              }
            }
      requestAnimationFrame(render);
      renderer.render(scene, camera); 
  }
  
  render();
setInterval(render(), 100)








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
    socket.emit("playerPos", camera.position)
  };
