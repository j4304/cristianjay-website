import { Text as DreiText } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { memo } from "react";

// eslint-disable-next-line react/display-name
const Text = memo(() => {
  const cristianJaySpring = useSpring({
    from: { y: -4 },
    to: { y: 0.2 },
    config: { mass: 1.2, tension: 80, friction: 30 },
    delay: 300,
  });

  const cosepSpring = useSpring({
    from: { y: -4 },
    to: { y: 0.2 },
    config: { mass: 1.2, tension: 80, friction: 30 },
    delay: 700, 
  });

  return (
    <>
      <a.group position-y={cristianJaySpring.y}>
        <DreiText
          font="/fonts/Akira.otf"
          letterSpacing={0.03}
          fontSize={0.6}
          renderOrder={1}
          position={[-2.4, -2, 0]}
          color="#ffffff"
        >
          CRISTIAN JAY
        </DreiText>
      </a.group>

      <a.group position-y={cosepSpring.y}>
        <DreiText
          font="/fonts/Akira.otf"
          letterSpacing={0.03}
          fontSize={0.6}
          renderOrder={1}
          position={[-3.9, -2.7, 0]}
          color="#ffffff"
        >
          COSEP
        </DreiText>
      </a.group>
    </>
  );
});

export default Text;
