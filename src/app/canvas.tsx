import { Canvas as R3fCanvas } from "@react-three/fiber";
import { ThreeTunnel } from "./tunnel";
import { Suspense } from "react";

const Canvas = () => {
  return (
    <R3fCanvas
      gl={{ antialias: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]} // Lower pixel ratio on low-end devices
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
