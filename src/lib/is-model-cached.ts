import { useGLTF } from "@react-three/drei";

export function isModelCached(path: string): boolean {
  // @ts-expect-error: cache is internal but exists
  const cache = useGLTF.cache;
  return !!cache?.has(path);
}
