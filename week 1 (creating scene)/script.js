var scene = new THREE.Scene(); //created a three.js scene

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000) //create a camera
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true}); //create renderer
renderer.setClearColor("lightblue"); //essentially a background color
renderer.setSize(window.innerWidth,window.innerHeight); //set renderer size to size of the page

document.body.appendChild(renderer.domElement); //creates a canvas with our render's specifications


renderer.render(scene, camera); //just render (show) everything on our canvas