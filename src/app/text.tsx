import { Text as DreiText } from "@react-three/drei";

const Text = () => {
  return (
    <group position-y={0.2}>
      <DreiText
        // font="/fonts/Inter-Black.otf"
        letterSpacing={-0.07}
        fontSize={0.94}
        renderOrder={1}
        position-y={0.8}
        color="#ffffff"
      >
     CRISTIAN JAY
      </DreiText>

      <DreiText
        letterSpacing={-0.07}
        position-y={-0.12}
        fontSize={0.94}
        color="#ffffff"
      >
        COSEP
      </DreiText>

      <DreiText
        maxWidth={4.2}
        textAlign="center"
        fontSize={0.1}
        lineHeight={1.5}
        position-y={-1}
        color="white"
      >
        🚧 THIS WEBSITE IS CURRENTLY UNDER DEVELOPMENT. STAY TUNED! 🚧
      </DreiText>
    </group>
  );
};

export default Text;
