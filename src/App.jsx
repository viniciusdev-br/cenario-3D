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
        const pisoMadeira = new THREE.TextureLoader().load('/piso.jpeg');

        const pisoGeometry = new THREE.BoxGeometry(80, 0.5, 40);
        const pisoMaterial = new THREE.MeshStandardMaterial({ map: pisoMadeira });
        const pisoMesh = new THREE.Mesh(pisoGeometry, pisoMaterial);
        pisoMesh.receiveShadow = true;
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
            console.log(dog);

            dog.scene.position.set(2, 0, -2)
            dog.castShadow = true;
            dog.scene.scale.set(3,3,3);

            test.scene.add(dog.scene)
        }, undefined, (err) => {
            console.log(err);
        });

        gltfLoader.load('/cenario/scene2.gltf', (dog) => {
            dog.scene.position.set(0, 0, 0)
            dog.castShadow = true;
            dog.scene.scale.set(10,10,10);
            dog.scene.position.set(0, -1, -10)
            dog.receiveShadow = true;
            test.scene.add(dog.scene)
        });

        gltfLoader.load('/sky_felipe/scene.gltf', (dog) => {
            dog.scene.position.set(0, 0, 0)
            dog.castShadow = true;
            dog.scene.scale.set(0.5,0.5,0.5);
            dog.scene.position.set(0, -1, -10)
            dog.receiveShadow = true;
            test.scene.add(dog.scene)
        });

        gltfLoader.load('/sponge_bob/scene.gltf', (dog) => {
            dog.scene.position.set(0, 0, 0)
            dog.castShadow = true;
            dog.scene.scale.set(0.3,0.3,0.3);
            dog.scene.position.set(1.5, 0, -3)
            dog.receiveShadow = true;
            test.scene.add(dog.scene)
        });
        
        // let loadedShiba;
        // gltfLoader.load('/shiba/scene.gltf', (dog) => {
        //     loadedShiba = dog;

        //     dog.scene.position.set(0, 0, 0)
        //     dog.castShadow = true;
        //     dog.scene.scale.set(1,1,1);

        //     test.scene.add(dog.scene)
        // });

        // set up spot light + helper
        // const sl = new THREE.SpotLight(0x00ff00, 1, 8, Math.PI / 8, 0);
        // sl.position.set(0, 2, 2);
        // const slHelper = new THREE.SpotLightHelper(sl);
        // mainGroup.add(sl, slHelper);

        // // set up spot light gui
        // const slSettings = {
        //   visible: true,
        // };
        // const slFolder = gui.addFolder('spot light');
        // slFolder.add(slSettings, 'visible').onChange((value) => {
        //   sl.visible = value;
        //   slHelper.visible = value;
        // });
        // slFolder.add(sl, 'intensity', 0, 4, 0.5);
        // slFolder.add(sl, 'angle', Math.PI / 16, Math.PI / 2, Math.PI / 16);
        // slFolder.add(sl, 'castShadow');
        // slFolder.open();

        // const pl = new THREE.PointLight(0xffffff, 1, 8, 2);
        // pl.position.set(2, 2, 2);
        // const plHelper = new THREE.PointLightHelper(pl, 0.5);
        // mainGroup.add(pl, plHelper);

        // // set up point light gui
        // const plSettings = {
        //   visible: true,
        //   color: pl.color.getHex(),
        // };
        // const plFolder = gui.addFolder('point light');
        // plFolder.add(plSettings, 'visible').onChange((value) => {
        //   pl.visible = value;
        //   plHelper.visible = value;
        // });
        // plFolder.add(pl, 'intensity', 0, 2, 0.25);
        // plFolder.add(pl.position, 'x', -2, 4, 0.5);
        // plFolder.add(pl.position, 'y', -2, 4, 0.5);
        // plFolder.add(pl.position, 'z', -2, 4, 0.5);
        // plFolder.add(pl, 'castShadow');
        // plFolder
        //   .addColor(plSettings, 'color')
        //   .onChange((value) => pl.color.set(value));
        // plFolder.open();


        // PART 2 - Changing Geometry (scale, rotation)
        gui.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
        gui.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
        gui.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');
        gui.add(boxMesh.scale, 'x', 0, 2).name('Scale X Axis');
        gui.add(boxMesh.scale, 'y', 0, 2).name('Scale Y Axis');
        gui.add(boxMesh.scale, 'z', 0, 2).name('Scale Z Axis');

        const animate = () => {
            // if ( loadedShiba ) {
            //     loadedShiba.scene.rotation.y += 0.01;
            // }
            boxMesh.rotation.y += 0.01;
            requestAnimationFrame(animate);
        }
        animate();
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