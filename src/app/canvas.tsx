import { Canvas as R3fCanvas } from "@react-three/fiber";
import { ThreeTunnel } from "./tunnel";
import { Suspense, useEffect } from "react";

const Canvas = ({ onReady }: { onReady: () => void }) => {
  useEffect(() => {
    // Trigger ready immediately for now — or you can delay until textures/models load
    onReady();
  }, [onReady]);

  return (
    <R3fCanvas
      gl={{ antialias: true, powerPreference: "high-performance" }}
      frameloop="always" // force continuous render
      flat // skip unnecessary tone mapping
      shadows={false}
      dpr={[1, 1.5]}
      // camera={{ fov: 40, near: 0.1, far: 1000, position: [1, 3, 10] }}
      camera={{ fov: 40, near: 0.1, far: 1000, position: [0, 0, 10] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Suspense fallback={null}>
        <ThreeTunnel.Out />
      </Suspense>
    </R3fCanvas>
  );
};

export default Canvas;
