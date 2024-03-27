import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

var width = window.innerWidth;
var height = window.innerHeight;


// 1: Set up the scene

var scene = new THREE.Scene();


//***************************CAMERA******************** */
// 2: Add a camera
var camera = new THREE.PerspectiveCamera(75,width/height,0.1,1000);
camera.position.z = 8;
camera.position.y = 3;
camera.rotation.x = -0.1;



// 3: create a renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#141414");
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

//***************************OBJECTS******************** */
// 4: Add objects to the scene


//add plane
const geometryPlane = new THREE.PlaneGeometry( 1, 1 );
const materialPlane = new THREE.MeshLambertMaterial( {color: "#61baff", side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometryPlane, materialPlane);
scene.add( plane );

plane.rotation.x = THREE.MathUtils.degToRad(90);
plane.scale.x = 60;     
plane.scale.y = 60;

// Define wall dimensions
const wallWidth = 20; // Adjust as needed
const wallHeight = 10; // Adjust as needed

// Create material for walls
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee });

// Create geometry for walls
const wallGeometry = new THREE.PlaneGeometry(wallWidth, wallHeight);

// Create individual walls
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.set(-wallWidth / 2, wallHeight / 2, 0); // Position to the left
leftWall.rotation.y = Math.PI / 2; // Rotate to face inward
scene.add(leftWall);

const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.set(wallWidth / 2, wallHeight / 2, 0); // Position to the right
rightWall.rotation.y = -Math.PI / 2; // Rotate to face inward
scene.add(rightWall);

const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.set(0, wallHeight / 2, -wallWidth / 2); // Position at the back
backWall.rotation.y = Math.PI; // Rotate to face inward
scene.add(backWall);

const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
frontWall.position.set(0, wallHeight / 2, wallWidth / 2); // Position at the front
scene.add(frontWall);


//add tube
class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}

const path = new CustomSinCurve( 10 );
const geometryTube = new THREE.TubeGeometry( path, 20, 2, 8, false );
const materialTube = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
const tube = new THREE.Mesh( geometryTube, materialTube );
scene.add( tube );

tube.scale.x = .2
tube.scale.y = .2
tube.scale.z = .2;
tube.position.set(0,5,2);

//add dodecahedron
const geometryDodecahedron = new THREE.DodecahedronGeometry(1,0);
const materialDodecahedron = new THREE.MeshLambertMaterial({color: 0xff00ff});
const dodecahedron = new THREE.Mesh(geometryDodecahedron,materialDodecahedron);
scene.add(dodecahedron);

dodecahedron.position.set(5,2,1);

//add octahedron
const geometryOctahedron = new THREE.OctahedronGeometry(1,0);
const materialOctahedron = new THREE.MeshLambertMaterial({color: 0xff00ff});
const octahedron = new THREE.Mesh(geometryOctahedron,materialOctahedron);
scene.add(octahedron);

octahedron.position.set(-5,2,1);


//ADD BIRD MODEL
var bird;
//declare variables for animation
var mixer;          // Three.JS AnimationMixer
var bird_anim_FLY;  //animation FLY
//adding the 3D model 
const gltfLoader = new GLTFLoader();
gltfLoader.load('../media/models/phoenix_bird.glb', function(gltf){
    bird = gltf.scene;
    bird.scale.set(0.01,0.01,0.01);
    bird.position.set(-5,5,-10);
    // scene.add(bird);

    //ANIMATION MIXER
    mixer = new THREE.AnimationMixer(bird);
    // //apply the animation
    bird_anim_FLY = gltf.animations[0]; //first animation
    mixer.clipAction( bird_anim_FLY ).play();
});

//add candle model
var candle;
//declare variables for animation
var mixerCandle;          // Three.JS AnimationMixer
var candle_anim_FLY;  //animation FLY
//adding the 3D model
const gltfLoaderCandle = new GLTFLoader();
gltfLoaderCandle.load('../media/models/candle_light.glb', function(gltf){
    candle = gltf.scene;
    candle.scale.set(0.1,0.1,0.1);
    candle.position.set(10,0,5);
    scene.add(candle);

    //ANIMATION MIXER
    mixerCandle = new THREE.AnimationMixer(candle);
    // //apply the animation
    candle_anim_FLY = gltf.animations[0]; //first animation
    mixerCandle.clipAction( candle_anim_FLY ).play();
});





//***************************LIGHTS******************** */
var lightSize = 10;
// 5: Add lighting to the scene
var pointLight = new THREE.PointLight(0xFFFFF,lightSize,100)
// scene.add(pointLight);

// //Add light helper
// const pointLightHelper = new THREE.PointLightHelper(pointLight, lightSize);
// scene.add(pointLightHelper);

// //Add Ambient Light
// var ambientLight = new THREE.AmbientLight(0xF5BB20, 5);
// scene.add(ambientLight);

// //Add Hemisphere Light
// var hemisphereLight = new THREE.HemisphereLight(0x0000FF, 0x00FF00, 1);
// scene.add(hemisphereLight);

//add point light
var pointLight = new THREE.PointLight(0xFA8A0C, 10, 100);
pointLight.position.set(10,0,5);
scene.add(pointLight);

//add point light
var pointLight = new THREE.PointLight(0xFA8A0C, 10, 100);
pointLight.position.set(0,5,2);
scene.add(pointLight);

//add point light
var pointLight = new THREE.PointLight(0xFA8A0C, 5, 100);
pointLight.position.set(-5,2,1);
scene.add(pointLight);

//add point light
var pointLight = new THREE.PointLight(0xFA8A0C, 5, 100);
pointLight.position.set(5,2,1);
scene.add(pointLight);





//***************************CONTROLS******************** */
//Adding Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableZoom = false;
// controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

//Responsive window size
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

//***************************ANIMATIONS****************** */
const clock = new THREE.Clock();

// FINAL: Render the scene
function animate(){
    requestAnimationFrame(animate);

    tube.rotation.x += 0.08;
    tube.rotation.y += 0.08;
    dodecahedron.rotation.x += 0.08;
    dodecahedron.rotation.y += 0.08;
    octahedron.rotation.x += 0.08;
    octahedron.rotation.y += 0.08;



    controls.update();

    //update mixer
    if(mixer){
        mixer.update(clock.getDelta());
    }

    // console.log(bird.position.x);

    // if(bird.position.x > 12){
    //     bird.rotation.y = THREE.MathUtils.degToRad(180);
    //     bird.position.x -= 0.200;
    // }

    // if(bird.position.x < 2){
    //     // bird.rotation.y = THREE.MathUtils.degToRad(180);
    //     bird.position.x += 0.200;
    // }

    console.log(candle.position.x);

    if(candle.position.x < -2){
        candle.rotation.y = THREE.MathUtils.degToRad(180);
        candle.position.x += 0.200;
    }

    if(candle.position.x > -12){
        // bird.rotation.y = THREE.MathUtils.degToRad(180);
        candle.position.x -= 0.200;
    }

    renderer.render(scene,camera);
}

animate();