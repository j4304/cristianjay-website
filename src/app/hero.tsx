// hero.tsx
import { Environment, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useRef, useEffect, Suspense, useState } from "react";
import { Group, MeshStandardMaterial, Object3D } from "three";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { ThreeTunnel } from "./tunnel";
import Text from "./text";

const MODEL_URL = "https://yutlscdwom45uhjn.public.blob.vercel-storage.com/models/jack-rgIVo5UjrzycOiaKnNkZZBawpozquK.glb"
// const MODEL_URL = "/models/jack.glb"

const JackModel = ({ onLoaded }: { onLoaded: () => void }) => {
  const modelRef = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  useEffect(() => {
    scene.traverse((child: Object3D) => {
      if (
        "material" in child &&
        child.material instanceof MeshStandardMaterial
      ) {
        child.material.transparent = false;
        child.material.opacity = 1;
      }
    });

    onLoaded?.();
  }, [scene, onLoaded]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.position.y = Math.sin(t * 0.8) * 0.25;
      modelRef.current.rotation.y = Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 20, 10]} intensity={0.6} />
      <Environment preset="warehouse" />
      <primitive
        object={scene}
        ref={modelRef}
        scale={6}
        position={[4, 6, -1]}
        rotation={[1.9, Math.PI, 0]}
      />
    </>
  );
};

useGLTF.preload(MODEL_URL);

const Hero = ({ onReady, startAnimation }: { onReady: () => void; startAnimation: boolean }) => {
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    if (modelReady) onReady();
  }, [modelReady, onReady]);

  return (
    <ThreeTunnel.In>
      <Suspense fallback={null}>
        <Text animate={startAnimation} />
      </Suspense>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 20, 10]} intensity={0.6} />
      <Environment preset="warehouse" />

      <Suspense fallback={null}>
        <JackModel onLoaded={() => setModelReady(true)} />
      </Suspense>

      {modelReady && (
        <EffectComposer>
          <Fluid
            fluidColor="#212121"
            backgroundColor="#000000"
            blend={0.66}
            rainbow={false}
          />
        </EffectComposer>
      )}
    </ThreeTunnel.In>
  );
};


export default Hero;
