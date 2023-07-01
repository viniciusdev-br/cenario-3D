import { useEffect } from 'react';

import * as THREE from 'three';
import { GUI } from 'dat.gui';
import  { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import SceneInit from './lib/SceneInit';

function App() {
    useEffect(() => {
        const test = new SceneInit('myThreeJsCanvas');
        test.initialize();
        test.animate();

        // Inicializa GUI
        const gui = new GUI();
        const mainGroup = new THREE.Group();
        mainGroup.position.y = 0.5;
        test.scene.add(mainGroup);

        // const flamesTexture = new THREE.TextureLoader().load('/flames.jpg');
        // test.scene.background = flamesTexture;

        const gotasTexture = new THREE.TextureLoader().load('/gotas.jpg');
        const pisoMadeira = new THREE.TextureLoader().load('/areia.jpg');

        const pisoGeometry = new THREE.BoxGeometry(80, 2, 40);
        const pisoMaterial = new THREE.MeshStandardMaterial({ map: pisoMadeira });
        const pisoMesh = new THREE.Mesh(pisoGeometry, pisoMaterial);
        pisoMesh.receiveShadow = true;
        pisoMesh.castShadow = true;
        pisoMesh.position.set(0, -8, 0);

        mainGroup.add(pisoMesh);


        const boxGeometry = new THREE.SphereGeometry(1);
        const boxMaterial = new THREE.MeshStandardMaterial({ map: gotasTexture });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        boxMesh.castShadow = true;
        boxMesh.position.set(10, 10, 0);

        mainGroup.add(boxMesh);


        const al = new THREE.AmbientLight(0xffffff, 0.5);
        mainGroup.add(al);
        // set up ambient light gui
        const alFolder = gui.addFolder('ambient light');
        const alSettings = { color: al.color.getHex() };
        alFolder.add(al, 'visible');
        alFolder.add(al, 'intensity', 0, 1, 0.1);
        alFolder
            .addColor(alSettings, 'color')
            .onChange((value) => al.color.set(value));
        alFolder.open();

        const dl = new THREE.DirectionalLight(0xffffff, 0.5);
        dl.position.set(0, 10, 10);
        dl.castShadow = true;
        const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
        mainGroup.add(dl);
        
        const dlSettings = {
            visible: true,
            color: dl.color.getHex(),
        };
        const dlFolder = gui.addFolder('directional light');
        dlFolder.add(dlSettings, 'visible').onChange((value) => {
            dl.visible = value;
            dlHelper.visible = value;
        });
        dlFolder.add(dl, 'intensity', 0, 1, 0.25);
        dlFolder.add(dl.position, 'y', 1, 4, 0.5);
        dlFolder.add(dl, 'castShadow');
        dlFolder
            .addColor(dlSettings, 'color')
            .onChange((value) => dl.color.set(value));
        dlFolder.open();

        const gltfLoader = new GLTFLoader();
        gltfLoader.load('/dog/scene2.gltf', (dog) => {
            const model = dog.scene;
            test.scene.add(model);
            model.scale.set(3,3,3);
            model.position.set(2, 0, -2)

            model.traverse(function(node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });

        }, undefined, (err) => {
            console.log(err);
        });

        gltfLoader.load('/cenario/scene2.gltf', (dog) => {
            const model = dog.scene;
            model.scale.set(10,10,10);
            model.position.set(0, -1, -10)
            
            model.traverse(function(node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            test.scene.add(model);
        });

        gltfLoader.load('/stitch/scene.gltf', (dog) => {
            const model = dog.scene;
            model.position.set(0, -6, 14)
            model.scale.set(0.5,0.5,0.5);
            
            model.traverse(function(node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            test.scene.add(model);
        });

        gltfLoader.load('/stitch/scene.gltf', (dog) => {
            const model = dog.scene;
            model.position.set(-3, -6, 16);
            model.scale.set(0.5,0.5,0.5);
            model.rotateY(Math.PI / 3);
            
            model.traverse(function(node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            test.scene.add(model);
        });

        gltfLoader.load('/stitch/scene.gltf', (dog) => {
            const model = dog.scene;
            model.position.set(3, -6, 16);
            model.scale.set(0.5,0.5,0.5);
            model.rotateY(Math.PI / -3);
            test.scene.add(model);
        });

        let mixer
        gltfLoader.load('/stitch_stoped/scene.gltf', (dog) => {
            const model = dog.scene;
            model.position.set(0, -6, 17)
            model.scale.set(3,3,3);
            model.rotateY(Math.PI / -1);
            test.scene.add(model);
            
            mixer = new THREE.AnimationMixer(model);
            console.log(dog.animations);
            const animation = dog.animations[0];
            const action = mixer.clipAction(animation);
            action.play();
            
            animate();
        });

        gltfLoader.load('/sky_felipe/scene.gltf', (dog) => {
            dog.scene.position.set(0, 0, 0)
            dog.castShadow = true;
            dog.scene.scale.set(0.8,0.8,0.8);
            dog.scene.position.set(0, -2, -10)
            dog.scene.traverse(function(node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            test.scene.add(dog.scene)
        });

        gltfLoader.load('/sponge_bob/scene.gltf', (dog) => {
            dog.scene.position.set(0, 0, 0)
            dog.castShadow = true;
            dog.scene.scale.set(0.3,0.3,0.3);
            dog.scene.position.set(1.5, 0, -3)
            dog.receiveShadow = true;
            dog.scene.traverse(function(node) {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            test.scene.add(dog.scene)
        });
        
        // PART 2 - Changing Geometry (scale, rotation)
        gui.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
        gui.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
        gui.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
        gui.add(boxMesh.scale, 'x', 0, 2).name('Scale X Axis');
        gui.add(boxMesh.scale, 'y', 0, 2).name('Scale Y Axis');
        gui.add(boxMesh.scale, 'z', 0, 2).name('Scale Z Axis');


        const animate = () => {
            boxMesh.rotation.y += 0.01;

            const delta = test.clock.getDelta();
            mixer.update(delta);

            requestAnimationFrame(animate);
        }
        return () => {
            gui.destroy();
        }
    }, []);

    return (
        <div>
            <canvas id="myThreeJsCanvas" />
        </div>
    );
}

export default App;