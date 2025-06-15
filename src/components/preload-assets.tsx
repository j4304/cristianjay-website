"use client";
import { useGLTF } from "@react-three/drei";

const MODEL_URL = "https://yutlscdwom45uhjn.public.blob.vercel-storage.com/models/jack-rgIVo5UjrzycOiaKnNkZZBawpozquK.glb"
// const MODEL_URL = "/models/jack.glb"
useGLTF.preload(MODEL_URL);

export default function PreloadAssets() {
  return null;
}
