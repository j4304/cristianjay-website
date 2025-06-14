"use client";
import { useGLTF } from "@react-three/drei";

// ⛔ Don't use useEffect here
useGLTF.preload("/models/jack.glb");

export default function PreloadAssets() {
  return null;
}
