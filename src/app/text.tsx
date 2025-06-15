import { Text as DreiText } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useEffect, useState } from "react";

const Text = ({ animate }: { animate: boolean }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      setShouldAnimate(true);
    }
  }, [animate]);

  const cristianJaySpring = useSpring({
    y: shouldAnimate ? 0.2 : -4,
    config: { mass: 1.2, tension: 80, friction: 30 },
    delay: shouldAnimate ? 300 : 0,
  });

  const cosepSpring = useSpring({
    y: shouldAnimate ? 0.2 : -4,
    config: { mass: 1.2, tension: 80, friction: 30 },
    delay: shouldAnimate ? 700 : 0,
  });

  return (
    <>
      <a.group position-y={cristianJaySpring.y}>
        <DreiText
          font="/fonts/Akira.otf"
          letterSpacing={0.03}
          fontSize={0.45}
          renderOrder={1}
          position={[-3, -2, 0]}
          color="#ffffff"
        >
          CRISTIAN JAY
        </DreiText>
      </a.group>

      <a.group position-y={cosepSpring.y}>
        <DreiText
          font="/fonts/Akira.otf"
          letterSpacing={0.03}
          fontSize={0.45}
          renderOrder={1}
          position={[-4.13, -2.4, 0]}
          color="#ffffff"
        >
          COSEP
        </DreiText>
      </a.group>
    </>
  );
};

export default Text;
