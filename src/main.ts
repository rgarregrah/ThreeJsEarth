import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import earth from "./images/earthmap1k.jpg";

//ページの読み込み待ち
window.addEventListener("load", init);
//サイズ指定
const width: number = 960;
const height: number = 540;

function init() {
  //レンダラーをつくる
  const renderer: THREE.Renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas")
  });
  renderer.setSize(width, height);

  // シーン作成
  const scene: THREE.Scene = new THREE.Scene();

  //カメラ作成
  const camera: THREE.Camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 1000);
  const controls: OrbitControls = new OrbitControls(camera);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  //地球ありますねぇ
  const geometry2: THREE.Geometry = new THREE.SphereGeometry(300, 300, 300);
  const material2: THREE.Material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(earth)
  });
  const mesh2: THREE.Mesh = new THREE.Mesh(geometry2, material2);
  scene.add(mesh2);

  //星の屑
  const createStarField = () => {
    const geometry: THREE.Geometry = new THREE.Geometry();
    for (let i = 0; i < 1000; i++) {
      geometry.vertices.push(
        new THREE.Vector3(
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5)
        )
      );
    }
    const material: THREE.Material = new THREE.PointsMaterial({
      size: 10,
      color: 0xffffff
    });
    const mesh: THREE.Points = new THREE.Points(geometry, material);
    scene.add(mesh);
  };
  createStarField();

  //平行光源
  const directionalLight: THREE.Light = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  tick();

  function tick() {
    mesh2.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}
