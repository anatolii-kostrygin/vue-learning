import * as THREE from "three";

let scene, camera, renderer, cube;

function createCube(initialColor) {
  const cubeGeometry = new THREE.BoxGeometry();
  const faces = new THREE.Mesh(
    cubeGeometry,
    new THREE.MeshBasicMaterial({ color: initialColor ?? "green" })
  );
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(cubeGeometry),
    new THREE.LineBasicMaterial({ color: 0xffffff })
  );
  const cube = new THREE.Group();
  cube.add(faces);
  cube.add(edges);
  cube.position.set(0, cubeGeometry.parameters.height / 2, 0);

  return cube;
}

function createGround() {
  const gridSize = 10; // Size of the grid
  const gridDivision = 10; // Number of divisions for the grid

  // Create the geometry
  const geometry = new THREE.PlaneGeometry(
    gridSize,
    gridSize,
    gridDivision,
    gridDivision
  );

  // Create a material for the grid
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff, // Color of the grid lines
    wireframe: true, // Render only the wireframe
    side: THREE.DoubleSide, // Render both sides of the grid
  });

  // Create the mesh
  const grid = new THREE.Mesh(geometry, material);

  // Rotate the grid to lay it flat on the ground
  grid.rotation.x = -Math.PI / 2;
  grid.position.set(0, 0, 0);

  // Add the grid to the scene
  return grid;
}

export function createRenderer(container, initialColor) {
  // Create the scene
  scene = new THREE.Scene();

  // Create and position the camera
  camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.position.y = 2;
  camera.lookAt(0, 0, 0);

  cube = createCube(initialColor);
  scene.add(cube);

  const grid = createGround();
  scene.add(grid);

  // Create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  // Animate the cube
  const animate = function () {
    requestAnimationFrame(animate);
    // console.log("animate called");

    // scene.rotation.x += 0.01;
    scene.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
}

export function disposeRenderer() {
  if (renderer) {
    renderer.dispose();
  }
}

export function setColor(newColor) {
  console.log("set color", newColor);
  for (const child of cube.children) {
    if (child instanceof THREE.Mesh) {
      child.material.color.set(newColor);
    }
  }
}
